import { handleBriefRequest } from '../src/pages/api/brief';

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  setHeader: (name: string, value: string) => void;
  send: (body: string) => void;
};

function getHeader(headers: VercelRequest['headers'], name: string) {
  const value = headers[name] || headers[name.toLowerCase()];
  return Array.isArray(value) ? value.join(', ') : value || '';
}

function toWebRequest(request: VercelRequest) {
  const body = typeof request.body === 'string' ? request.body : JSON.stringify(request.body || {});
  return new Request('https://yassergandhi.dev/api/brief', {
    method: request.method || 'GET',
    headers: { 'content-type': getHeader(request.headers, 'content-type') || 'application/json' },
    body: request.method === 'POST' ? body : undefined,
  });
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const result = await handleBriefRequest(toWebRequest(request), {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_TO: process.env.CONTACT_TO,
    CONTACT_FROM: process.env.CONTACT_FROM,
  });

  response.setHeader('content-type', 'application/json');
  response.status(result.status).send(await result.text());
}
