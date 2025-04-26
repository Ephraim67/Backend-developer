# How OAuth2 Authentication Works with Microsoft Identity Platform

**Big picture flow:**

1. **User clicks "Login with Microsoft"** on your app.
2. **Redirects** to Microsoft login page.
3. **User logs in** and grants permissions (e.g., read their profile).
4. Microsoft redirects **back to your app** with an **authorization code**.
5. Your **server exchanges code for access token** (and maybe refresh token).
6. Use the token to **fetch user profile** or call Microsoft APIs.

**Same as OAuth2 Authorization Code Flow**, just with Microsoft servers.


# Microsoft OAuth2 Important Endpoints

| Purpose                | URL (common endpoint)                                 |
|-------------------------|--------------------------------------------------------|
| Authorization request   | `https://login.microsoftonline.com/common/oauth2/v2.0/authorize` |
| Token exchange          | `https://login.microsoftonline.com/common/oauth2/v2.0/token` |
| Get user info (Microsoft Graph) | `https://graph.microsoft.com/v1.0/me` |



# Node.js (Express) Example: OAuth2 with Microsoft Login

## Step 1 — Register Your App on Azure

- Go to **Azure Portal** → **Azure Active Directory** → **App registrations** → **New registration**.
- Set:
  - **Redirect URI**: `http://localhost:3000/auth/microsoft/callback`
  - **Save** Client ID and Client Secret.

Now you have:
- **CLIENT_ID**
- **CLIENT_SECRET**


## Step 2 — Setup Node.js Server

Install some packages:

```bash
npm install express axios querystring
```

Here’s a simple OAuth2 login flow:

```javascript
const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const app = express();

const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/auth/microsoft/callback';
const AUTHORITY = 'https://login.microsoftonline.com/common/oauth2/v2.0';

app.get('/auth/microsoft', (req, res) => {
  const params = {
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    response_mode: 'query',
    scope: 'openid profile email User.Read',
  };
  const authUrl = `${AUTHORITY}/authorize?${qs.stringify(params)}`;
  res.redirect(authUrl);
});

app.get('/auth/microsoft/callback', async (req, res) => {
  const code = req.query.code;

  const tokenResponse = await axios.post(`${AUTHORITY}/token`, qs.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const accessToken = tokenResponse.data.access_token;

  // Use access token to call Microsoft Graph
  const graphResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  res.json(graphResponse.data);
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));
```


# What Happens Here:

- `GET /auth/microsoft` → Redirects user to Microsoft login.
- After login, Microsoft calls back your app at `/auth/microsoft/callback`.
- You exchange the **authorization code** for an **access token**.
- Then you use the **access token** to fetch user profile info (`/me` endpoint).


# Microsoft Identity Special Notes

- Scopes like `openid`, `profile`, and `email` are standard OAuth2 scopes.
- `User.Read` is a Microsoft Graph permission to **read basic profile**.
- You can also request extra scopes like `Mail.Read`, `Calendars.ReadWrite`, etc.
- Microsoft sometimes uses **v2.0 endpoints** (`/v2.0/authorize`, `/v2.0/token`).


# Visual Flow:

```
User -> /auth/microsoft -> Microsoft login -> callback with code -> exchange code for token -> get user data
```



# Quick Tips:
- **Always protect your Client Secret** (never expose it in frontend code).
- **Access tokens expire** (usually 1 hour). You might need **refresh tokens** for long sessions.
- You can later use libraries like **passport-azure-ad** if you want easier integration.
