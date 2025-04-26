OAuth 2.0 actually has **4 main flows** depending on the type of app you are building.


# 1. Authorization Code Flow (most common for web apps)

**Use when:** Your app has a backend server (like a Node.js Express app).

**Example Scenario:**  
A Node.js web app that lets users log in with Google and read their Google Contacts.

**Flow:**

1. Your app redirects the user to Google’s authorization page.
2. User logs in and grants permission.
3. Google redirects back to your app **with a temporary code**.
4. Your server (Node.js) exchanges that **code for an access token**.
5. You use the token to call Google's APIs.

**Node.js Example:**

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

const client_id = 'YOUR_CLIENT_ID';
const client_secret = 'YOUR_CLIENT_SECRET';
const redirect_uri = 'http://localhost:3000/oauth2callback';

// Step 1: Redirect user to Google's OAuth 2.0 server
app.get('/auth/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=https://www.googleapis.com/auth/contacts.readonly`;
  res.redirect(url);
});

// Step 2: Handle callback and exchange code for token
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'authorization_code'
  });

  const accessToken = tokenResponse.data.access_token;
  res.send(`Access Token: ${accessToken}`);
});

app.listen(3000, () => console.log('App running on http://localhost:3000'));
```

# 2. Implicit Flow (for pure frontend apps, rarely used now)

**Use when:** Frontend apps (browser-only apps) that can't securely store secrets.

**In Node.js?**  
Usually not used anymore because **Authorization Code Flow with PKCE** is safer even for frontend apps.

# 3. Client Credentials Flow (machine-to-machine)

**Use when:** No user involved. Just two servers talking.

**Example Scenario:**  
A Node.js server that needs to get an API token from a service to access data (like getting weather data for your dashboard).

**Flow:**

1. Node.js app sends **client ID + client secret** directly to the authorization server.
2. Authorization server gives back an access token.

**Node.js Example:**

```javascript
const axios = require('axios');

async function getToken() {
  const tokenResponse = await axios.post('https://authorization-server.com/oauth/token', {
    grant_type: 'client_credentials',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    scope: 'read:weather'
  });

  console.log('Access Token:', tokenResponse.data.access_token);
}

getToken();
```


# 4. Resource Owner Password Credentials Flow (not recommended)

**Use when:** You trust the app 100% (like your own first-party app) because the user directly gives you their username and password.

**Flow:**

1. Node.js app collects user's username and password.
2. Sends them to the auth server to get an access token.

**Example Node.js:**

```javascript
const axios = require('axios');

async function login(username, password) {
  const tokenResponse = await axios.post('https://authorization-server.com/oauth/token', {
    grant_type: 'password',
    username,
    password,
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
  });

  console.log('Access Token:', tokenResponse.data.access_token);
}

login('user@example.com', 'password123');
```

**BUT:**  
This is **dangerous**.  
Better to **never ask for passwords directly** — use Authorization Code Flow instead.

# Summary Table

| Flow                           | When to Use                        | Node.js Role |
|---------------------------------|-------------------------------------|--------------|
| Authorization Code             | Web apps needing user login        | Yes          |
| Implicit (deprecated)          | Old frontend-only apps             | No           |
| Client Credentials             | Server-to-server, no user involved | Yes          |
| Resource Owner Password (bad)   | Trusted apps only                  | Avoid        |
