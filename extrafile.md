I already have an existing Next.js website in this project.

IMPORTANT:
Do NOT redesign or break the existing frontend.
Keep the current frontend UI, routes, components and styling intact unless a backend integration requires a small change.

I want you to build a complete production-ready backend and admin portal for this website.

TECH STACK:
- Next.js (use the existing version in package.json)
- TypeScript
- PostgreSQL database
- Prisma ORM
- Secure authentication
- Admin dashboard
- REST API / Next.js API routes
- Zod validation
- bcrypt/argon2 for password hashing
- HTTP-only secure cookies/session authentication
- Tailwind CSS if already installed
- Use existing UI components where possible

==================================================
1. DATABASE
==================================================

Set up PostgreSQL + Prisma.

Create a proper Prisma schema with these models:

User
- id
- name
- email
- passwordHash
- role
- isActive
- createdAt
- updatedAt

Role:
- ADMIN
- EDITOR

ContactMessage
- id
- name
- email
- phone
- subject
- message
- status
- createdAt
- updatedAt

Status:
- NEW
- READ
- REPLIED
- ARCHIVED

Project
- id
- title
- slug
- description
- shortDescription
- image
- category
- client
- projectUrl
- featured
- published
- createdAt
- updatedAt

Service
- id
- title
- slug
- description
- icon
- featured
- published
- createdAt
- updatedAt

Testimonial
- id
- name
- role
- company
- message
- image
- rating
- published
- createdAt
- updatedAt

SiteSetting
- id
- key
- value
- updatedAt

==================================================
2. ADMIN AUTHENTICATION
==================================================

Create a secure admin authentication system.

Routes:

/admin/login
/admin
/admin/projects
/admin/services
/admin/testimonials
/admin/messages
/admin/users
/admin/settings

Login should require:
- Email
- Password

Security requirements:
- Never store plain-text passwords
- Hash passwords using bcrypt or argon2
- Use secure HTTP-only cookies/session
- Protect every /admin route
- Protect admin API endpoints
- Add role-based authorization
- ADMIN can manage everything
- EDITOR can manage content but cannot manage users
- Redirect unauthenticated users to /admin/login
- Add logout functionality
- Add session expiration
- Validate all input server-side
- Prevent unauthorized API access

Do NOT put admin authentication only in frontend JavaScript.
Authentication must be enforced server-side.

==================================================
3. ADMIN DASHBOARD
==================================================

Create a beautiful professional admin dashboard.

Design should match the existing website's color palette:

#3C2521
#4B322E
#6A4B40
#886B60
#B6A69F
#F5F1EE
#FFFFFF

Admin dashboard layout:

SIDEBAR:
- Dashboard
- Projects
- Services
- Testimonials
- Messages
- Users
- Settings
- Logout

TOP BAR:
- Admin profile
- Current user name
- Notifications
- Logout

DASHBOARD HOME:

Show statistic cards:

Total Projects
Published Projects
Total Messages
Unread Messages
Total Services
Testimonials

Add charts where useful.

Show:
- Recent contact messages
- Recently added projects
- Quick actions

Quick action buttons:
- Add Project
- Add Service
- View Messages

Make dashboard fully responsive.

==================================================
4. PROJECT MANAGEMENT
==================================================

Create complete CRUD functionality.

Admin can:

CREATE project
READ project
UPDATE project
DELETE project

Fields:

Title
Slug
Short Description
Description
Category
Client
Project URL
Image
Featured
Published

Features:
- Search projects
- Filter by published/unpublished
- Sort by date
- Pagination
- Edit project
- Delete project with confirmation
- Publish/unpublish toggle
- Featured toggle

Create a clean project form with validation.

==================================================
5. SERVICE MANAGEMENT
==================================================

CRUD for services.

Fields:

Title
Slug
Description
Icon
Featured
Published

Admin can:
- Add service
- Edit service
- Delete service
- Publish/unpublish
- Reorder services if practical

==================================================
6. TESTIMONIAL MANAGEMENT
==================================================

CRUD functionality.

Fields:

Name
Role
Company
Message
Image
Rating
Published

Admin can:
- Add testimonial
- Edit testimonial
- Delete testimonial
- Publish/unpublish
- Set rating

==================================================
7. CONTACT MESSAGE MANAGEMENT
==================================================

Connect the existing frontend contact form to the backend.

When a visitor submits the contact form:

POST /api/contact

Save message in PostgreSQL.

Admin can see all messages.

Message table columns:

Name
Email
Subject
Status
Date
Actions

Actions:
- View
- Mark as Read
- Mark as Replied
- Archive
- Delete

Create a message detail page.

Add search and status filters.

==================================================
8. FRONTEND API INTEGRATION
==================================================

Connect the existing frontend to the database.

Projects should be loaded dynamically from the backend.

Services should be loaded dynamically.

Testimonials should be loaded dynamically.

Contact form should submit to backend.

Do NOT hard-code database content into the frontend.

Use server-side data fetching where appropriate.

Use proper loading states and error states.

==================================================
9. PUBLIC API
==================================================

Create secure public endpoints where required:

GET /api/projects
GET /api/projects/[slug]

GET /api/services
GET /api/testimonials

POST /api/contact

Admin-only endpoints:

POST /api/admin/projects
PUT /api/admin/projects/[id]
DELETE /api/admin/projects/[id]

POST /api/admin/services
PUT /api/admin/services/[id]
DELETE /api/admin/services/[id]

POST /api/admin/testimonials
PUT /api/admin/testimonials/[id]
DELETE /api/admin/testimonials/[id]

GET /api/admin/messages
PUT /api/admin/messages/[id]
DELETE /api/admin/messages/[id]

==================================================
10. IMAGE MANAGEMENT
==================================================

Design the system so project/service/testimonial images can be managed properly.

If an existing image upload system exists, reuse it.

Otherwise create a clean upload abstraction so storage can later be connected to:
- Cloudinary
- S3
- Supabase Storage

Do not store huge image binaries directly in PostgreSQL.

For development, allow image URL input if upload storage is not configured yet.

==================================================
11. SITE SETTINGS
==================================================

Create an admin settings page.

Settings should include:

Website name
Logo
Email
Phone
Address
Facebook
Instagram
LinkedIn
Twitter/X
Hero title
Hero description
CTA text

Admin should be able to update settings.

Frontend should load these settings dynamically.

==================================================
12. DATABASE SEED
==================================================

Create Prisma seed data.

Create a default admin account through environment variables.

Example:

ADMIN_EMAIL
ADMIN_PASSWORD

Never hard-code a real production password into source code.

Create sample:
- Projects
- Services
- Testimonials

So the dashboard can be tested immediately.

==================================================
13. ENVIRONMENT VARIABLES
==================================================

Create/update .env.example:

DATABASE_URL=
AUTH_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=

If image storage is implemented:

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

Never commit .env to git.

==================================================
14. ERROR HANDLING
==================================================

Implement proper error handling.

API responses should have consistent format:

{
  "success": true,
  "data": ...
}

or

{
  "success": false,
  "error": "Something went wrong"
}

Handle:
- Database errors
- Validation errors
- Unauthorized requests
- Forbidden requests
- Not found
- Duplicate slug/email
- Invalid input

Never expose sensitive server/database information to the browser.

==================================================
15. SECURITY
==================================================

Implement:

- Password hashing
- HTTP-only authentication cookies
- CSRF protection where applicable
- Server-side authorization
- Input validation
- Zod schemas
- SQL injection protection through Prisma
- Rate limiting for login/contact endpoints where practical
- Secure headers
- No sensitive information in client-side code
- No passwordHash in API responses
- Admin route protection
- Role-based permissions

==================================================
16. ADMIN UI
==================================================

Make the admin panel feel like a premium professional CMS.

Use:

Dark brown sidebar
Warm beige backgrounds
White content cards
Muted taupe borders
Elegant typography
Responsive tables
Modal confirmations
Toast notifications
Skeleton loaders
Empty states
Error states

Color palette:

Dark:
#3C2521

Brown:
#4B322E

Medium Brown:
#6A4B40

Taupe:
#886B60

Beige:
#B6A69F

Light:
#F5F1EE

White:
#FFFFFF

==================================================
17. PROJECT STRUCTURE
==================================================

Keep the code organized.

Suggested structure:

app/
  admin/
    login/
    page.tsx
    projects/
    services/
    testimonials/
    messages/
    users/
    settings/

  api/
    auth/
    contact/
    projects/
    services/
    testimonials/
    admin/

components/
  admin/
  forms/
  ui/

lib/
  auth/
  db/
  validations/

prisma/
  schema.prisma
  seed.ts

middleware.ts

Do not blindly follow this structure if the existing project uses a better Next.js App Router architecture. Adapt it cleanly to the current project.

==================================================
18. IMPORTANT EXISTING PROJECT RULES
==================================================

First inspect the entire existing project.

Check:

package.json
app/
src/
components/
hooks/
lib/
next.config.js
tailwind.config.ts
tsconfig.json

Understand the current architecture before making changes.

Do NOT:
- Delete existing pages
- Replace the existing frontend
- Remove existing components
- Break existing routes
- Change the current design unnecessarily
- Install duplicate libraries unnecessarily

Reuse existing dependencies whenever possible.

==================================================
19. FIX CURRENT LOCAL DEVELOPMENT
==================================================

The project currently shows:

http://localhost:3002/

ERR_CONNECTION_REFUSED

Before finishing, make sure the application can actually run locally.

Inspect package.json scripts.

Determine the correct development command.

If the project is intended to run on port 3002, configure it correctly.

Make sure:

npm install
npm run dev

works correctly.

If using port 3002, make sure Next.js starts on:

http://localhost:3002

If another port is required by the existing project, explain it clearly.

==================================================
20. FINAL REQUIREMENT
==================================================

Do not just create UI mockups.

Implement the REAL backend.

I need:

- Working PostgreSQL connection
- Prisma schema
- Database migrations
- Authentication
- Admin login
- Admin dashboard
- CRUD APIs
- Admin CRUD screens
- Contact form database integration
- Role-based authorization
- Validation
- Error handling
- Seed data
- Environment configuration
- Protected admin routes
- Working local development setup

After implementation, run/build the project and fix TypeScript, ESLint, Prisma and runtime errors.

At the end, provide:

1. Files created/changed
2. Database setup instructions
3. Environment variables required
4. Commands to run the project
5. Admin login URL
6. How to create the first admin
7. API endpoint list
8. Any remaining configuration needed for production