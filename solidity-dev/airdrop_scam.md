Great question — and this is where things get scary, because:

> A **dangerous signature does not look dangerous** to most users.

It often looks like a normal “Sign message” popup.

Let’s answer your two parts clearly:

---

# 🧨 1. What does a dangerous signature LOOK like?

There are **three common types** you’ll see in wallets:

---

## 🟡 Type 1: Random-looking hex or gibberish

Example (what user sees):

```
Sign message:
0x7f3a2b9c4e9d1f88b7e3c4...
```

To a normal user:

> “I don’t know what this means, but I’ll click sign.”

But inside that data could be:
✔ An approval
✔ A transfer instruction
✔ A permit signature

This is **high risk** because:
❌ You cannot read intent
❌ Wallet can’t explain it
❌ User signs blindly

---

## 🟠 Type 2: Looks innocent but is deceptive

Example:

```
"Sign to verify your wallet for airdrop"
```

But what is actually encoded:

> “I authorize this contract to spend all my USDT”

The **text you see** is fake —
The **data being signed** is different.

This is phishing via UI, not cryptography.

---

## 🔴 Type 3: Structured message (EIP-712) that hides danger

Some wallets show something like:

```
Domain: Token
Function: permit
Spender: 0xScamContract
Value: 115792089237316195423570985008687907853269984665640564039457584007913129639935
```

That huge number =
👉 “Unlimited allowance”

But users don’t know that.

---

# 🧬 2. Is this “programmed”?

YES — 100% programmed.

A scam dApp does this intentionally:

It programs its frontend to:

1. Ask user to connect wallet
2. Trigger a signing request
3. Generate a crafted message
4. Send that signature to attacker’s backend
5. Attacker submits it on-chain

So the dangerous part is:
❌ Not the wallet
❌ Not the blockchain
✅ The dApp code

---

# 🧠 Important distinction

A wallet:
✔ Just signs what it’s given
✔ Cannot know intent
✔ Only verifies cryptography

A dApp:
✔ Chooses what you sign
✔ Chooses how to describe it
✔ Can lie about purpose

So yes —
**This is software-engineered theft.**

---

# ⚠️ Why users fall for it

Because:

* No gas fee
* No “Send transaction” popup
* Just “Sign”
* Looks harmless

They think:

> “Signing can’t move money”

But:
❌ It can authorize money movement

---

# 🧠 Safe vs dangerous signature

| Safe                              | Dangerous                        |
| --------------------------------- | -------------------------------- |
| Login nonce                       | Permit / approval                |
| “Sign to login” from trusted site | “Verify wallet” from random site |
| Readable short message            | Hex blob                         |
| Domain matches site               | Domain mismatch                  |
| No token or amount                | Mentions token/spender           |

---

# 🛡️ Rule of thumb

> If you don’t know exactly WHY you’re signing, don’t sign.

Especially for:

* Airdrops
* DMs
* Random links
* “Urgent” prompts

---

# 🔑 Final answer

**What it looks like:**
Usually:

* Random hex
* Or misleading text
* Or structured data you don’t understand

**Is it programmed?**
Yes.
A malicious dApp is explicitly written to generate signatures that can later be used to steal funds.

---

If you want, next I can show you:

✅ A safe vs malicious signing flow
✅ How wallets try to detect this
✅ How to inspect what you’re signing
✅ How `permit()` works conceptually
✅ How to build a dApp that never abuses signatures

Just say which one.
