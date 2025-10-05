###  Why update packages?

* Packages (dependencies) are like apps on your phone.
* Developers keep fixing bugs 🐞, adding new features ✨, or improving security 🔒.
* If you don’t update, your project might miss out or even become insecure.



###  How to update with npm

#### 1. **Update all dependencies in a project**

Inside your project folder, run:

```bash
npm update
```

* This checks your `package.json` file and updates packages to the **latest version allowed** by the version rules you have there.



#### 2. **Update a single package**

If you only want to update one package:

```bash
npm update package-name
```

Example:

```bash
npm update express
```



#### 3. **Install the very latest version**

Sometimes `npm update` won’t go beyond certain version limits in `package.json`.
To **force install the newest version**:

```bash
npm install package-name@latest
```

Example:

```bash
npm install mongoose@latest
```



#### 4. **Check for outdated packages**

To see what’s old and what’s new:

```bash
npm outdated
```

It will show something like:

```
Package    Current   Wanted   Latest
express     4.18.0   4.18.2   5.0.0
```

* **Current** → what you have now.
* **Wanted** → what `npm update` will give you.
* **Latest** → the newest version available.



* **npm update** → Quick, safe updates (respects version rules).
* **npm install package@latest** → Full upgrade to the newest version.
* **npm outdated** → Check before you update.
* https://docs.npmjs.com/updating-packages-downloaded-from-the-registry
* https://chrispennington.blog/blog/how-to-update-npm-packages-safely-with-npm-check-updates/
* https://www.youtube.com/watch?v=Ghdfdq17JAY
