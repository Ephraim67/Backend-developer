### What are npm scripts?

* npm scripts are just **shortcuts** you define in your project’s `package.json`.
* Instead of typing long commands in the terminal, you give them a **nickname**.



###  Example in `package.json`

Here’s how scripts usually look inside `package.json`:

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Running tests...\"",
    "build": "webpack --config webpack.config.js"
  }
}
```



###  How to run them

* Run **start** script:

  ```bash
  npm start
  ```

  Shorthand for `npm run start`.

* Run **any other script** (like `dev` or `build`):

  ```bash
  npm run dev
  npm run build
  ```



###  Why use scripts?

* **Shortcut for long commands**
  Instead of typing:

  ```bash
  nodemon server.js --watch ./src --ignore ./logs
  ```

  You can just run:

  ```bash
  npm run dev
  ```

* **Organize tasks**
  You can split big workflows into smaller scripts:

  ```json
  "scripts": {
    "clean": "rimraf dist",
    "build": "npm run clean && webpack",
    "deploy": "npm run build && npm run upload"
  }
  ```

   Here, `deploy` runs both `build` and `upload`.



### Rule of Thumb

* Put all the **common commands** you run often into scripts.
* Use `npm run script-name` to execute them.
* Makes projects easier to share—anyone can clone your project, run `npm install`, then use the same scripts you set up.
