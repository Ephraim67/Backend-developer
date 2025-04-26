# 1. Rate Limiting

**What:**  
- Control **how many requests** a client (user, IP) can make in a time period.
- Protects your app from **abuse**, **DoS attacks**, and **overload**.

**Example:**  
- Allow max **100 requests per IP per 15 minutes**.



## Node.js Example (Express + express-rate-limit)

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use(limiter);
```

Now **automatically blocks** IPs making too many requests.


# 2. Retries

**What:**  
- If a request **fails** (like a network error, 500 server error), **retry** automatically.
- Useful for **unstable APIs**, **temporary outages**, or **microservices** communication.

**Example:**  
- Try an API call up to **3 times** if it fails.


## Node.js Example (Axios with retries)

Use `axios-retry` library:

```javascript
const axios = require('axios');
const axiosRetry = require('axios-retry');

axiosRetry(axios, { retries: 3 }); // 3 retries if request fails

async function fetchData() {
  try {
    const res = await axios.get('https://unstable-api.com/data');
    console.log(res.data);
  } catch (error) {
    console.error('Failed after retries:', error.message);
  }
}

fetchData();
```

If the first request fails, it **automatically retries up to 3 times** before giving up.


# 3. Pagination

**What:**  
- Instead of sending **all data at once**, send **small chunks (pages)**.
- Makes responses **faster** and **lighter**.

**Example:**  
- Show **10 users per page**.


## Node.js Example (Express API pagination)

Imagine you have **1000 users** and you want to return **10 at a time**:

```javascript
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const users = getAllUsers(); // Assume this returns 1000 users array

  const results = users.slice(startIndex, endIndex);

  res.json({
    page: page,
    nextPage: page + 1,
    users: results
  });
});
```

✅ Now you can call:  
`GET /users?page=1` → users 1-10  
`GET /users?page=2` → users 11-20  
...and so on.



# Quick Summary Table

| Concept         | Purpose                        | Node.js Solution |
|-----------------|---------------------------------|------------------|
| Rate Limiting   | Block spammy requests           | `express-rate-limit` |
| Retries         | Survive temporary failures      | `axios-retry` |
| Pagination      | Split large data into small pages | `req.query.page`, manual slicing |



# Visual Flow

```
User --> API Server
         |__ Rate Limited? (max requests per window)
         |__ Retry if temp failure
         |__ Paginate data if huge
```


# Pro Tip:
These 3 together make APIs **much more resilient and secure**.
