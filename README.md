# Marketly — Multi-Vendor Marketplace

A responsive multi-vendor marketplace built with Next.js, TypeScript, Tailwind CSS, Prisma and PostgreSQL.

## Development phases

### Phase 1 — Marketplace foundation
- Responsive marketplace homepage and navigation
- Category browsing, search, promotional sections and vendor highlights

### Phase 2 — Product discovery
- Product detail routes, galleries and option selection
- Shared browser-persisted cart foundation

### Phase 3 — Cart and checkout experience
- Dedicated cart with quantity updates, removal and vendor subtotals
- Frontend demonstration coupons and delivery estimates
- Delivery information form and multi-vendor order summary

### Phase 4 — Backend foundation
- PostgreSQL relational schema managed by Prisma
- User accounts with hashed passwords and signed, HTTP-only session cookies
- Customer registration, login, logout and current-session endpoints
- Vendor application workflow with pending approval status and administrator review endpoint
- Public product catalogue API and approved-vendor product listing endpoint
- Authenticated order creation and customer order-history endpoints with server-side price lookup, database coupon redemption and transactional stock reservation
- Order, vendor, coupon and wallet-ledger data models
- Database health endpoint

## Requirements

- Node.js 20+
- PostgreSQL 14+
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create your environment file:

```bash
cp .env.example .env
```

3. Set `DATABASE_URL` to your PostgreSQL database and generate a strong `AUTH_SECRET` (at least 32 characters). Do not commit real credentials.

4. Generate the Prisma client and create the database tables:

```bash
npm run db:generate
npm run db:migrate -- --name init
```

5. Start the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Backend API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Database connectivity |
| POST | `/api/auth/register` | Create a customer account |
| POST | `/api/auth/login` | Sign in |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/auth/me` | Current signed-in user |
| POST | `/api/vendors/apply` | Submit vendor application |
| GET | `/api/products` | Browse approved vendors' products |
| POST | `/api/products` | Create a product for an approved vendor |
| GET | `/api/orders` | View the signed-in customer's order history |
| POST | `/api/orders` | Create an order, redeem an eligible database coupon and reserve stock |
| PATCH | `/api/admin/vendors/:vendorId/review` | Approve, reject or suspend a vendor (admin only) |

The order endpoint accepts product IDs and quantities, then calculates prices from database records. It does not trust prices sent by the browser. Multi-vendor products are stored as line items under one customer order.

## Important security and deployment notes

- Never commit `.env`, database passwords, or authentication secrets.
- Customer registration cannot create administrator accounts.
- Vendor applications remain pending until an administrator approves them through `PATCH /api/admin/vendors/:vendorId/review`. An administrator account must be provisioned securely outside public registration.
- Payment processing, wallet deposits/withdrawals, refunds, commission settlement, vendor payouts, rate limiting, email verification and password reset are not enabled in this phase. Coupon redemption is server-validated when a coupon has been created in the database.
- The existing homepage catalogue and browser cart remain demo data until the frontend is connected to these APIs.
- The order API creates an unpaid order and reserves inventory in a database transaction. A payment/expiry workflow must be added before production use so unpaid reservations can be released.
- Use HTTPS in production and configure secrets in your hosting provider.

## Production build

```bash
npm run build
npm start
```
