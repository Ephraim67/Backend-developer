## OAuth

OAuth is an open standard for authorization that allows third-party applications to access a user's resources without exposing their 
credentials. It works by issuing access tokens after users grant permission, which applications then use to interact with resource servers
on behalf of the user. This process involves a resource owner (the user), a resource server (which holds the data), and an authorization 
server (which issues tokens). OAuth enables secure, token-based access management, commonly used for granting applications permissions to 
interact with services like social media accounts or cloud storage.

First, simple key points:

- Resource Owner = The user (you).

- Resource Server = Where your data lives (example: Google Drive).

- Authorization Server = The server that gives out access tokens (example: Google’s OAuth server).

- Client = The app that wants to use your data (example: a document editing app).

Now, real-world example:

You find a new app called "DocEditor Pro" that says,
**"Sign in with Google to access your Google Drive documents!"**

You think, "OK, but I don’t want to give them my Google password."

Here's what happens using OAuth 2.0:

1. DocEditor Pro redirects you to a Google authorization page.

2. On that page, Google says,
"DocEditor Pro wants permission to: View and Edit your Google Drive files."
You can click Allow or Deny.

3. If you click Allow, Google doesn’t give your password to DocEditor Pro.
Instead, Google issues an "Access Token" to DocEditor Pro.

4. DocEditor Pro now uses that Access Token to call the Google Drive API, like:
GET https://www.googleapis.com/drive/v3/files

But only for the permissions you granted (like reading your files).

5. If the token expires (maybe after 1 hour), DocEditor Pro can ask for a new one with a Refresh Token (if allowed).

- You never share your password with DocEditor Pro.

- You control what permissions you give.

- Tokens (not passwords) are used for access.

- You can revoke tokens anytime (e.g., from Google security settings).

Quick visual analogy:

- OAuth is like a valet ticket (access token).

- You hand the valet a ticket to get your car — you don't give them your car keys.

