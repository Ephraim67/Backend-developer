Core Features:
- Authentication & Roles
 - Admin (Admin has full control)
 - Staff (front-desk, housekeeping, etc..)
 - Guest (view bookings and invoices)

- Room Mangement
 - Room types (Standard, Suite, and Delux)
 - Availability status (occupied, available, maintenance)
 - Pricing

- Booking & Reservation
 - Create, update, cancel reservation
 - Assign guests to rooms
 - Check-in/ check-out process

- Guest Management
 - Store guest details (name, contact, and preferences)
 - Guest History (past stay and loyalty points)

- Biling and Payments
 - Generate Invoice
 - Accept payments (Cash, POS or Transfer)

- CRM Features
 - Send promotional emails or sms to past guests
 - Track feedback and complaints
 - Discounts or loyalty

Backend: Nodejs and Expressjs (for API)
Database: MongoDB
Authentication: JWT
Deploy: Render, AWS and Docker



# Hotel Management CRM — System Architecture & Login Flows



## 1. **System Architecture (High-Level)**

```
                ┌──────────────────────────┐
                │         Frontend         │
                │  (React/Next.js, Mobile) │
                └─────────────┬────────────┘
                              │
                              ▼
                ┌──────────────────────────┐
                │       Backend API        │
                │ (Node.js + Express/Nest) │
                └─────────────┬────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌─────────────────┐
│ Authentication │     │ Business Logic│     │ Payment Gateway │
│ (JWT, Sessions)│     │ (Rooms, Bookings, │  │ Stripe/Paystack │
└───────┬────────┘     │  Guests, Billing) │  └─────────────────┘
        │              └───────────────┘
        ▼
┌──────────────────────────┐
│ Database (Postgres/Mongo)│
│ Tables: Users, Rooms,    │
│ Bookings, Payments, Logs │
└──────────────────────────┘
```



## 2. **Login & Role-Based Flow**

### Step 1: Authentication

* Users log in with **email/username + password** (or guest can register).
* Backend checks **Users table** → verifies credentials.
* On success → issues a **JWT token** containing `role` (admin, staff, guest).
* This token decides what they can/can’t access.



### **Admin Flow**

**Purpose**: Full control of the system.

1. Login → redirected to **Admin Dashboard**.
2. Can:

   * Add/remove staff & manage roles.
   * Manage rooms (create types, set availability, update prices).
   * View all reservations.
   * View & manage payments/reports.
   * Send promotions to guests.

Example:
Admin logs in → sees “20 rooms occupied, 5 vacant, 3 under cleaning” + “Today’s revenue: ₦1,200,000”.



### **Staff Flow**

**Purpose**: Operate daily hotel tasks (front desk, housekeeping, etc.).

1. Login → redirected to **Staff Dashboard**.
2. Can:

   * Create/cancel bookings for walk-in guests.
   * Assign rooms.
   * Perform check-in/check-out.
   * Mark room status (cleaning done, room vacant).
   * View guest details & complaints.

Example:
Staff logs in → sees “Guest John Doe checking out from Room 203 → Generate Invoice.”



### **Guest Flow**

**Purpose**: Self-service for hotel guests.

1. Register/Login → redirected to **Guest Portal**.
2. Can:

   * View available rooms and make reservations.
   * View booking history.
   * Download invoices.
   * Make payments online (Stripe/Paystack).
   * See loyalty points / discounts.

Example:
Guest logs in → sees “You stayed 3 times this year → You’ve earned 500 loyalty points → 10% discount on next booking.”



## 3. **Database Design (Simplified)**

* **Users**

  * `id, name, email, password_hash, role (admin/staff/guest)`
* **Rooms**

  * `id, type, price, status (vacant/occupied/cleaning)`
* **Bookings**

  * `id, user_id, room_id, checkin_date, checkout_date, status`
* **Payments**

  * `id, booking_id, amount, method, status`
* **Guests**

  * `id, user_id, preferences, loyalty_points`



## 4. **End-to-End Example Flow**

🔹 A **guest books a room online**:

1. Guest → logs in → selects Room Type → Book Room.
2. Backend → checks availability → creates Booking in DB.
3. Guest → pays with Paystack → Payment stored in DB.
4. Staff → sees booking on dashboard → assigns actual room number.
5. On checkout → Staff generates invoice → Guest sees/downloads invoice in their portal.
6. Admin → sees all bookings, payments, reports.

**Real-world hotel SaaS**:

* Guests = Customers.
* Staff = Operations.
* Admin = Business Owner.

