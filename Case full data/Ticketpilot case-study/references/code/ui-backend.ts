import type { Decision } from "./logic";

/** Same-origin proxy to the existing Python engine. Never substitute a canned result. */
export async function routeTicket(text: string): Promise<Decision> {
  const response = await fetch("/api/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("Routing is temporarily unavailable. Please retry shortly. Your request has not been submitted.");
  return response.json();
}
