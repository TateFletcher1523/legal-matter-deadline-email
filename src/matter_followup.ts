import { infrai } from "./infrai_email.ts";
export type Matter = { matterId: string; clientEmail: string; signedDocument: string; deadline: string };
export function shouldFollowUp(matter: Matter, today: string): boolean { return matter.signedDocument.length > 0 && matter.deadline === today; }
export function reportHtml(matter: Matter): string { return `<h1>Matter ${matter.matterId}</h1><p>Signed document: ${matter.signedDocument}</p><p>Deadline: ${matter.deadline}</p>`; }
export async function emailDeadlineFollowUp(matter: Matter, today: string) { if (!shouldFollowUp(matter, today)) return { sent: false as const }; const result = await infrai.email.send({ to: matter.clientEmail, subject: `Deadline follow-up for matter ${matter.matterId}`, html: reportHtml(matter) }); return { sent: true as const, message_id: result.message_id }; }
