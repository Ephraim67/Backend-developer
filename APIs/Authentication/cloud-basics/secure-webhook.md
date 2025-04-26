# 🧠 What Are the Risks Without Securing Webhooks?

- **Fake requests**: attacker posts fake events.
- **Replay attacks**: attacker resends old requests.
- **Man-in-the-middle**: if the payload is intercepted, it could be tampered with.

✅ Solution: **signature verification** + **timestamp checking**.

---

# 🔥 How to Secure Webhooks (Best Practices)

1. **Signature Verification** (Integrity Check)
2. **Timestamp Validation** (Freshness Check)
3. **TLS (HTTPS only)** (Encrypt the transport)

---

# 1. Signature Verification (the Core Idea)

The webhook sender (like Stripe, Microsoft Graph, GitHub, etc.):

- Sends a **signature** along with the webhook payload.
- Usually, it’s **HMAC** (Hashed Message Authentication Code).
- You verify it using a **secret key**.

**Goal:** Confirm that the payload was **really generated** by the trusted sender, not someone else.

---

## Example: HMAC Signature Verification Flow

1. Sender sends:

- **HTTP body**: `{ "event": "new_email", "email_id": "12345" }`
- **HTTP header**: `X-Signature: <hash>`

2. You receive the webhook request.

3. Your server:

- Reads the raw body (important: *raw*, not parsed JSON).
- Recalculates the HMAC hash using the **shared secret**.
- Compares the calculated hash vs the header `X-Signature`.

If they match → accept the webhook.  
If they don’t → reject.

---

### Example in Node.js (HMAC SHA256)

```javascript
const crypto = require('crypto');

function verifySignature(req, secret) {
    const signature = req.headers['x-signature']; // Read header
    const payload = req.rawBody; // Important: raw body, not parsed body

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    return crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
    );
}
```

✅ `crypto.timingSafeEqual` prevents **timing attacks**!

---

# 2. Timestamp Checking (Replay Attack Protection)

**Why?**
Even if the signature is valid, an attacker could **capture** and **replay** a webhook days later.

✅ Solution: check that the request's timestamp is **recent** (e.g., within 5 minutes).

---

## Typical Flow:

- Sender adds a timestamp to the payload or headers.
  - Example: `X-Timestamp: 1714199130` (Unix timestamp)

- When you receive a webhook:
  - Parse the timestamp.
  - Compare it to the current server time.
  - If it's **too old or too new** (e.g., ±5 mins) → reject.

---

### Example in Node.js:

```javascript
function verifyTimestamp(req, maxAgeSeconds = 300) {
    const timestamp = req.headers['x-timestamp'];
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    if (!timestamp) return false;

    const diff = Math.abs(now - parseInt(timestamp, 10));
    return diff <= maxAgeSeconds;
}
```

---

# 3. Use HTTPS Always

- **TLS** encrypts traffic end-to-end.
- Without HTTPS, anyone on the network can **capture** webhook payloads.
- Always validate that the webhook endpoint is served over `https://`.

✅ TLS protects against MITM (Man-in-the-Middle) attacks.

---

# 📦 Putting it All Together

Typical secure webhook handler looks like:

```javascript
app.post('/webhook', (req, res) => {
    const secret = process.env.WEBHOOK_SECRET;

    if (!verifySignature(req, secret)) {
        return res.status(400).send('Invalid signature');
    }

    if (!verifyTimestamp(req)) {
        return res.status(400).send('Invalid timestamp');
    }

    // If both checks pass
    const event = JSON.parse(req.body);
    console.log('Received secure webhook:', event);

    res.status(200).send('OK');
});
```

(Plus make sure your body parser keeps access to the **raw body** — like using `body-parser` with `verify` function!)

---

# 🎯 Quick Summary Checklist

| Step                     | Why                          |
|---------------------------|-------------------------------|
| Verify HMAC Signature     | Ensure request integrity      |
| Validate Timestamp        | Prevent replay attacks        |
| Serve Webhook Endpoint over HTTPS | Encrypt payload transmission |
| Use Secure Comparison (Timing Safe) | Prevent timing attacks         |

---

# 🚀 Bonus: Libraries that Help

- **express.raw** middleware for keeping raw body
- **Stripe's `express.raw()`** example for webhook handling
- **@hapi/iron** (advanced message signing)
- **jsonwebtoken (JWT)** (if webhook payloads are JWTs)
