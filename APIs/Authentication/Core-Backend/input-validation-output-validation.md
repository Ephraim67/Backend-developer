# 1. Input Validation

**What:**  
- **Check** and **sanitize** anything the user sends **before** you trust it or store it.
- The goal is to **reject bad/malicious data** early.

**Why:**  
- Prevent attacks like SQL Injection, XSS, Command Injection.
- Keep your backend safe.

**Example Problem:**  
A user submits this to your form:  
`<script>alert('hacked')</script>`

If you don't validate it, it could run in someone's browser.


## Node.js Input Validation Example (Express)

**Bad (no validation):**

```javascript
app.post('/signup', (req, res) => {
  const username = req.body.username;
  // Directly saving it without checking
  saveUser(username);
});
```

**Good (with validation):**

Using `express-validator`:

```javascript
const { body, validationResult } = require('express-validator');

app.post('/signup', 
  body('username').isAlphanumeric().isLength({ min: 3, max: 20 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    saveUser(req.body.username);
  }
);
```

✅ Only accepts usernames that are **letters and numbers**, **3-20 characters long**.  
🚫 Rejects anything malicious like scripts, SQL code, etc.


# 2. Output Escaping

**What:**  
- **Escape** special characters **before displaying** user input back on the page.
- Stop browsers from **interpreting user input as code**.

**Why:**  
- Prevent Cross-Site Scripting (XSS).


## Example Problem

If a user entered:  
`<script>alert('hacked')</script>`

And you display it raw like:

```html
<h1>Welcome, {{username}}</h1>
```

They could inject JavaScript that runs on your page!


## Node.js Output Escaping Example (EJS templates)

**Bad (no escaping):**

```html
<h1>Welcome, <%= username %></h1>
```

If `username` contains a script, it runs!

---

**Good (automatic escaping):**

In EJS, use `<%- %>` carefully and usually prefer `<%= %>` which **escapes** by default:

```html
<h1>Welcome, <%= username %></h1> 
```

`<%= %>` **escapes HTML characters** like `<`, `>`, `"` so they become safe text.

If user input was:

```html
<script>alert('hack')</script>
```

It would be output as:

```html
&lt;script&gt;alert('hack')&lt;/script&gt;
```
and **would not run**.



# Quick Visual Summary

| Concept           | What it Protects Against | How to Fix |
|-------------------|---------------------------|------------|
| Input Validation  | SQL Injection, XSS, Bad Data | Check input format, type, length |
| Output Escaping   | XSS (Cross-Site Scripting) | Escape user input before displaying |



# Pro Tip:
**Always validate input on both:**
- **Client-side** (for better UX, early errors).
- **Server-side** (NEVER trust client!).



# One-liner Remember:

> **Input Validation = "Don't trust incoming data."**  
> **Output Escaping = "Don't trust your own stored data when sending to browsers."**
