# **CommonJS (CJS) vs ES Modules (ESM)**

## **1. CommonJS (CJS)**

* Default in Node.js.
* Uses `require()` to **import**.
* Uses `module.exports` or `exports` to **export**.
* Works in **all Node.js versions**.

**Example (CommonJS):**

### `math.js`

```js
// Exporting
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// Export multiple functions
module.exports = { add, subtract };
```

### `app.js`

```js
// Importing
const math = require("./math");

console.log(math.add(5, 3));       // 8
console.log(math.subtract(10, 4)); // 6
```



## **2. ES Modules (ESM)**

* Newer standard (from JavaScript in browsers).
* Uses `import` and `export`.
* Works in Node.js **only if you enable it** by either:

  1. Adding `"type": "module"` in `package.json`, OR
  2. Using `.mjs` file extension.

**Example (ESM):**

### `math.js`

```js
// Exporting
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}
```

### `app.js`

```js
// Importing
import { add, subtract } from "./math.js";

console.log(add(5, 3));       // 8
console.log(subtract(10, 4)); // 6
```



# **Key Differences**

| Feature            | CommonJS (CJS)           | ES Modules (ESM)    |
| ------------------ | ------------------------ | ------------------- |
| Import syntax      | `const x = require(...)` | `import x from ...` |
| Export syntax      | `module.exports = ...`   | `export ...`        |
| Default in Node.js | ✅ Yes                    | ❌ Only if enabled   |
| File extension     | `.js`                    | `.js` or `.mjs`     |
| Used in browsers?  | ❌ No                     | ✅ Yes               |



# **When to Use Which?**

* **CJS**: Good for older projects or libraries.
* **ESM**: Modern standard → better for new projects (especially if you want your code to work in both **Node.js and browsers**).


Do you want me to also show you how to **mix CommonJS and ESM in the same project**, since sometimes you’ll run into packages that use one or the other?
