# 🧨 What is a “signature drain” attack?

It abuses something people think is safe:

> 🖊️ “Sign message to verify wallet”

People believe:
✔ Signing is harmless
✔ Only transactions move money

But that’s **not always true**.

Some signatures can be turned into **real blockchain permissions**.

---

# 🧠 Two dangerous things signatures can enable

## 1️⃣ `permit()` (EIP-2612) — off-chain approval

Some tokens (USDC, DAI, etc.) support:

```solidity
permit(owner, spender, value, deadline, v, r, s)
```

This means:
✅ You can approve token spending
❌ WITHOUT sending a transaction
❌ WITHOUT gas
❌ WITHOUT MetaMask popup that says “Approve”

Instead:
You just sign a message.

Then attacker submits that signature on-chain.

Result:

> The attacker now has approval to spend your tokens.

Then later:

```solidity
transferFrom(victim, attacker, allTokens)
```

Wallet never asks again.

---

## 2️⃣ Meta-transactions (relayed transactions)

Some systems let you:

* Sign a transaction off-chain
* A relayer sends it for you

Scam version:
User thinks:

> “I’m just verifying my wallet”

But the signed message is actually:

> “Transfer all tokens to attacker”

User signs it.

Attacker submits it.

Blockchain says:
✔ Valid signature
✔ Valid owner
✔ Execute transfer

Boom. Funds gone.

---

# 🧬 Why “Sign” feels safe but isn’t

Because wallets show messages like:

> “Sign this message to prove ownership”

But the wallet:
❌ Can’t always decode intent
❌ Just shows raw data
❌ User clicks “Sign” blindly

Scammers exploit that.

---

# 📉 Difference between the 3 actions

| Action           | Risk             |
| ---------------- | ---------------- |
| Connect wallet   | Low              |
| Send transaction | Medium (visible) |
| Sign message     | High if blind    |

People fear transactions, but:
⚠️ Blind signatures can be worse.

---

# 🔥 Real-world scam flow

1. Fake airdrop site:

   > “Verify wallet to claim”

2. Wallet pops:

   > “Sign message”

3. User signs

4. That signature is used as:

   * `permit()`
     OR
   * relayed transfer

5. Attacker drains wallet

User never saw:
❌ Token approval popup
❌ Transfer popup

Just:

> “Sign”

---

# 🛡️ How to defend against this (user side)

### ❌ Never sign messages from:

* Airdrops you didn’t expect
* Random links
* Twitter DMs
* Telegram bots

### ❌ Never sign:

* Hex-only blobs
* Long unreadable messages
* “Verify wallet” pages

### ✅ Only sign if:

* You trust the site
* You understand the message
* You initiated the action

---

# 🛠️ How YOU should build dApps safely

If you’re a dev:

### ✅ Use clear signing messages

Example:

```
Sign to login. This does NOT give spending permission.
```

### ❌ Never use signatures to:

* Move user funds
* Grant approvals silently

### ✅ Always show:

* Token
* Amount
* Destination

---

# ⚖️ Why this is worse than normal scams

Because:
✔ No seed phrase stolen
✔ No malware
✔ No hack

Just:

> Legal cryptographic authorization

From blockchain’s view:

> “Owner approved this.”

So it’s irreversible.

---

# 🧠 Mental model (important)

A signature is like:
✍️ A signed blank cheque

If you don’t know what’s written on it:
Someone else can fill it.

---

# 🔑 One-line summary

> Signature drain scams trick users into signing cryptographic approvals that allow attackers to move funds later without further permission.

---

If you want, I can next show you (safely):

✅ What a dangerous signature looks like
✅ How wallets try to warn users
✅ How to detect a malicious site
✅ How `permit()` actually works conceptually
✅ How to design anti-phishing UX
✅ How to explain this to non-technical users

Just tell me which one you want to explore.
