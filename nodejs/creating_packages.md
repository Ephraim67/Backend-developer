## What’s an npm package?

An **npm package** is just:

* A folder  with some code (your functions, classes, etc.).
* A `package.json` file that describes it.
* (Optional) You publish it to npm so anyone can install it with `npm install your-package`.

It’s how tools like **Express, React, or Lodash** are shared.



## 🛠 Steps to create your own npm package

### 1. Create a new folder

```bash
mkdir my-first-package
cd my-first-package
```



### 2. Initialize `package.json`

This file describes your package (name, version, scripts, dependencies, etc.)

```bash
npm init -y
```

This creates a default `package.json`:

```json
{
  "name": "my-first-package",
  "version": "1.0.0",
  "main": "index.js"
}
```

* `name` → what people will type in `npm install`.
* `version` → start with `1.0.0`.
* `main` → entry point file (default: `index.js`).



### 3. Write your code

Create `index.js`:

```js
function greet(name) {
  return `Hello, ${name}! 👋`;
}

module.exports = { greet };
```



### 4. Test your package locally

In another project, you can install your package **from your computer**:

```bash
npm install ../my-first-package
```

Then use it:

```js
const { greet } = require("my-first-package");
console.log(greet("Precious")); // Hello, Precious! 👋
```


### 5. Publish to npm

If you want the world to use it:

1. Make sure you have an npm account → [npmjs.com](https://www.npmjs.com).
2. Log in:

   ```bash
   npm login
   ```
3. Publish:

   ```bash
   npm publish
   ```

Now others can install it with:

```bash
npm install my-first-package
```



##  Why create npm packages?

* To **reuse your code** across multiple projects.
* To **share with the community**.
* To **standardize** functionality inside a team/company.

