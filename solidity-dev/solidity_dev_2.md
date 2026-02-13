# What Is This Contract?

This contract creates a **very simple cryptocurrency**.

It allows:

* ✅ The creator to create (mint) new coins
* ✅ Anyone with coins to send them to others
* ❌ No username/password needed
* 🔐 Ownership is controlled by Ethereum addresses

Think of it like:

> A small bank system running on the blockchain.

---

# 📜 The Full Code (Simplified View)

```solidity
contract Coin {
    address public minter;
    mapping(address => uint) public balances;

    event Sent(address from, address to, uint amount);

    constructor() {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        balances[receiver] += amount;
    }

    error InsufficientBalance(uint requested, uint available);

    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], 
            InsufficientBalance(amount, balances[msg.sender]));
        
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Now let’s explain each part clearly.

---

# 1️⃣ `address public minter;`

### What is `address`?

An `address` is:

* A 160-bit value
* Used to represent wallet addresses or contracts

Example:

```
0xAbC123...789
```

---

### What is `minter`?

This stores:

> The address of the person who created the contract.

And because it is `public`, Solidity automatically creates a function like this:

```solidity
function minter() external view returns (address)
```

So anyone can check who the creator is.

---

# 2️⃣ `mapping(address => uint) public balances;`

This is VERY important.

### What is a mapping?

A mapping is like:

> A dictionary or hash table.

Think JavaScript:

```js
let balances = {
   "0x123": 100,
   "0x456": 50
}
```

In Solidity:

```solidity
mapping(address => uint)
```

Means:

* Key = address
* Value = number of coins

So it stores:

| Address | Coins |
| ------- | ----- |
| 0xAAA   | 100   |
| 0xBBB   | 25    |
| 0xCCC   | 0     |

---

### Important: You CANNOT loop over a mapping

Unlike arrays:

* You cannot get all keys
* You cannot get all values
* You can only query one address at a time

Example:

```solidity
balances[0xAAA]
```

---

# 3️⃣ `event Sent(address from, address to, uint amount);`

An **event** is like a log.

It tells the outside world:

> "Something happened!"

When coins are sent, this event is emitted.

Frontends (like a React app) can listen to it.

Think of it like:

```js
console.log("Transfer happened")
```

But recorded permanently on blockchain.

---

# 4️⃣ The Constructor

```solidity
constructor() {
    minter = msg.sender;
}
```

The constructor runs **only once**:

* When the contract is deployed

`msg.sender` means:

> The address that called this function.

During deployment:

* `msg.sender` = the person deploying the contract.

So:

> Whoever deploys this contract becomes the minter.

---

# 5️⃣ The `mint` Function

```solidity
function mint(address receiver, uint amount) public {
    require(msg.sender == minter);
    balances[receiver] += amount;
}
```

This function creates new coins.

---

### Step-by-step:

1. Someone calls `mint()`
2. It checks:

   ```solidity
   require(msg.sender == minter);
   ```

   Meaning:

   > Only the creator can mint coins.

If not?
❌ Transaction fails.

---

3. If allowed:

   ```solidity
   balances[receiver] += amount;
   ```

It adds coins to the receiver’s balance.

---

### Real Example

You deploy contract.

You are:

```
0xAAA
```

You call:

```
mint(0xBBB, 100)
```

Now:

| Address | Balance |
| ------- | ------- |
| 0xBBB   | 100     |

---

# 6️⃣ What Is `require()`?

`require(condition)` means:

> "If this condition is false, stop everything and undo changes."

Like:

```js
if (!condition) {
   throw Error();
}
```

---

# 7️⃣ Custom Error

```solidity
error InsufficientBalance(uint requested, uint available);
```

This creates a custom error.

Why?

Instead of just failing silently, it says:

> "You tried to send 100, but you only have 50."

Better debugging.

---

# 8️⃣ The `send` Function

```solidity
function send(address receiver, uint amount) public {
    require(amount <= balances[msg.sender], 
        InsufficientBalance(amount, balances[msg.sender]));
    
    balances[msg.sender] -= amount;
    balances[receiver] += amount;
    emit Sent(msg.sender, receiver, amount);
}
```

This lets anyone send coins.

---

### Step-by-step:

1️⃣ Check if sender has enough:

```solidity
amount <= balances[msg.sender]
```

If not:
❌ Revert with error.

---

2️⃣ Subtract from sender:

```solidity
balances[msg.sender] -= amount;
```

3️⃣ Add to receiver:

```solidity
balances[receiver] += amount;
```

4️⃣ Emit event:

```solidity
emit Sent(...)
```

---

# 🔄 Full Example Flow

Let’s simulate:

### Step 1: Deploy contract

Deployer = `0xAAA`
So:

```
minter = 0xAAA
```

---

### Step 2: Minter creates coins

```
mint(0xBBB, 100)
```

Now:

| Address | Balance |
| ------- | ------- |
| 0xBBB   | 100     |

---

### Step 3: BBB sends coins

BBB calls:

```
send(0xCCC, 40)
```

Now:

| Address | Balance |
| ------- | ------- |
| 0xBBB   | 60      |
| 0xCCC   | 40      |

Event emitted:

```
Sent(0xBBB, 0xCCC, 40)
```

Frontend sees it instantly.

---

# ⚠ Important Note

If you check 0xBBB on Etherscan:

You won’t see “Coin: 60”.

Why?

Because:

* This coin only exists inside THIS contract.
* The balances are stored inside the contract storage.

To see balances:

* You must inspect the contract
* Or use its `balances(address)` function

---

# 🔥 Important Concept: Checked Arithmetic

Solidity 0.8+ automatically checks for overflow.

If:

```
uint max = 2**256 - 1;
```

And you try:

```
max + 1
```

Transaction reverts automatically.

Before Solidity 0.8, this was dangerous.

---

# 🧠 Big Picture

This contract demonstrates:

| Concept     | What It Teaches   |
| ----------- | ----------------- |
| address     | Ethereum identity |
| mapping     | Account balances  |
| constructor | Initialization    |
| msg.sender  | Who is calling    |
| require     | Access control    |
| events      | Blockchain logs   |
| mint        | Token creation    |
| send        | Token transfer    |

---

# 🏦 What This Is Missing

This is NOT a full ERC-20 token.

It is missing:

* approve()
* transferFrom()
* totalSupply()
* allowances
* decimals
* symbol
* name

But conceptually?

It is the foundation of ERC-20.

---

# 🚀 Since You're Technical

This is basically:

* A decentralized balance system
* With a privileged admin (minter)
* With public transfer functionality
* And event-based logging

