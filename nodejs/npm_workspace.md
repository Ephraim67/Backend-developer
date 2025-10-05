###  What’s a workspace?

Imagine you’re working on a **big project** that has many smaller projects inside it.
For example:

* **Main app** (backend server)
* **Frontend** (React web app)
* **Shared library** (code both frontend & backend use)

Instead of managing each one separately, **npm workspaces** let you keep them **together in one folder** and manage them with a single `package.json`.



###  Folder structure example

```bash
my-project/
├── package.json   # The root package.json (controls everything)
├── backend/
│   └── package.json
├── frontend/
│   └── package.json
└── shared/
    └── package.json
```



### How to enable workspaces

In your **root `package.json`**, add a `workspaces` field:

```json
{
  "name": "my-project",
  "private": true,
  "workspaces": [
    "backend",
    "frontend",
    "shared"
  ]
}
```

* `private: true` → Required for workspaces (so you don’t accidentally publish the root project).
* The array lists your sub-projects (packages).



### What can you do with workspaces?

1. **Install dependencies for all packages at once**
   Run this in the root:

   ```bash
   npm install
   ```

   It installs dependencies for backend, frontend, and shared all together.

2. **Share dependencies**
   If frontend and backend both use `lodash`, npm will install it **only once** at the root to save space.

3. **Run scripts inside a workspace**
   Run a script in just one package:

   ```bash
   npm run start --workspace=backend
   ```

   Or run a script across all workspaces:

   ```bash
   npm run build --workspaces
   ```

4. **Link packages together locally**
   If `backend` depends on `shared`, npm will automatically link the local `shared` folder instead of downloading from npm registry.



###  Why use npm workspaces?

* Perfect for **monorepos** (many projects in one repo).
* Saves time → manage dependencies and scripts for all projects together.
* Makes local development easier when multiple apps depend on each other.



 Think of it like this:

* **Without workspaces** → you manage 3–5 different projects separately.
* **With workspaces** → you manage everything from one central place.

* https://docs.npmjs.com/cli/v11/using-npm/workspaces
* https://ruanmartinelli.com/blog/npm-7-workspaces-1/
* https://app.daily.dev/tags/npm?ref=roadmapsh

