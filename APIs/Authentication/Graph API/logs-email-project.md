Structure it clean and simple: **Node.js app** that:  

- logs you into **Microsoft 365**
- gets an **access token**
- **reads your own inbox** (latest emails)

---

# 🛠️ Basic Tech Stack

- Node.js + Express server
- Microsoft Identity (OAuth2 Authorization Code flow)
- Microsoft Graph API to read emails
- `axios` for HTTP requests
- `express-session` to hold login session

---

# 🧠 Basic Architecture (Visual)

```
Browser -> /login -> Microsoft Login
             ⬇️
Redirect back -> /callback -> get access_token
             ⬇️
Use access_token -> /inbox -> fetch and display emails
```

---

# 📦 Project Folder Structure

```
/my-ms365-app
  |-- app.js          (main server)
  |-- package.json    (dependencies)
  |-- views/
       |-- inbox.ejs   (simple HTML page showing emails)
```

---

# 1. `package.json` (your dependencies)

```json
{
  "name": "ms365-inbox-reader",
  "version": "1.0.0",
  "dependencies": {
    "axios": "^1.7.2",
    "ejs": "^3.1.8",
    "express": "^4.18.2",
    "express-session": "^1.17.3"
  }
}
```

Install all:

```bash
npm install express axios express-session ejs
```

---

# 2. `app.js` (main Node.js server)

```javascript
const express = require('express');
const session = require('express-session');
const axios = require('axios');
const querystring = require('querystring');

const app = express();
app.set('view engine', 'ejs');

app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));

// Replace with your app values
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const TENANT_ID = 'YOUR_TENANT_ID';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTHORITY = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0`;
const SCOPES = 'openid profile email offline_access Mail.Read';

app.get('/', (req, res) => {
  res.send('<a href="/login">Log in with Microsoft</a>');
});

app.get('/login', (req, res) => {
  const authUrl = `${AUTHORITY}/authorize?` + querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    response_mode: 'query',
    scope: SCOPES
  });
  res.redirect(authUrl);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const response = await axios.post(`${AUTHORITY}/token`, querystring.stringify({
      client_id: CLIENT_ID,
      scope: SCOPES,
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      client_secret: CLIENT_SECRET
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    req.session.accessToken = response.data.access_token;
    res.redirect('/inbox');
  } catch (error) {
    console.error('Token error', error.response.data);
    res.send('Error exchanging code for token');
  }
});

app.get('/inbox', async (req, res) => {
  if (!req.session.accessToken) {
    return res.redirect('/');
  }

  try {
    const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages?$top=5', {
      headers: {
        Authorization: `Bearer ${req.session.accessToken}`
      }
    });

    const emails = response.data.value;
    res.render('inbox', { emails });

  } catch (error) {
    console.error('Graph error', error.response.data);
    res.send('Error reading inbox');
  }
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
```

---

# 3. Create `/views/inbox.ejs` (simple HTML template)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Inbox</title>
</head>
<body>
  <h1>Latest Emails</h1>
  <ul>
    <% emails.forEach(email => { %>
      <li><strong><%= email.subject %></strong> - from <%= email.from.emailAddress.name %></li>
    <% }) %>
  </ul>
  <a href="/">Logout</a>
</body>
</html>
```

---

# 🏗️ Steps to Run

1. **Create an App Registration** in Azure Portal
   - Redirect URI: `http://localhost:3000/callback`
   - Add **API permissions**:  
     - Microsoft Graph → Delegated permissions → `Mail.Read`, `openid`, `email`, `profile`, `offline_access`
   - Save your **Client ID**, **Client Secret**, and **Tenant ID**.

2. **Update** `CLIENT_ID`, `CLIENT_SECRET`, and `TENANT_ID` in `app.js`.

3. Run:

```bash
node app.js
```

4. Open browser: [http://localhost:3000](http://localhost:3000)
5. Click "Log in with Microsoft" → Login → See your latest 5 emails displayed!

---

# 🔥 Super Quick Visual Summary

```
Login -> /callback -> access_token -> /inbox -> Graph API -> show emails
```

---

# Bonus Tip:

✅ You can easily extend this later to:  
- Show email body
- Show attachments
- Filter unread messages
- Paginate through inbox
