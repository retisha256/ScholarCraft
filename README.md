# AcademicPro — Academic Services Website

A production-ready academic services website built with Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion, and Supabase.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19 with Server Components
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion 12
- **Database & Auth**: Supabase (PostgreSQL + Auth + Storage)
- **Forms**: React Hook Form + Zod validation
- **Dark Mode**: next-themes
- **Toast Notifications**: react-hot-toast
- **Icons**: lucide-react

---

## Features

### Public Site
- **Home** — Hero, services overview, why choose us, how it works, testimonials, FAQ, contact
- **About** — Mission, team, milestones
- **Services** — All 9 services with full descriptions and pricing
- **Pricing** — Plans and per-service pricing table
- **How It Works** — 5-step process
- **Blog** — Article listing with search & category filters
- **Contact** — Contact form stored in Supabase
- **Request a Quote** — Full project intake form with file upload
- **Privacy Policy** & **Terms of Service**

### Admin Dashboard (`/admin`)
- Protected by Supabase Auth
- **Dashboard** — Stats overview with quick actions
- **Requests** — View, search, filter, update status, view/download files
- **Messages** — Read contact messages, write replies
- **Blog Management** — Create, edit, publish/unpublish, delete posts
- **Subscribers** — Newsletter subscriber list
- **Analytics** — Charts for requests, services, completion rate
- **Settings** — Configuration reference

### Additional Features
- 🌙 Dark mode toggle
- 🔔 WhatsApp floating button
- 🍪 Cookie consent banner
- 📧 Newsletter signup
- 🗺️ XML Sitemap (`/sitemap.xml`)
- 🤖 robots.txt (`/robots.txt`)
- 🚫 Custom 404 and 500 error pages
- 🔒 Security headers
- 📱 Fully responsive (mobile, tablet, desktop)
- ♿ Accessible (ARIA labels, keyboard navigation, focus management)
- ⚡ Optimized images and fonts
- 🔍 SEO metadata on all pages

---

## Setup Instructions

### 1. Install dependencies

```bash
cd academic-services
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run the database migration

In your Supabase dashboard, go to **SQL Editor** and run the contents of:

```
supabase/migrations/001_initial.sql
```

This creates all required tables, RLS policies, and the file storage bucket.

### 4. Create an admin user

In Supabase → Authentication → Users, click **Add User** and create your admin account.

### 5. Configure environment variables

Copy `.env.local` and fill in your values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

ADMIN_EMAIL=admin@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your-app-password

NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

Find your Supabase keys at: **Settings → API** in your Supabase project.

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 7. Access admin dashboard

Navigate to `/admin` and sign in with the Supabase user you created.

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages with shared Navbar/Footer
│   │   ├── page.tsx       # Home page
│   │   ├── about/
│   │   ├── services/
│   │   ├── pricing/
│   │   ├── how-it-works/
│   │   ├── contact/
│   │   ├── request/       # Project request form
│   │   ├── blog/
│   │   ├── privacy-policy/
│   │   └── terms-of-service/
│   ├── admin/             # Protected admin dashboard
│   │   ├── login/
│   │   ├── requests/
│   │   ├── messages/
│   │   ├── blog/
│   │   ├── subscribers/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/
│   │   └── notify-admin/  # Admin email notification endpoint
│   ├── not-found.tsx      # Custom 404
│   ├── error.tsx          # Custom 500
│   ├── sitemap.ts         # Dynamic sitemap
│   └── robots.ts          # robots.txt
├── components/
│   ├── layout/            # Navbar, Footer
│   ├── providers/         # Theme provider
│   ├── sections/          # Page sections (Hero, FAQ, etc.)
│   └── ui/                # Reusable UI components
├── lib/
│   ├── supabase/          # Supabase client (browser, server, middleware)
│   ├── constants.ts       # Services, testimonials, FAQ, nav data
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Utility functions
│   └── validations.ts     # Zod schemas
└── middleware.ts           # Auth middleware for /admin routes
supabase/
└── migrations/
    └── 001_initial.sql    # Complete database schema
```

---

## Production Deployment

### Deploy to Vercel

```bash
npm run build  # Verify build passes locally
```

Then connect your GitHub repo to Vercel and add environment variables in the Vercel dashboard.

### Add Email Notifications

To enable real admin email notifications when a form is submitted, update `src/app/api/notify-admin/route.ts`. Recommended services:

- **Resend** (resend.com) — Modern email API, free tier available
- **SendGrid** — Enterprise-grade, free tier available

### Custom Domain

Update `NEXT_PUBLIC_SITE_URL` to your production domain for correct sitemap and OpenGraph URLs.

---

## Color Palette

| Name       | Hex       | Usage          |
|------------|-----------|----------------|
| Navy       | `#0F172A` | Primary/Dark   |
| Blue       | `#2563EB` | Secondary/CTAs |
| Gold       | `#F59E0B` | Accent         |
| White      | `#FFFFFF` | Background     |
| Light BG   | `#F8FAFC` | Section BG     |
| Text       | `#1E293B` | Body text      |

---

## License

MIT — Free to use and modify for your business.
