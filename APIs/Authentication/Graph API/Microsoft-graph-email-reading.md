# What is Microsoft Graph?

- **Microsoft Graph** is the API that talks to **everything inside Microsoft 365**.
- It can access:
  - **Emails** (Outlook / Exchange)
  - **Calendar**
  - **Contacts**
  - **Teams**
  - **OneDrive**
  - **User profiles**
  - and more.

✅ When you authenticate users using OAuth2, and get a **token**,  
✅ That token allows you to call **Graph API** **on their behalf**.



# Goal Here:  
➡️ Authenticate a user.  
➡️ Use the **access token** to **read their emails**.



# Important Graph API Endpoint to Read Emails

```http
GET https://graph.microsoft.com/v1.0/me/messages
```

This returns **all the user's emails**!

But you must request the correct **scope** during login:  
**Scope required:** `Mail.Read`



# Step-by-Step Full Flow

1. User logs in with OAuth2.
2. You get an `access_token` that has `Mail.Read` permission.
3. Call Microsoft Graph `/me/messages` with `Authorization: Bearer <access_token>`.
4. Read their emails.



# Node.js Example: Reading Emails with Microsoft Graph

(Assuming you already have an access token.)

Install axios:

```bash
npm install axios
```

Fetch emails:

```javascript
const axios = require('axios');

async function readEmails(accessToken) {
  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const emails = response.data.value;
    emails.forEach(email => {
      console.log('Subject:', email.subject);
      console.log('From:', email.from.emailAddress.name);
      console.log('Received:', email.receivedDateTime);
      console.log('------');
    });

  } catch (error) {
    console.error('Error fetching emails:', error.response.data);
  }
}

// Usage
readEmails('YOUR_ACCESS_TOKEN_HERE');
```

This fetches the user's inbox and prints **subject**, **sender**, and **received time**.



# Example Email JSON Response from Microsoft Graph

```json
{
  "value": [
    {
      "id": "AAMkAGI2Tz...",
      "subject": "Meeting Tomorrow",
      "from": {
        "emailAddress": {
          "name": "Boss",
          "address": "boss@company.com"
        }
      },
      "receivedDateTime": "2025-04-25T10:00:00Z"
    },
    ...
  ]
}
```



# If You Want Only Unread Emails

Modify the query using `$filter`:

```http
GET https://graph.microsoft.com/v1.0/me/messages?$filter=isRead eq false
```

Node.js:

```javascript
const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages?$filter=isRead eq false', {
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

Now you get **only unread emails**.



# Quick Visual Flow:

```
User login --> get access_token --> call /me/messages --> show emails
```



# Pro Tips:

- Always **request `Mail.Read` scope** when doing OAuth2 authorization.
- **Tokens expire** — so either refresh them, or re-login.
- You can paginate emails if user inbox is huge (Graph API uses `@odata.nextLink` for pagination).



# Bonus:
If you want to **read attachments** inside emails, you just call:

```http
GET /me/messages/{message-id}/attachments
```


# In short:

> **Login the user, get an access token, call `/me/messages` with it. Emails come back.**

