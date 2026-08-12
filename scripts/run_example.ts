import { emailDeadlineFollowUp, type Matter } from "../src/matter_followup.ts";
const to = process.env.DEMO_EMAIL_TO;
if (!to) throw new Error("DEMO_EMAIL_TO is required");
const matter: Matter = { matterId: "MAT-104", clientEmail: to, signedDocument: "engagement-letter.pdf", deadline: "2026-08-10" };
const result = await emailDeadlineFollowUp(matter, "2026-08-10");
console.log(result.sent ? `follow-up sent: ${result.message_id}` : "follow-up skipped");
