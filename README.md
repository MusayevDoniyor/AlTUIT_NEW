# Muhammad al-Xorazmiy nomidagi TATU Akademik Litseyi — Official Website

The official website of the TATU Academic Lyceum named after Muhammad al-Khwarizmi, a public educational institution specializing in exact sciences (technical and economics tracks) for 9th-grade graduates. Built with Next.js.

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **TypeScript**
- **Tailwind CSS 4**
- **Supabase** (PostgreSQL + Auth + Storage)
- **Framer Motion** (animations)
- **Lucide React** (icons)
- **React 19**

## Project Structure

```
src/
  app/
    layout.tsx                    # Root layout + metadata + JSON-LD
    page.tsx                      # Homepage (client, UI only)
    not-found.tsx                 # Custom 404 page
    robots.ts                     # /robots.txt
    sitemap.ts                    # /sitemap.xml (dynamic)
    globals.css
    about/
      page.tsx                    # Server component (metadata)
      AboutClient.tsx             # Client component (UI)
    admission/
      page.tsx                    # Server component (metadata)
      AdmissionClient.tsx         # Client component (UI)
    news/
      page.tsx                    # Server component (metadata)
      NewsClient.tsx              # Client component (UI)
      [id]/
        page.tsx                  # Server component (generateMetadata)
        NewsDetailClient.tsx      # Client component (UI)
    science/
      page.tsx                    # Server component (metadata)
      ScienceClient.tsx           # Client component (UI)
    contact/
      page.tsx                    # Server component (metadata)
      ContactClient.tsx           # Client component (UI)
    login/
      page.tsx                    # Server component (metadata + noindex)
      LoginClient.tsx             # Client component (UI)
    altuit-dashboard/
      layout.tsx                  # Admin layout (auth-protected)
      page.tsx                    # Dashboard home
      login/page.tsx              # Admin login
      news/page.tsx               # News CRUD
      leadership/page.tsx         # Leadership CRUD
      teachers/page.tsx           # Teachers CRUD
      achievements/page.tsx       # Achievements CRUD
      gallery/page.tsx            # Gallery CRUD
      hero/page.tsx               # Hero slides CRUD
      stats/page.tsx              # Stats CRUD
      admission/page.tsx          # Admission rules CRUD
      _components/ui.tsx          # Shared admin UI components
  components/
    Navbar.tsx                    # Navigation bar
    Footer.tsx                    # Footer
  lib/
    config.ts                     # siteConfig (NEXT_PUBLIC_SITE_URL)
    supabase.ts                   # Supabase client
    db.ts                         # Database functions (news, leadership, teachers, etc.)
    i18n.ts                       # Translations (Uzbek, Russian, English)
    LangContext.tsx               # Language context provider
  middleware.ts                   # Admin route protection + /admin redirect
.env.example                      # Environment variables template
.env.local                        # Local environment variables (gitignored)
supabase-schema.sql               # Database schema for Supabase
next.config.ts                    # Next.js configuration
package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A Supabase account (free tier works)

### Installation

```bash
# Clone the repository
git clone https://github.com/MusayevDoniyor/AlTUIT_NEW.git
cd AlTUIT_NEW

# Install dependencies
npm install

# Create environment file from template
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.uz
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Database Setup

Run the SQL commands from `supabase-schema.sql` in your Supabase SQL Editor to create all required tables (news, leadership, teachers, achievements, admission_rules, stats, gallery, hero_slides).

### Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

### Public Pages

| Route        | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| `/`          | Homepage with hero slider, stats, directions, and latest news |
| `/about`     | About the lyceum — leadership, teachers, departments, FAQ     |
| `/admission` | Admission steps, required documents, deadlines, rules         |
| `/news`      | News list with pagination                                     |
| `/news/[id]` | Individual news article with full content                     |
| `/science`   | Student achievements and statistics                           |
| `/contact`   | Contact information, map, and contact form                    |

### Admin Panel (`/altuit-dashboard`)

All admin routes are protected via Supabase Auth and middleware cookie check.

| Route                            | Description                                  |
| -------------------------------- | -------------------------------------------- |
| `/altuit-dashboard`              | Dashboard with entity counts and quick links |
| `/altuit-dashboard/news`         | Create, edit, delete news articles           |
| `/altuit-dashboard/leadership`   | Manage leadership team                       |
| `/altuit-dashboard/teachers`     | Manage teaching staff                        |
| `/altuit-dashboard/achievements` | Manage student achievements                  |
| `/altuit-dashboard/gallery`      | Manage photo gallery                         |
| `/altuit-dashboard/hero`         | Manage homepage hero slides                  |
| `/altuit-dashboard/stats`        | Update statistics counters                   |
| `/altuit-dashboard/admission`    | Manage admission rules content               |
| `/altuit-dashboard/login`        | Admin login page                             |

### Admin Access

Create an admin user in Supabase Authentication (Email/Password provider), then log in at `/altuit-dashboard/login`.

## Environment Variables

| Variable                        | Description                                                 |
| ------------------------------- | ----------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`          | Public site URL (used in metadata, sitemap, canonical URLs) |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project URL                                        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous public key                               |

`NEXT_PUBLIC_SITE_URL` is read by `src/lib/config.ts` and used across all metadata, Open Graph, sitemap, and robots.txt generation. Changing this single value updates all hardcoded URLs across the entire application.

## SEO

- Per-page metadata (title, description, keywords, Open Graph) via Server Component wrappers
- Dynamic sitemap (`/sitemap.xml`) with all public routes and news articles
- Robots.txt (`/robots.txt`) excluding admin pages
- JSON-LD structured data (`EducationalOrganization` schema)
- Twitter Card and Open Graph image support
- Custom 404 page with metadata

## Deployment

Deploy to Vercel:

1. Push the repository to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings
4. Deploy

The site will be live at your configured domain.

## Author

TATU Academic Lyceum Web Team — [tatual.uz](https://tatual.uz)
