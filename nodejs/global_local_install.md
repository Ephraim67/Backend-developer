### What does “install” even mean?

When you want to use some **extra features** in your Node.js project (like sending emails, connecting to databases, or creating a web server), you install a **package**.
Packages are like ready-made tools written by other developers.



### 1. **Local Install**

* Imagine you’re working on a school project. You buy some pens, rulers, and erasers just for that project and keep them in that project’s bag.

* Same with **local install**:

  * The package gets stored **inside your project folder** (in a `node_modules` folder).
  * It’s **only available for that project**.
  * Example:

    ```bash
    npm install express
    ```

    → Installs **Express** only for that project.

* You’ll also see it listed in `package.json` so the project remembers which tools it needs.



### 2. **Global Install**

* Now, imagine you buy a calculator and keep it on your study table. You can use it for **any subject** — math, physics, economics.
* Same with **global install**:

  * The package is installed on your **whole computer**, not just one project.
  * Any project (or even the terminal itself) can use it.
  * Usually used for **command line tools**.
  * Example:

    ```bash
    npm install -g nodemon
    ```

    → Installs **nodemon** globally so you can run `nodemon` from anywhere in your terminal.



###  Rule of Thumb

* **Local install** → For project-specific dependencies (like Express, Mongoose, React).
* **Global install** → For tools you run in the terminal (like Nodemon, ESLint, TypeScript compiler).

* https://docs.npmjs.com/cli/v11/commands/npm-install
* https://docs.npmjs.com/downloading-and-installing-packages-globally
* https://docs.npmjs.com/downloading-and-installing-packages-locally



* **Local = inside the project bag.**
* **Global = on your desk for everyone to use.**
