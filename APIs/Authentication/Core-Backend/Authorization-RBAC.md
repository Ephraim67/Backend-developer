## What is Authorization?

**Authorization** is about **what you are allowed to do** *after* you've logged in (authenticated).

Example:  
- Authentication: "Are you John?" (You log in.)
- Authorization: "Is John allowed to access the admin dashboard?" (Permissions check.)

---

# What is RBAC (Role-Based Access Control)?

**RBAC** =  
Instead of giving permissions **directly to users**, you **assign roles** to users.  
Each **role** has a **set of permissions**.

**User → Role → Permissions**

**Real-life analogy:**  
At a company:
- **Manager role** → Can approve budgets, view reports.
- **Engineer role** → Can deploy code, access servers.
- **Intern role** → Can only view documents.

When a new engineer joins, you don't manually set 100 permissions — you just assign them the "Engineer" role.

# Simple Example in Code (Node.js Express)

Imagine a basic RBAC system:

```javascript
const roles = {
  admin: ['create_user', 'delete_user', 'view_reports'],
  user: ['view_profile'],
  guest: []
};

// Middleware to check if user has permission
function authorize(permission) {
  return (req, res, next) => {
    const userRole = req.user.role; // Assume req.user.role is set (like 'admin' or 'user')
    if (roles[userRole] && roles[userRole].includes(permission)) {
      next();
    } else {
      res.status(403).send('Forbidden');
    }
  };
}

// Example Express route
app.get('/admin/reports', authorize('view_reports'), (req, res) => {
  res.send('Here are the admin reports');
});
```

- If `req.user.role` is `'admin'`, they can view reports.
- If `req.user.role` is `'user'`, they get `403 Forbidden`.



# Key Terms in RBAC

| Term        | Meaning                        |
|-------------|---------------------------------|
| Role        | A job title or function (Admin, User, Guest) |
| Permission  | A specific action allowed (read, write, delete) |
| User        | A person who has one or more roles |


# Visual of RBAC Structure

```
Users ---> Roles ---> Permissions

e.g.,
Alice ---> Admin ---> [Create User, Delete User]
Bob   ---> User  ---> [View Profile]
```


# Quick Pros and Cons of RBAC

**Pros:**
- Easy to manage (especially in big systems).
- New users are easy to onboard: just assign a role.
- Consistent access control policies.

**Cons:**
- Not flexible enough if permissions need to vary for individuals.
- Sometimes needs to be combined with **ABAC** (Attribute-Based Access Control) for complex needs.


# Bonus: How it's often stored (example database tables)

| Users Table     | Roles Table    | Permissions Table     | Role-Permissions Table |
|-----------------|----------------|------------------------|-------------------------|
| id, name, role  | id, role_name   | id, permission_name    | role_id, permission_id  |



**In short:**  
RBAC is **"grouping permissions by job roles"** and then **assigning users to roles**.
