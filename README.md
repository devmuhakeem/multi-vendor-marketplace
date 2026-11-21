# Marketly — Multi-Vendor Marketplace

A responsive multi-vendor marketplace frontend built with Next.js, TypeScript and Tailwind CSS.

## Current build

### Phase 1 — Marketplace foundation
- Responsive homepage and navigation
- Category browsing, product search and promotional sections
- Vendor highlights and wholesale discovery section

### Phase 2 — Product discovery and cart foundation
- Individual product detail routes at `/products/[id]`
- Product image gallery
- Product option selection and quantity controls
- Stock indicators, product highlights and related products
- Shared cart state across pages, persisted in browser local storage
- Homepage quick-add with default product options

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

This is still an early frontend build. The catalogue and store information are sample data. Cart contents are stored in the current browser only. Authentication, vendor onboarding and dashboards, database integration, payment processing, order management, wallet funding, commissions and payouts are not implemented yet.

## Project direction

The planned marketplace will support independent vendors, retail and wholesale purchasing, promotions and coupons, customer wallets, multi-vendor checkout, and marketplace administration. These capabilities will be added in separate development phases.
