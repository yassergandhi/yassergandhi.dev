export const FALLBACK_MAILTO = 'mailto:yassergandhi.dev@gmail.com?subject=Hidden%20Scaffold%20Review';
export const CONTACT_FROM_DEFAULT = 'onboarding@resend.dev';

export const requiredFields = {
  name: { label: 'name', max: 120 },
  email: { label: 'work email', max: 180 },
  company: { label: 'company / product', max: 180 },
  productUrl: { label: 'product URL', max: 500 },
  flow: { label: 'flow that breaks', max: 2000 },
  userBehavior: { label: 'what users do instead', max: 2000 },
  cost: { label: 'what this costs you', max: 1500 },
  owner: { label: 'who needs the review', max: 1000 },
  evidence: { label: 'evidence available', max: 1500 },
} as const;

type BriefField = keyof typeof requiredFields;
export type BriefPayload = Record<BriefField, string>;

export function jsonResponse(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function readPayload(request: Request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const json = await request.json().catch(() => ({}));
    return Object.fromEntries(Object.entries(json).map(([key, value]) => [key, String(value ?? '').trim()]));
  }

  const formData = await request.formData();
  return Object.fromEntries(Array.from(formData.entries()).map(([key, value]) => [key, String(value).trim()]));
}

export function validatePayload(input: Record<string, string>) {
  if (input.website) {
    return { ok: false as const, status: 400, error: 'Submission rejected.' };
  }

  const payload = {} as BriefPayload;

  for (const [field, config] of Object.entries(requiredFields) as [BriefField, (typeof requiredFields)[BriefField]][]) {
    const value = input[field]?.trim() || '';

    if (!value) return { ok: false as const, status: 400, error: `Missing required field: ${config.label}.` };
    if (value.length > config.max) return { ok: false as const, status: 400, error: `${config.label} is too long. Please keep it under ${config.max} characters.` };
    payload[field] = value;
  }

  if (!/^\S+@\S+\.\S+$/.test(payload.email)) return { ok: false as const, status: 400, error: 'Please provide a valid work email.' };

  try {
    const url = new URL(payload.productUrl);
    if (!['http:', 'https:'].includes(url.protocol)) return { ok: false as const, status: 400, error: 'Product URL must start with http:// or https://.' };
  } catch {
    return { ok: false as const, status: 400, error: 'Please provide a valid product URL.' };
  }

  return { ok: true as const, payload };
}

export function buildTextEmail(payload: BriefPayload) {
  return `Hidden Scaffold Review brief\n\nName: ${payload.name}\nWork email: ${payload.email}\nCompany / product: ${payload.company}\nProduct URL: ${payload.productUrl}\n\nFlow that breaks:\n${payload.flow}\n\nWhat users do instead:\n${payload.userBehavior}\n\nWhat this costs you:\n${payload.cost}\n\nWho needs the review:\n${payload.owner}\n\nEvidence available:\n${payload.evidence}\n`;
}

export async function handleBriefRequest(request: Request, env: Record<string, string | undefined>) {
  if (request.method !== 'POST') return jsonResponse({ error: 'Method not allowed.' }, 405);

  const input = await readPayload(request);
  const validation = validatePayload(input);
  if (!validation.ok) return jsonResponse({ error: validation.error, fallbackMailto: FALLBACK_MAILTO }, validation.status);

  const resendApiKey = env.RESEND_API_KEY;
  const contactTo = env.CONTACT_TO;
  const contactFrom = env.CONTACT_FROM || CONTACT_FROM_DEFAULT;

  if (!resendApiKey || !contactTo) {
    return jsonResponse({
      error: 'Contact form email is not configured in this environment.',
      fallbackMailto: FALLBACK_MAILTO,
      missing: ['RESEND_API_KEY', 'CONTACT_TO'].filter((key) => !env[key]),
    }, 503);
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${resendApiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: contactFrom,
      to: [contactTo],
      reply_to: validation.payload.email,
      subject: `Hidden Scaffold Review brief — ${validation.payload.company}`,
      text: buildTextEmail(validation.payload),
    }),
  });

  if (!resendResponse.ok) return jsonResponse({ error: 'Contact form email could not be sent right now.', fallbackMailto: FALLBACK_MAILTO }, 502);
  return jsonResponse({ message: 'Brief sent. I will review the flow and respond if it fits.' });
}

export async function POST({ request }: { request: Request }) {
  return handleBriefRequest(request, {
    RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
    CONTACT_TO: import.meta.env.CONTACT_TO,
    CONTACT_FROM: import.meta.env.CONTACT_FROM,
  });
}
