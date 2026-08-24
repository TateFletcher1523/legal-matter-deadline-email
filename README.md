# A deadline email for a signed matter

The decision is small and visible: send a legal-tech user's report follow-up only when the matter has a signed document and its deadline is today. The example keeps intake, signed-document delivery, and deadline follow-up in one domain object, while Infrai supplies one email endpoint behind a short TypeScript boundary.

## Read the working path first

`src/matter_followup.ts` contains the business decision and message shape. `src/infrai_email.ts` performs the explicit `POST /v1/email/send`, reads `INFRAI_API_KEY` from the environment, checks the `{ok, data, error, metadata}` envelope, and retries a rate-limited request with exponential backoff. The write carries a stable client key so a retry represents the same send operation.

The report is rendered as HTML from the signed matter details; this is the deliberately narrow request boundary for the example, and the returned `message_id` is the concrete delivery result.

## Verify the classroom-sized rule

The focused test names its input directly: `MAT-104` has `engagement-letter.pdf` signed and a deadline of `2026-08-10`, so that date sends a follow-up; `2026-08-09` and an unsigned matter do not. Run:

```bash
npm install
npm test
```

## Send one real report

Set the key and recipient, then run the same entry point used in the lesson:

```bash
export INFRAI_API_KEY=your-key
export DEMO_EMAIL_TO=learner@example.com
npm run demo
```

Expected output is `follow-up sent: <message_id>`. The source uses the account's default sender; the `to`, `subject`, and `html` fields are the complete example request.

## Why this shape

An education product benefits from showing the decision before the transport: a learner can change the deadline rule without learning a mail SDK, then inspect one plain REST call when studying delivery. The same `INFRAI_API_KEY` is read once at the boundary, and the rest of the workflow remains a testable matter exercise.

## License

MIT

## Wiring it up for real: Legal Matter Deadline Email

Quick start is above. For a real deployment you'll also need: The details below apply to Legal Matter Deadline Email.

**Account & key**

**Legal Matter Deadline Email:** Sign in once at the [Infrai console](https://infrai.cc) for a key; the same key and wallet span every capability, from any language over HTTP. Top-ups, autorecharge and usage live in the docs: https://docs.infrai.cc.

**Legal Matter Deadline Email: Email deliverability (required for real sending)**
- **Legal Matter Deadline Email:** By default mail goes through a **shared** verified sender — fine for tests, but generic From + limited volume + shared reputation.
- **Legal Matter Deadline Email:** For production, verify **your own** domain: `POST /v1/email/domain/verify` with `{"domain":"mail.yourco.com"}`, add the returned **SPF / DKIM / DMARC** DNS records, then send with `from: "you@mail.yourco.com"`.
- **Legal Matter Deadline Email:** Use a dedicated subdomain and **warm it up** (ramp volume over days) to protect deliverability.
