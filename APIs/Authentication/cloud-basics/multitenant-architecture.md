# 🧠 What is Multi-Tenant Architecture?

Multi-tenant systems **serve multiple customers ("tenants") from the same system**,  
while keeping **their data separate and secure**.

Each **tenant** might be:
- A company
- A team
- An individual user group

---
# 🌐 The Three Big Patterns:

| Pattern                     | Description                                 |
|------------------------------|---------------------------------------------|
| Shared Database, Shared Schema | Everyone’s data in the **same tables**, distinguished by `tenant_id` |
| Shared Database, Separate Schemas | Same database, but **different schemas** for each tenant |
| Isolated Databases            | Each tenant gets their **own entire database** |

---

# 🔥 1. Shared Database, Shared Schema (Most Common)

- **One database**
- **One set of tables** (e.g., `Users`, `Orders`, etc.)
- Each row has a `tenant_id` column to **separate data**.

✅ Cheap and fast.  
✅ Easy to scale horizontally.  
⚠️ You must be VERY careful about **access control**.

### Example:

`Users` table:

| id | tenant_id | name    | email            |
|----|-----------|---------|------------------|
| 1  | tenantA   | Alice   | alice@a.com       |
| 2  | tenantB   | Bob     | bob@b.com         |
| 3  | tenantA   | Charlie | charlie@a.com     |

When tenantA's app logs in, it only queries:

```sql
SELECT * FROM Users WHERE tenant_id = 'tenantA';
```

---

# 🔥 2. Shared Database, Separate Schemas

- **One physical database**
- **Different schema** for each tenant.
  
Example:

- Schema `tenantA` → tables: `tenantA.Users`, `tenantA.Orders`
- Schema `tenantB` → tables: `tenantB.Users`, `tenantB.Orders`

✅ Better separation.  
✅ Still cost-effective.  
⚠️ Managing **migrations** (schema changes) becomes tricky!

---

# 🔥 3. Isolated Databases (Full Isolation)

- Each tenant gets their **own database**.

✅ Strongest security (natural data isolation).  
✅ Customization per tenant is easier.  
⚠️ Costs more (storage, connections).  
⚠️ Harder to manage thousands of tenants.

Example:

- `db_tenantA`
- `db_tenantB`

Connection logic dynamically connects tenant to the correct DB.

---

# ⚡ Row-Level Security (RLS)

**Row-Level Security** (especially in PostgreSQL, SQL Server, etc.) is a DB feature that:

- **Automatically filters rows** based on the logged-in user or tenant.
- **Enforces tenant isolation directly in the database layer**.

You define **policies** that make sure users only see their own rows —  
**even if the query forgets to filter**.

✅ Extra safety layer  
✅ Cleaner application code

---

## 🔥 How RLS Works Example (PostgreSQL):

Enable RLS:

```sql
ALTER TABLE Users ENABLE ROW LEVEL SECURITY;
```

Create a policy:

```sql
CREATE POLICY tenant_isolation_policy
  ON Users
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

Before querying, your app sets:

```sql
SET app.current_tenant = 'tenantA';
```

Then **PostgreSQL automatically** ensures  
any `SELECT`, `UPDATE`, `DELETE` can *only* touch `tenantA`'s rows.

✅ No need to manually add `WHERE tenant_id = ...` in every query anymore!

---

# 📦 Quick Pros and Cons Summary:

| Pattern                        | Pros                            | Cons                              | Best for                  |
|---------------------------------|---------------------------------|-----------------------------------|----------------------------|
| Shared DB, Shared Schema        | Cheap, simple scaling           | High risk if app bugs; security must be tight | SaaS apps with small-medium tenants |
| Shared DB, Separate Schemas     | Better logical isolation        | Harder schema updates             | Mid-sized SaaS or regulated apps |
| Isolated DBs                    | Full isolation, high security   | Expensive, scaling challenges     | Big enterprise tenants, strict security |

---

# 🎯 Quick Visual Map:

```
[Shared DB, Shared Tables]
    ➡️ tenant_id in rows
    ➡️ use RLS if possible

[Shared DB, Separate Schemas]
    ➡️ Different schemas inside one DB

[Isolated DBs]
    ➡️ Different full database per tenant
```

---

# 🛠️ Bonus Tip:

✅ **When starting** — most SaaS products use **Shared DB + RLS**.  
✅ **When scaling up (10k+ tenants)** — some upgrade to **Separate Schemas** or **Isolated DBs** for big tenants.

---

# 🚀 Final Super Quick Summary

| Feature      | Shared DB        | Separate Schema | Isolated DB |
|--------------|------------------|-----------------|-------------|
| Cost         | Low               | Medium           | High        |
| Security     | Medium (needs RLS) | Higher           | Highest     |
| Flexibility  | Medium             | Higher           | Very High   |
| Operational Complexity | Low | Medium             | High        |
