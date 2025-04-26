# 🧠 What is DMARC?

**DMARC** (Domain-based Message Authentication, Reporting & Conformance) is:

- A **policy** you set in DNS to tell email receivers:
  - **How to handle** emails that **fail** SPF and/or DKIM checks.
  - **Where to send reports** about email activity from your domain.

✅ DMARC enforces your email authentication.  
✅ DMARC can also give you **visibility** into who's sending emails pretending to be you.



# 🌐 Where is DMARC Set?

- DMARC is a **TXT record** inside your domain’s DNS, like SPF and DKIM.

Example DMARC DNS record:

```dns
_dmarc.example.com  IN  TXT  "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com; pct=100"
```

This says:

- `v=DMARC1`: Version
- `p=reject`: Reject emails that fail DMARC
- `rua=mailto:dmarc-reports@example.com`: Send aggregate reports here
- `pct=100`: Apply to 100% of emails



# 🔥 How DMARC Works (Simple Flow)

1. Someone receives an email claiming to be from your domain.
2. Receiver checks:
   - **Did SPF pass?**
   - **Did DKIM pass?**
3. DMARC says:
   - **If neither SPF nor DKIM align → follow the policy (reject, quarantine, or allow)**.
4. Receiver acts based on your DMARC rule.



# 📦 Example DMARC Policies

| Policy (`p=`) | What Happens                                   |
|---------------|------------------------------------------------|
| none          | Do nothing (only monitor/report)              |
| quarantine    | Mark as spam/junk folder                      |
| reject        | Block the email entirely                      |



# 🔥 Step-by-Step How DMARC Actually Happens

Imagine you set:

```dns
_dmarc.yourdomain.com  TXT  "v=DMARC1; p=reject; rua=mailto:you@yourdomain.com"
```

When a receiver gets an email:

- If SPF and/or DKIM **pass** + match the domain → deliver normally.
- If **both fail** → **reject** email (drop it).

Meanwhile, receivers (like Google, Microsoft, etc.) send **DMARC reports** to your `rua` address.  
The report says things like:
- How many emails passed
- How many failed
- IPs trying to send emails as you
- Etc.



# ✅ vs ❌ DMARC Results

| Result  | Meaning                                  |
|---------|------------------------------------------|
| Pass    | SPF or DKIM aligned and verified         |
| Fail    | Neither SPF nor DKIM aligned properly    |



# 🎯 Example Scenario

You own `yourcompany.com`.

Bad actor tries sending fake emails pretending to be from you.

- SPF: FAIL (not from trusted server)
- DKIM: FAIL (signature missing or wrong)

Your DMARC policy says `p=reject`.  
**Result: Email gets completely blocked.**  
The hacker’s email never lands in the user's inbox.

✅ Your brand protected.  
✅ No phishing attacks under your name.



# ⚡ Important Terms:

| Term           | Meaning                                |
|----------------|----------------------------------------|
| Alignment      | The domain in the "From" matches the domain validated by SPF or DKIM |
| rua            | Email address to receive aggregate DMARC reports |
| ruf (optional) | Email address for forensic reports (individual failed emails) |
| pct            | Percentage of emails the policy applies to |



# 🔥 Example of a More Advanced DMARC Record

```dns
_dmarc.example.com  TXT  "v=DMARC1; p=quarantine; pct=50; rua=mailto:dmarc@example.com; ruf=mailto:forensics@example.com; fo=1"
```

- Quarantine emails that fail.
- Only apply policy to **50%** of emails for now.
- Send aggregate and forensic reports.
- `fo=1` means send forensic report if either SPF or DKIM fails.



# 🛡️ Quick Visual Summary

```
Incoming email
    ⬇️
Check SPF + Check DKIM
    ⬇️
Match domain? 
    ⬇️
  ✅ Pass → Deliver
  ❌ Fail → Follow DMARC policy (none / quarantine / reject)
```



# 📢 Final Super Quick Summary

| SPF    | DKIM    | DMARC                         |
|--------|---------|--------------------------------|
| Who can send from your domain (IP check) | Is the email unchanged + signed? | What to do if SPF/DKIM fail? |
| DNS record (TXT) | DNS record (TXT with public key) | DNS record (TXT with policy) |



# Bonus Tip:

✅ **Best practice rollout**:
1. Start with `p=none` (monitoring only).
2. Review DMARC reports.
3. Then move to `p=quarantine`.
4. Finally go full `p=reject` once you're sure.
