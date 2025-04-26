# What Are Subscriptions in Microsoft Graph?

- **Subscriptions** let your app **receive notifications** when something **changes** in Microsoft 365.
- For example:
  - A new email arrives
  - A calendar event is updated
  - A contact is deleted
- Microsoft **pushes** events to your **notification URL** (your server).

✅ **You don’t need to keep polling `/me/messages` every few seconds.**

---

# Common Use-Case You're Asking About

➡️ **Track new incoming emails automatically**  
➡️ **Microsoft will call your server (your webhook)** when a new email arrives.

---

# Big Flow Overview

```
1. App creates a Subscription to /me/messages
2. Microsoft validates your notification URL
3. When new email arrives, Microsoft sends a POST notification to your webhook
4. Your app handles it (e.g., fetches new email details)
```

---

# Setting up a Subscription for New Messages

## Step 1 — Requirements:

- A **publicly reachable HTTPS webhook endpoint** (even for testing! Use `ngrok` for local dev.)
- **User consent** with `Mail.Read` and `MailboxSettings.Read` scopes.

---

## Step 2 — Node.js Example: Creating a Subscription

(Assuming you already have a valid access token.)

```javascript
const axios = require('axios');

async function createSubscription(accessToken) {
  const response = await axios.post('https://graph.microsoft.com/v1.0/subscriptions', {
    changeType: 'created',
    notificationUrl: 'https://your-ngrok-url.ngrok.io/webhook',
    resource: 'me/mailFolders(\'inbox\')/messages',
    expirationDateTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hour ahead
    clientState: 'secretClientValue'
  }, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  console.log('Subscription created:', response.data);
}

// Usage
createSubscription('YOUR_ACCESS_TOKEN_HERE');
```

✅ This subscribes to **new messages in the Inbox**.

**Important Fields:**
- `changeType: 'created'` → only track *new* items.
- `notificationUrl` → your server endpoint that will receive events.
- `resource` → what you're watching (`me/mailFolders('inbox')/messages`).
- `expirationDateTime` → subscriptions expire (1 hour max for personal Microsoft accounts, 3 days for work accounts unless you renew).
- `clientState` → random string to verify incoming notifications are legit.

---

## Step 3 — Setting Up Your Webhook Server (Express)

Create the endpoint to receive notifications:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Validate webhook URL when Microsoft checks it
app.post('/webhook', (req, res) => {
  if (req.query && req.query.validationToken) {
    console.log('Validation token received');
    res.send(req.query.validationToken); // Needed for subscription validation
    return;
  }

  // Handle incoming notifications
  const notifications = req.body.value;
  notifications.forEach(notification => {
    console.log('New email notification:', notification);
  });

  res.sendStatus(202);
});

app.listen(3000, () => console.log('Webhook listening on port 3000'));
```

✅ Microsoft first calls your webhook with a `validationToken` — you MUST echo it back.

✅ Then, when a new email arrives, it sends a `POST` body like:

```json
{
  "value": [
    {
      "subscriptionId": "SUBSCRIPTION_ID",
      "changeType": "created",
      "resource": "me/mailFolders('inbox')/messages/EMAIL_ID",
      "clientState": "secretClientValue",
      "tenantId": "TENANT_ID",
      "userId": "USER_ID"
    }
  ]
}
```

You get the **email ID** — then you can **fetch full email** using Graph API.

---

# Full Visual Flow

```
1. Create Subscription -> Microsoft validates webhook
2. New email arrives -> Microsoft sends POST -> Your webhook receives it
3. Your server fetches email details -> Process email
```

---

# Important Notes:

- **Subscription Expiration**: Microsoft requires you to **renew** the subscription before it expires.
- **Secure Webhook**: Always verify `clientState` matches what you sent.
- **Permissions**: User must have granted `Mail.Read` permission.
- **Retry Handling**: If your webhook fails (e.g., 500 error), Microsoft **retries** notifications for a limited time.

---

# Tools You Might Want for Testing

- **ngrok** (makes your localhost visible online):  
  ```bash
  ngrok http 3000
  ```
- Use **Postman** to simulate Microsoft notifications during dev.

---

# Super Quick Summary

| Step | What happens                             |
|------|------------------------------------------|
| 1    | You create a subscription via Graph API  |
| 2    | Microsoft checks your webhook URL        |
| 3    | Microsoft pushes notifications to webhook |
| 4    | You react (fetch email, process it, etc.) |

---

# Real Example Use Cases:

- Build a "new email notifier" app.
- Trigger workflows automatically when emails arrive (e.g., helpdesk tickets).
- Save email attachments to a database.

---

# Bonus Tip:
You can also subscribe to **specific folder changes**, **Teams chats**, **Calendar events**, etc., by changing the `resource`!

