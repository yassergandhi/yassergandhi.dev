import type { APIRoute } from 'astro';

const fallbackEmail = 'yassergandhi.dev@gmail.com';

const requiredFields = [
  'name',
  'email',
  'companyProduct',
  'flowBreaks',
  'userWorkaround',
  'cost',
  'reviewOwner',
  'evidence',
] as const;

const labels: Record<string, string> = {
  name: 'Name',
  email: 'Work email',
  companyProduct: 'Company / product',
  productUrl: 'Product URL',
  flowBreaks: 'Flow that breaks',
  userWorkaround: 'What users do instead',
  cost: 'What this costs you',
  reviewOwner: 'Who needs the review',
  evidence: 'Evidence available',
};

const limits: Record<string, number> = {
  name: 120,
  email: 160,
  companyProduct: 180,
  productUrl: 300,
  flowBreaks: 1200,
  userWorkaround: 1200,
  cost: 1200,
  reviewOwner: 180,
  evidence: 300,
  website: 200,
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function readPayload(request: Request) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const parsed = await request.json();
    return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
  }

  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    return Object.fromEntries((await request.formData()).entries());
  }

  return {};
}

function valueOf(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === 'string' ? value.trim() : '';
}

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;

  try {
    payload = await readPayload(request);
  } catch {
    return json({ message: 'The brief could not be parsed.' }, 400);
  }

  if (valueOf(payload, 'website')) {
    return json({ message: 'The brief could not be accepted.' }, 400);
  }

  const missing = requiredFields.filter((field) => !valueOf(payload, field));
  if (missing.length) {
    return json({ message: `Missing required fields: ${missing.map((field) => labels[field]).join(', ')}.` }, 400);
  }

  const tooLong = Object.entries(limits).find(([key, limit]) => valueOf(payload, key).length > limit);
  if (tooLong) {
    return json({ message: `${labels[tooLong[0]] ?? tooLong[0]} is too long.` }, 400);
  }

  const email = valueOf(payload, 'email');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ message: 'Use a valid work email.' }, 400);
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const contactTo = import.meta.env.CONTACT_TO;
  const contactFrom = import.meta.env.CONTACT_FROM || 'Hidden Scaffold Review <onboarding@resend.dev>';

  if (!resendApiKey || !contactTo) {
    return json({
      message: 'The contact form is not configured on this server.',
      fallbackEmail,
    }, 503);
  }

  const text = Object.keys(labels)
    .map((key) => `${labels[key]}:\n${valueOf(payload, key) || '-'}`)
    .join('\n\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: contactFrom,
      to: [contactTo],
      reply_to: email,
      subject: `Hidden Scaffold Review brief: ${valueOf(payload, 'companyProduct')}`,
      text,
    }),
  });

  if (!response.ok) {
    return json({ message: 'The email provider could not send the brief.', fallbackEmail }, 502);
  }

  return json({ message: 'Brief sent.' });
};

export const ALL: APIRoute = async () => json({ message: 'Method not allowed.' }, 405);
