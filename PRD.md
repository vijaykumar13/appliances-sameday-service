# PRD: Same Day Service - Home Appliance Repair Web Application

## Context

**Same Day Service** is a home appliance repair company operating in **Queens, Nassau County, and Suffolk County, NY**. The company needs a full-stack web application to establish its online presence, allow customers to book service appointments, and manage technician dispatch and invoicing internally.

**Owner:** Jay
**Tagline:** "Best Home Appliance Repairs"
**Contact:** Call or Text 516-350-0785 | 516-637-4474
**Hours:** 7AM - 8PM (Call or Text)
**Active Promotion:** $35 Off on your next repair (coupon)

### Brand Identity (from business card)
- **Primary Color:** Yellow (#FFD700 / bright yellow)
- **Accent Colors:** Red (for CTAs, promotions), Black (text)
- **Tone:** Bold, urgent, trustworthy - emphasizes same-day speed
- **Visual Style:** Appliance imagery, clean and direct messaging

---

## 1. Product Overview

A multi-tenant web application consisting of:
1. **Customer-facing website** - marketing, service info, booking, and customer portal
2. **Admin dashboard** - job management, dispatching, invoicing, and analytics
3. **Technician mobile view** - field-ready interface for assigned jobs

### Tech Stack (Recommended)
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 15 (App Router)** | SSR for SEO, API routes, fast performance |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid UI development, consistent design system |
| Database | **PostgreSQL (via Supabase)** | Auth, real-time, storage, and DB in one platform |
| ORM | **Prisma** | Type-safe database queries |
| Payments | **Stripe** | Online card payments, invoicing |
| SMS/Notifications | **Twilio** | Appointment confirmations, reminders |
| Calendar | **Cal.com (embedded) or custom** | Real-time availability booking |
| i18n | **next-intl** | Multi-language support (EN, ES, + more) |
| Hosting | **Vercel** | Optimized for Next.js, edge functions |
| Maps | **Google Maps API** | Service area display, technician routing |

---

## 2. Services Offered

| Category | Appliances |
|----------|-----------|
| Laundry | Washer, Dryer |
| Kitchen | Range/Oven/Stove, Dishwasher, Refrigerator |
| HVAC | Central A/C |
| Plumbing | General plumbing repairs |

**Service Area:** Queens (NYC), Nassau County, Suffolk County - Long Island, NY

---

## 3. User Roles

| Role | Description |
|------|-------------|
| **Visitor** | Unauthenticated user browsing the site |
| **Customer** | Registered user who can book and track services |
| **Technician** | Field employee who receives and completes job assignments |
| **Admin** | Business owner/manager with full system access |

---

## 4. Customer-Facing Website

### 4.1 Pages & Features

#### Homepage
- Hero section with strong CTA ("Book Same-Day Service" / "Call Now")
- Click-to-call buttons for both phone numbers (516-350-0785, 516-637-4474)
- Click-to-text support (SMS deeplink for mobile users)
- **$35 Off coupon banner** - prominent promotion matching business card
- Service category cards (washer, dryer, range, dishwasher, fridge, A/C, plumbing)
- Service area map highlighting Queens, Nassau, Suffolk
- Trust signals: reviews/testimonials, years of experience, licensing info
- "How It Works" section (Book > We Arrive > We Fix)
- Emergency/same-day service badge
- Business hours display: "Call or Text 7AM - 8PM"

#### Services Pages
- Individual page per service category (SEO-optimized)
- Common problems & solutions for each appliance
- Pricing transparency (starting-at pricing or "free estimate" messaging)
- Brand compatibility list (e.g., Samsung, LG, Whirlpool, GE, etc.)

#### Booking Page
- **Option A - Service Request Form:**
  - Appliance type (dropdown)
  - Problem description (text)
  - Preferred date/time window
  - Address (with service area validation)
  - Contact info (name, phone, email)
  - Photo upload (optional - up to 3 images of the issue)
  - Submission triggers SMS/email confirmation
- **Option B - Real-Time Calendar Booking:**
  - Select service type
  - View available time slots by day
  - Self-schedule appointment
  - Instant confirmation via SMS + email

#### Customer Portal (authenticated)
- View upcoming and past appointments
- Track technician ETA on service day (live status)
- View invoices and make payments
- Rate and review completed services
- Message/chat with support

#### About Page
- Company story, mission, values
- Team/technician profiles (optional)
- Licensing, insurance, certifications

#### Contact Page
- Phone numbers with click-to-call
- Contact form
- Service area map
- Business hours

#### Blog/Tips (Phase 2)
- Appliance maintenance tips
- SEO content for local search ranking

### 4.2 Multi-Language Support
- **Primary:** English
- **Secondary:** Spanish
- **Future:** Additional languages as needed (Mandarin, Korean, Russian based on Queens demographics)
- Language toggle in header/footer
- All customer-facing content translated
- Booking forms and confirmations in selected language

---

## 5. Admin Dashboard

### 5.1 Job Management
- **Job board** with Kanban view: New > Assigned > In Progress > Completed > Invoiced
- Create/edit/cancel jobs
- Assign technicians to jobs
- View job details: customer info, appliance, problem, photos, notes
- Job history and audit log

### 5.2 Scheduling & Dispatch
- Calendar view of all appointments by day/week
- Drag-and-drop technician assignment
- Service area zone management (Queens, Nassau, Suffolk)
- Route optimization suggestions (Google Maps integration)
- Conflict detection (double-booking prevention)

### 5.3 Customer Management
- Customer database with search/filter
- Service history per customer
- Contact info and address management
- Customer notes and flags

### 5.4 Invoicing & Payments
- Generate invoices from completed jobs
- Itemized billing: labor, parts, service fee
- Send invoice via email/SMS
- Accept Stripe payments (credit/debit)
- Track cash/check payments manually
- Payment status tracking (pending, paid, overdue)
- Daily/weekly/monthly revenue reports

### 5.5 Technician Management
- Technician profiles and skill sets
- Availability/schedule management
- Performance metrics (jobs completed, ratings, response time)
- Assign service zones

### 5.6 Analytics & Reports
- Revenue dashboard (daily, weekly, monthly)
- Jobs by service type, area, technician
- Customer acquisition metrics
- Average response time and completion time
- Customer satisfaction ratings

### 5.7 Promotions & Coupons
- Create/edit/deactivate coupon codes (e.g., "$35 Off" matching business card promo)
- Set discount type (flat amount or percentage)
- Expiration dates and usage limits
- Track coupon redemptions
- Display active promotions on customer-facing site (banner, popup, or badge)

### 5.8 Settings
- Business hours configuration
- Service area boundaries
- Pricing/rate card management
- Notification templates (SMS/email)
- User role management

---

## 6. Technician Mobile View

A responsive, mobile-optimized web interface (PWA) for technicians:

### 6.1 Features
- **Today's Jobs** - list of assigned jobs for the day
- **Job Details** - customer info, address, appliance, problem description, photos
- **Navigation** - one-tap Google Maps directions to customer address
- **Status Updates** - mark job as: En Route > Arrived > In Progress > Completed
- **Job Notes** - add notes, photos of repair, parts used
- **Time Tracking** - clock in/out per job
- **Invoice Draft** - create preliminary invoice on-site (parts + labor)
- **Customer Signature** - digital signature capture for completed work
- **Offline Mode** - basic functionality when signal is poor

---

## 7. Notifications System

| Event | Customer | Technician | Admin |
|-------|----------|------------|-------|
| Booking confirmed | SMS + Email | SMS | Dashboard |
| Technician assigned | SMS | SMS + Push | Dashboard |
| Technician en route | SMS (with ETA) | - | - |
| Job completed | SMS + Email | - | Dashboard |
| Invoice sent | Email + SMS | - | Dashboard |
| Payment received | Email | - | Dashboard |
| Review request | SMS (24h after) | - | - |

---

## 8. SEO & Marketing

- Server-side rendered pages for search engine indexing
- Local SEO optimization (Google Business Profile integration)
- Schema markup for local business, services, reviews
- Meta tags, Open Graph, Twitter cards per page
- Sitemap.xml and robots.txt
- Page speed optimization (Core Web Vitals)
- Google Analytics 4 + conversion tracking
- Call tracking integration (optional)

---

## 9. Database Schema (Key Entities)

```
Users (id, email, phone, name, role, language_pref, created_at)
Customers (id, user_id, address, city, county, zip, notes)
Technicians (id, user_id, skills[], zones[], availability, rating)
Jobs (id, customer_id, technician_id, service_type, appliance, status, description, photos[], scheduled_at, completed_at, notes)
Invoices (id, job_id, items[], subtotal, tax, total, payment_method, payment_status, stripe_id, paid_at)
Reviews (id, job_id, customer_id, rating, comment, created_at)
Notifications (id, user_id, type, channel, message, sent_at, read_at)
```

---

## 10. Phased Rollout

### Phase 1 - MVP (Weeks 1-4)
- Customer website (homepage, services, contact, about)
- Service request form (non-calendar booking)
- Admin dashboard (job management, basic scheduling)
- Multi-language: English + Spanish
- Click-to-call integration
- Basic SEO setup

### Phase 2 - Core Features (Weeks 5-8)
- Customer portal (auth, appointment tracking)
- Real-time calendar booking
- Technician mobile view
- Invoicing + Stripe payments
- SMS notifications (Twilio)
- Review/rating system

### Phase 3 - Advanced (Weeks 9-12)
- Live technician ETA tracking
- Route optimization
- Analytics dashboard
- Blog/content section
- Additional languages
- PWA / offline mode for technicians
- Customer chat/messaging

### Phase 4 - Growth (Ongoing)
- Referral program
- Loyalty/repeat customer discounts
- Parts inventory management
- Automated marketing emails
- Integration with Google Business Profile reviews
- Mobile app (React Native) if needed

---

## 11. Non-Functional Requirements

| Requirement | Target |
|------------|--------|
| Page Load Time | < 2 seconds (LCP) |
| Mobile Score | > 90 (Lighthouse) |
| Uptime | 99.9% |
| Security | HTTPS, OWASP compliance, encrypted PII |
| Accessibility | WCAG 2.1 AA |
| Browser Support | Chrome, Safari, Firefox, Edge (latest 2 versions) |
| Responsive | Mobile-first, all screen sizes |

---

## 12. Verification & Testing Plan

1. **Unit tests** - Vitest for component and utility testing
2. **Integration tests** - API route testing with mock DB
3. **E2E tests** - Playwright for critical flows (booking, payment, admin)
4. **Manual QA** - Mobile responsiveness, multi-language, click-to-call
5. **Lighthouse audit** - Performance, accessibility, SEO scores
6. **Load testing** - Ensure booking system handles concurrent requests
7. **Preview deployments** - Vercel preview URLs for each PR

---

## 13. Project Structure

```
appliances-sameday-service/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── [locale]/           # i18n locale routing
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── services/       # Service pages
│   │   │   ├── booking/        # Booking flow
│   │   │   ├── contact/        # Contact page
│   │   │   ├── about/          # About page
│   │   │   ├── portal/         # Customer portal (auth)
│   │   │   └── blog/           # Blog (Phase 2+)
│   │   ├── admin/              # Admin dashboard
│   │   ├── technician/         # Technician mobile view
│   │   └── api/                # API routes
│   ├── components/             # Shared UI components
│   ├── lib/                    # Utilities, DB client, auth
│   ├── i18n/                   # Translation files
│   └── styles/                 # Global styles
├── prisma/                     # Database schema & migrations
├── public/                     # Static assets
├── messages/                   # next-intl translation JSONs
│   ├── en.json
│   └── es.json
└── tests/                      # Test files
```

---

## 14. Getting Started (Implementation)

1. Initialize Next.js 15 project with TypeScript
2. Set up Tailwind CSS + shadcn/ui
3. Configure Prisma + Supabase PostgreSQL
4. Set up next-intl for i18n
5. Build homepage and service pages
6. Implement booking form
7. Build admin dashboard shell
8. Deploy to Vercel

---

---

## 15. Extensibility & Future AI Features

The application must be built with a **modular, plugin-friendly architecture** so new features can be added without rewriting core code.

### Architecture Principles
- **Modular structure** - each feature (booking, invoicing, notifications, etc.) is a self-contained module
- **API-first design** - all functionality exposed via REST/tRPC API routes, enabling future integrations
- **Event-driven hooks** - key actions (booking created, job completed, payment received) emit events that plugins/modules can subscribe to
- **Feature flags** - toggle features on/off via admin settings without code deploys
- **Middleware pipeline** - extensible request/response processing chain

### Planned Future Modules

#### AI Chatbot (Phase 3+)
- **Customer-facing chatbot** on the website for:
  - Answering common questions (pricing, service area, hours)
  - Guiding customers through booking flow
  - Troubleshooting appliance issues before dispatching a tech
  - Scheduling/rescheduling appointments via chat
- **Integration points:** Claude API / Anthropic SDK, or pluggable LLM provider
- **Admin chatbot** for internal queries (lookup customer, check schedule)

#### AI Voice / Audio Agent (Phase 4+)
- **AI phone answering** for after-hours or overflow calls
  - Capture caller details, appliance issue, preferred time
  - Create service requests automatically
  - Transfer to live agent when needed
- **Voice-to-text** transcription for technician job notes
- **Integration points:** Twilio Voice + AI speech services, ElevenLabs, or OpenAI Whisper

#### Additional Future Integrations
| Module | Description |
|--------|------------|
| **WhatsApp Business** | Customer communication via WhatsApp |
| **Inventory Management** | Track parts stock, auto-reorder |
| **Fleet/GPS Tracking** | Real-time technician location tracking |
| **Accounting Sync** | QuickBooks / Xero integration |
| **CRM Integration** | Sync with HubSpot, Salesforce, etc. |
| **Review Aggregation** | Pull/push reviews to Google, Yelp |
| **AI Diagnostics** | Photo-based appliance issue detection |
| **Customer SMS Bot** | Two-way SMS conversation for booking/status |
| **Zapier/Make Webhooks** | Connect to 1000+ third-party apps |

### Plugin Interface (Technical)
```typescript
// Example plugin interface for extensibility
interface SameDayPlugin {
  name: string;
  version: string;
  initialize(app: AppContext): Promise<void>;
  onEvent?(event: AppEvent): Promise<void>;
  routes?: ApiRoute[];        // Additional API endpoints
  adminPages?: AdminPage[];   // Additional admin dashboard pages
  widgets?: DashboardWidget[]; // Dashboard widget components
  cleanup?(): Promise<void>;
}
```

Each plugin can:
- Register new API routes
- Add pages/tabs to the admin dashboard
- Add widgets to dashboards
- Subscribe to system events (job created, payment received, etc.)
- Access shared services (DB, notifications, auth)

---

*This PRD will be the source of truth as we build Same Day Service. Each phase will be broken into implementation tasks.*
