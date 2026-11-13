# Maykar Professional Painting — website + admin panel

Next.js (App Router) site for Maykar Professional Painting LLC
(Charlottesville, VA): public pages in English, real before/after project
photos, and an admin panel in Spanish that the owner runs without a
developer.

Live: https://maykarpainting.vercel.app

## How customers reach the business

- **Free estimates are requested by text message.** Every estimate button
  opens the visitor's own texting app addressed to the owner's number,
  prefilled with "Hi! I'd like a free estimate for my project." No AI and no
  calculated prices (see `lib/sms.js`).
- **Call Now / Text Us** buttons use the phone numbers from the admin panel.
- **Contact form**: saves the request in Supabase (visible in `/admin/leads`)
  and emails the owner through Resend.

## Stack

| Piece | Service | Notes |
|---|---|---|
| Hosting | Vercel (project `michael-construction`) | Deploys automatically on every push to `master` |
| Database + photo storage | Supabase (free plan) | Tables in `supabase/schema.sql`; portfolio photos in the public `portfolio-photos` bucket |
| Email | Resend | Sender is `onboarding@resend.dev` until a custom domain is verified (`lib/notify.js`) |

**Keeping Supabase awake:** the free plan pauses a project after about a
week without activity. A daily Vercel cron (`vercel.json`) calls
`/api/keepalive`, which runs a tiny query. If Supabase is ever unreachable
anyway, the public pages fall back to the content in `data/` instead of
returning an error (`lib/db.js`).

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Public site at `http://localhost:3000`, admin at `http://localhost:3000/admin`.

## Environment variables (Vercel → Settings → Environment Variables)

| Variable | Required | Purpose |
|---|---|---|
| `ADMIN_PASSWORD` | Yes | Admin panel password. The app refuses to start the admin without it in production |
| `SESSION_SECRET` | Yes | Long random string used to sign admin sessions (they expire after 7 days) |
| `SUPABASE_URL` | Yes | Supabase → Project Settings → API |
| `SUPABASE_SECRET_KEY` | Yes | Server-only secret key. Never expose it with a `NEXT_PUBLIC_` prefix |
| `RESEND_API_KEY` | For email | Without it, lead emails are only logged to the server console |
| `NEXT_PUBLIC_SITE_URL` | Optional | Public URL used in SEO metadata and email links. Defaults to `https://maykarpainting.vercel.app` |

## Admin panel (`/admin`)

Leads, site texts and contact details (including the business address),
services, FAQ, testimonials (visitor reviews stay hidden until approved) and
portfolio (before/after photo uploads, JPG/PNG/WEBP/HEIC up to 8 MB).
Deleting a portfolio project also deletes its photos from storage.

## Photos

`public/work/` holds 12 real before/after project pairs used across the
site. License plates, house numbers and other third-party details are
blurred, and all metadata (including GPS) is stripped. The same photos are
also loaded into the portfolio through the admin panel, where the owner can
edit or remove them.

## Structure

```
app/            public pages, admin pages and API routes (App Router)
components/     shared UI
lib/            db.js (Supabase + fallback), auth.js, notify.js, sms.js,
                rateLimit.js, validate.js
data/           fallback content shown if Supabase is unreachable
public/work/    real project photos
supabase/       database schema
```

## Notes

- Security headers (no framing, nosniff, referrer and permissions policies)
  are set in `next.config.js`. Old Spanish routes and the removed `/estimate`
  page redirect to their current equivalents there too.
- Rate limiting (`lib/rateLimit.js`) is in-memory per instance, which is fine
  at this traffic level.
- Admin copy is in Spanish (the owner's working language); all public copy is
  in English for the US market.
