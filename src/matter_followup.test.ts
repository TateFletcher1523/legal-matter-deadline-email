import { strict as assert } from "node:assert";
import { shouldFollowUp, type Matter } from "./matter_followup.ts";
const matter: Matter = { matterId: "MAT-104", clientEmail: "learner@example.com", signedDocument: "engagement-letter.pdf", deadline: "2026-08-10" };
assert.equal(shouldFollowUp(matter, "2026-08-10"), true);
assert.equal(shouldFollowUp(matter, "2026-08-09"), false);
assert.equal(shouldFollowUp({ ...matter, signedDocument: "" }, "2026-08-10"), false);
console.log("matter follow-up decision: passed");
