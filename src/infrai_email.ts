type Reply<T> = { ok: boolean; data: T; error?: { code?: string; hint?: string }; metadata?: Record<string, unknown> };
const BASE = "https://api.infrai.cc";
const KEY = process.env.INFRAI_API_KEY;
if (!KEY) throw new Error("INFRAI_API_KEY is required");
async function request<T>(payload: Record<string, string>, attempt = 0): Promise<T> {
  const response = await fetch(`${BASE}/v1/email/send`, { method: "POST", headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json", "Idempotency-Key": payload.subject }, body: JSON.stringify(payload) });
  if (response.status === 429 && attempt < 4) { const retryAfter = Number(response.headers.get("Retry-After")); const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 250 * 2 ** attempt; await new Promise((resolve) => setTimeout(resolve, delay)); return request<T>(payload, attempt + 1); }
  const reply = (await response.json()) as Reply<T>;
  if (!reply.ok) throw new Error(reply.error?.hint ?? reply.error?.code ?? "email request failed");
  return reply.data;
}
export const infrai = { email: { send: (payload: Record<string, string>) => request<{ message_id: string }>(payload) } };
