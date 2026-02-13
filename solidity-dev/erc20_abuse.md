Yeah… sadly, what happened to your friend is **very common in fake airdrops**.
They didn’t need his seed phrase — they abused **wallet approvals and signatures**.

Let me explain **exactly how this is possible** in a safe, educational way 👇

---

## 🧠 Key idea:

Your friend **did not get hacked**
He **authorized the theft himself** (without realizing it)

The scam works by tricking you into signing something dangerous.

---

## 🔥 How the scam usually works (step by step)

### 1️⃣ Fake airdrop site

They advertise:

> “Claim free tokens”

Your friend:
✅ Connects wallet
✅ Clicks “Claim”

So far, normal.

---

### 2️⃣ The trick: hidden malicious approval

Instead of a real airdrop, the site makes him sign something like:

> “Approve this contract to manage your tokens”

Behind the scenes, it’s:

```solidity
approve(scamContract, UNLIMITED)
```

That means:
🚨 The scam contract now has **permission to move his tokens**

This is called:
👉 **ERC20 approval abuse**

---

### 3️⃣ The draining happens AFTER

Once approved, the attacker can call:

```solidity
transferFrom(victim, attacker, amount)
```

They can:

* Drain USDT
* Drain ETH (via wrapped tokens)
* Drain stablecoins
* Drain NFTs

All without asking again.

Your friend sees:
💀 Wallet emptied
💀 Airdrop token was just bait

---

## 🧨 Another variation: signature drain (even worse)

Some scams use:

> “Sign message to verify wallet”

That signature is used to create:
👉 A **permit() approval**
or
👉 A **meta-transaction**

So:
❌ No transaction popup
❌ Just “Sign”
✅ Funds gone later

This is why:
⚠️ “Sign message” can be dangerous too

---

## 🧬 Why the blockchain allowed it

Because blockchain sees:
✔ Valid signature
✔ Valid approval
✔ Valid transaction

From chain’s point of view:

> “Owner authorized this”

So it’s irreversible.

---

## 🛡️ How to protect yourself (and your friend)

### ✅ Always read wallet popups

If it says:

* “Give permission to spend your tokens”
* “Set approval for all”

🚩 RED FLAG

---

### ✅ Revoke approvals regularly

Use:

* Revoke.cash
* Etherscan Token Approvals

---

### ❌ Never trust:

* “Urgent airdrop”
* “Fix your wallet”
* “Verify wallet”

---

### ❌ Never sign blind

If message is random hex or long unreadable:
🚩 Be careful

---

## 🧠 In one sentence:

> Your friend approved a malicious smart contract, and that contract legally transferred his assets away.

Not hacking.
Not seed phrase.
Just **weaponized permission**.

---

## Important distinction

| Thing                     | Safe? |
| ------------------------- | ----- |
| Connect wallet            | ✅     |
| Sign normal tx (transfer) | ✅     |
| Approve unknown contract  | ❌     |
| Sign blind message        | ❌     |
| Enter seed phrase         | 💀    |

---

## If you want, I can show you:

✅ What a malicious approval looks like
✅ How to inspect transactions
✅ How to revoke approvals
✅ How to build your own dApp safely
✅ How scammers design fake airdrops
✅ How to warn users in your app

Just tell me which one you want next.
