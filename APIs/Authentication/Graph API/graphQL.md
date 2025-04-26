# What is GraphQL?

**GraphQL** is a **query language** and **runtime** for APIs.  
It was created by Facebook to solve problems with REST APIs.

**Main idea:**  
Instead of multiple REST endpoints like `/users`, `/posts`, `/comments`,  
you have **one single endpoint** (e.g., `/graphql`) and the **client asks exactly for the data it needs**.



# Quick REST vs GraphQL Comparison

| REST                    | GraphQL                   |
|--------------------------|----------------------------|
| Many endpoints (one per resource) | One endpoint (`/graphql`) |
| Fixed data per endpoint  | Client chooses data shape  |
| Overfetch/Underfetch problem | Exactly what you request |



# Real-world Example

**REST:**

```http
GET /user/123
{
  "id": 123,
  "name": "Alice",
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "Metropolis"
  }
}
```
You always get all fields even if you only want the `name`.



**GraphQL:**

```graphql
query {
  user(id: 123) {
    name
  }
}
```
**Only returns:**
```json
{
  "data": {
    "user": {
      "name": "Alice"
    }
  }
}
```

✅ You control exactly what you get.  
✅ Reduces data size over the network.


# How GraphQL Works (Basic Terms)

| Term         | Meaning                                  |
|--------------|------------------------------------------|
| Query        | A read operation (get data)              |
| Mutation     | A write operation (create/update/delete) |
| Schema       | The full description of types and operations |
| Resolver     | A function that actually fetches the data |


# Node.js GraphQL Example (with `express-graphql`)

Install:

```bash
npm install express express-graphql graphql
```

Simple server:

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    user(id: Int!): User
  }
  
  type User {
    id: Int
    name: String
    email: String
  }
`);

const fakeUsers = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" }
];

const root = {
  hello: () => 'Hello world!',
  user: ({ id }) => fakeUsers.find(u => u.id === id)
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enable GraphiQL UI (browser tool)
}));

app.listen(4000, () => console.log('Server running at http://localhost:4000/graphql'));
```

✅ Now you can open `http://localhost:4000/graphql` and run:

```graphql
query {
  hello
}
```

or

```graphql
query {
  user(id: 1) {
    name
    email
  }
}
```


# Quick Visual

```
Client -> POST /graphql with a query -> Server parses query -> Resolvers return data -> Server sends exactly requested data
```


# Key Benefits of GraphQL

- **Single endpoint** for all data
- **Client controls** what fields they need
- **Strongly typed schema** (great for validation and tooling)
- **Versionless API** (add new fields without breaking old clients)
- **Batch multiple queries** into one request


# Quick Limitations of GraphQL

- Not great for **simple apps** (overkill sometimes).
- You need to think about **security** (users asking for huge queries — you must limit depth/complexity).
- **Caching** is trickier compared to REST.


# One-liner Memory Trick:

> **GraphQL = "Tell the server *what* you want, not *how* to get it."**


# Bonus Tip:
You can also build **GraphQL APIs on top of REST backends**.  
You don’t have to replace your database — just wrap your REST or SQL calls inside GraphQL resolvers.
