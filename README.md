# Marketly — Multi-Vendor Marketplace

A responsive multi-vendor marketplace frontend built with Next.js, TypeScript and Tailwind CSS.

## Current build

### Phase 1 — Marketplace foundation
- Responsive homepage and navigation
- Category browsing, product search and promotional sections
- Vendor highlights and wholesale discovery section

### Phase 2 — Product discovery and cart foundation
- Individual product detail routes at `/products/[id]`
- Product image gallery and product option selection
- Shared cart state across pages, persisted in browser local storage

### Phase 3 — Cart and checkout experience
- Dedicated shopping cart at `/cart`
- Quantity updates and item removal, including variant-aware cart lines
- Cart items grouped by vendor with store subtotals
- Order summary with estimated per-store delivery
- Frontend demo coupon codes: `WELCOME10` and `MARKET500`
- Delivery information form and multi-vendor order breakdown at `/checkout`
- Empty-cart, form-validation and demo confirmation states

## Run locally

Requirements: Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To create a production build:

```bash
npm run build
npm start
```

## Current limitations

This is a frontend demonstration using sample catalogue and vendor data. Cart contents are stored in the current browser only. Coupon checks and delivery estimates are frontend demonstrations, not server-validated pricing. Checkout does not create a real order or collect payment. Authentication, database integration, inventory reservation, payment processing, order management, wallet funding, commissions and vendor payouts are not implemented yet.

## Project direction

The planned marketplace will support independent vendors, retail and wholesale purchasing, promotions and coupons, customer wallets, multi-vendor checkout, and marketplace administration. These capabilities will be added in separate development phases.
