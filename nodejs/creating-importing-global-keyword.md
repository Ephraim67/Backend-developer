### **Custom Modules in Node.js**

* A **module** is just a separate file that contains some code you can reuse in other files.
* It’s like having **different notebooks** for math, English, and science, instead of writing everything in one big notebook.

**Example:**

📄 `math.js` (our custom module)

```js
// math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

// Export the functions so other files can use them
module.exports = { add, multiply };
```

📄 `app.js` (main file using the module)

```js
// app.js
const math = require('./math');  // import the module

console.log(math.add(2, 3));      // 5
console.log(math.multiply(4, 6)); // 24
```

👉 Here, `math.js` is a **custom module** that we created and then used in `app.js`.

---

### **global keyword in Node.js**

* In the **browser**:
  If you write `var name = "John";`, it becomes part of the **window object** (the global scope).

  ```js
  var name = "John";
  console.log(window.name); // "John"
  ```

* In **Node.js**:
  If you write the same `var name = "John";` inside a file (a module), it **stays local to that file** — it does not become global.

  ```js
  var name = "John";
  console.log(global.name); // undefined
  ```

* If you want something to be **truly global in Node.js**, you must attach it to the `global` object:

  ```js
  global.name = "John";
  console.log(global.name); // "John"
  ```


Think of each **Node.js file (module)** as a separate classroom.

* A variable declared inside one classroom (file) stays there.
* If you want the whole school (all files) to know it, you must put it on the school noticeboard (`global`).

Do you want me to also show you the difference between **CommonJS (`require`)** and **ESM (`import/export`)** with examples?
