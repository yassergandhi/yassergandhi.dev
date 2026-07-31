export const prerender = true;
export function GET() {
  const commit = import.meta.env.VERCEL_GIT_COMMIT_SHA || "local";
  const environment = import.meta.env.VERCEL_ENV || "local";
  return new Response(JSON.stringify({ productVersion: "bmv-conversion-v9", commit, environment, builtAt: new Date().toISOString() }, null, 2), { headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });
}
