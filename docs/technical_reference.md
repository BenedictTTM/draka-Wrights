# Draka-WW (UG Policy) Technical Documentation
*Version 1.0 - Comprehensive System Reference*

---

## Table of Contents
1. Executive Overview & Vision
2. System Architecture & High-Level Design
3. Frontend Architecture
4. Application Routing & Navigation
5. Backend Architecture & API Ecosystem
6. Database Schema Deep Dive
7. Security Model & Authentication
8. Core Workflows
9. Styling & UI Design System
10. Deployment & DevOps Strategy
11. Maintenance & Extensibility Guide
12. Appendices: API Specifications

---

## 1. Executive Overview & Vision

Project Draka-WW (publicly branded as UG Policy) is an enterprise-grade, full-stack web application developed to modernize the approach to sexual harassment awareness, prevention, and reporting. The platform serves two primary cohorts:
1. **The Public (Students, Faculty, Staff):** Providing an accessible, trauma-informed digital space containing educational resources, institutional policies, procedural guidelines, and support information.
2. **Administrators (ASHC Officers, HR, Committees):** Equipping authorized personnel with a secure dashboard to triage, track, and manage submitted incidents with efficiency and absolute confidentiality.

The core objective is to reduce the friction inherent in reporting sensitive incidents by offering an intuitive, anonymous, and secure digital portal while empowering the administration with actionable tools to handle cases systematically.

## 2. System Architecture & High-Level Design

The application utilizes a modern, serverless architecture that drastically minimizes operational overhead while maximizing scalability and performance. 

### Technology Stack
*   **Core Framework:** Next.js 16.2.6 leveraging the App Router paradigm.
*   **UI Library:** React 19.
*   **Styling Engine:** Tailwind CSS v4 alongside native CSS custom properties.
*   **Iconography & Animation:** Lucide-React for scalable vector graphics and Framer Motion for complex micro-animations.
*   **Database:** PostgreSQL, hosted on Neon (Serverless Postgres), utilizing the `@neondatabase/serverless` driver.
*   **Type Safety:** TypeScript (v5.x) is enforced across both frontend components and backend API route handlers.

### Architectural Flow
1.  **Client Requests:** Users interact with statically generated or server-rendered React components.
2.  **Routing/Middleware:** Next.js Middleware intercepts requests. Public routes pass through, while protected routes (e.g., `/dashboard`) require validation of an `admin-session` cookie.
3.  **API Layer:** Client components fetch or mutate data by calling Next.js Route Handlers (`/api/*`).
4.  **Data Persistence:** Route Handlers securely execute parameterized SQL queries against the Neon PostgreSQL database via a shared connection pool.

---

## 3. Frontend Architecture

The frontend is architected to prioritize accessibility, premium aesthetics, and responsive design. The adoption of the Next.js App Router allows for nested layouts and granular control over rendering strategies.

### Component Hierarchy
*   **Layouts (`app/layout.tsx`):** The global layout wraps the application in a shared HTML structure, injecting global CSS (`globals.css`) and providing shared context providers.
*   **Navigation (`components/Navigation.tsx`):** A responsive, client-side header. It features scroll-aware transparency, mobile off-canvas menus, and dynamic rendering (it hides itself on authentication and admin routes).
*   **Pages (`app/page.tsx`, etc.):** Composed of modular functional components. The landing page heavily utilizes absolute positioning for background elements, SVGs for organic shapes, and Tailwind utility classes for responsive grids.

### Rendering Strategy
By default, pages within the public portal (About, FAQ, Resources) are Server Components, meaning they are rendered on the server, resulting in zero client-side JavaScript overhead for static content. Interactive components (like the Navigation menu or the multi-step reporting form) are marked with `'use client'` to hydrate on the browser.

---

## 4. Application Routing & Navigation

The application's routing map is logically divided into three zones:

### Public Zone
*   `/` - Landing page with hero section, statistics, and direct call-to-actions.
*   `/about-policy` - Detailed breakdown of institutional stance.
*   `/definitions` - Clarifications of terms (e.g., Sexual Harassment vs. Bullying).
*   `/procedures` - Step-by-step guide on what happens after a report is filed.
*   `/resources` - External links, hotlines, and counseling services.
*   `/faq` - Frequently asked questions.
*   `/reporting` - The primary public interface for submitting new incident reports.

### Authentication Zone
*   `/login` (within the `(auth)` route group) - The gateway for administrators. This route verifies credentials against the database and sets an HTTP-only session cookie.

### Administrative Zone (Protected)
*   `/dashboard` - The central hub providing analytical overviews of incident trends.
*   `/reports` - A tabular interface for filtering, searching, and viewing detailed case files.
*   `/chat` - An integrated AI or peer-support chat interface for real-time triage or policy consultation.
*   `/settings` - Application configuration and admin profile management.

---

## 5. Backend Architecture & API Ecosystem

The backend logic resides entirely within `app/api/`, compiled into serverless functions upon deployment. This eliminates the need for a separate Node.js/Express server.

### Database Connection Management
`lib/db.ts` acts as a singleton module managing the PostgreSQL connection pool. In development environments, it attaches the pool to the global scope to prevent connection exhaustion during hot-reloads. In production, it utilizes a standard connection pooling strategy optimized for serverless environments.

### Route Handlers
*   **Stateless Operations:** Every API call validates authentication status (if required) and input parameters independently.
*   **Error Handling:** A consistent `try/catch` wrapper ensures that internal errors are logged on the server while returning sanitized JSON responses (e.g., `{ error: 'Server error' }` with a 500 status code) to the client.

---

## 6. Database Schema Deep Dive

The database is normalized to support efficient querying and robust data integrity.

### Table: `Admin`
Stores credentials for platform administrators.
*   `id` (UUID/Serial) - Primary Key.
*   `email` (VARCHAR) - Unique identifier for login.
*   `password` (VARCHAR) - Hashed password string (Note: current seed data uses plaintext `admin123` for development; production must enforce bcrypt hashing).
*   `name` (VARCHAR) - Display name.
*   `created_at` (TIMESTAMP) - Defaults to `CURRENT_TIMESTAMP`.

### Table: `Report`
The core entity capturing submitted incidents.
*   `id` (VARCHAR) - Custom formatted Primary Key (e.g., `RPT-8422`).
*   `title` (VARCHAR) - Brief summary.
*   `description` (TEXT) - Detailed narrative of the event.
*   `category` (VARCHAR) - Enum/String (e.g., 'Sexual Harassment', 'Safety Concern', 'Policy Violation').
*   `status` (VARCHAR) - Workflow state (Default: 'New'. Others: 'In Progress', 'Escalated', 'Resolved').
*   `priority` (VARCHAR) - Assigned urgency ('Critical', 'High', 'Medium', 'Low').
*   `location` (VARCHAR) - Optional physical location.
*   `incident_date` (DATE) - Optional.
*   `incident_time` (TIME) - Optional.
*   `is_online` (BOOLEAN) - Flag for digital incidents.
*   `evidence_notes` (TEXT) - Additional context or links to evidence.
*   `anonymous` (BOOLEAN) - Default `true`. If true, the system guarantees no PII is associated.
*   `created_at` (TIMESTAMP) - Submission timestamp.

---

## 7. Security Model & Authentication

Security is paramount given the sensitive nature of the data handled.

### Authentication & Authorization
*   **Session Management:** Upon successful login, the server issues an HTTP-only, secure cookie named `admin-session`. This prevents Cross-Site Scripting (XSS) attacks from stealing the session token.
*   **Middleware Enforcement:** Next.js Middleware checks every request aimed at `/dashboard`, `/reports`, or protected API routes. If the `admin-session` cookie is missing or invalid, the request is instantly redirected to `/login` or returns a `401 Unauthorized`.

### Data Protection
*   **SQL Injection:** Raw string concatenation is strictly prohibited. All queries use parameterized inputs (e.g., `VALUES ($1, $2)`), delegating escaping to the `pg` driver.
*   **Anonymity by Design:** The `Report` schema intentionally omits mandatory reporter identification fields. If `anonymous` is true, the frontend deliberately drops any collected identifying metadata before transmitting the payload to the server.

---

## 8. Core Workflows

### 8.1 The Reporting Flow (Public)
1.  User navigates to `/reporting`.
2.  The UI presents a supportive, non-intimidating multi-step form.
3.  User provides a title, categorizes the incident, and writes a description.
4.  User optionally toggles anonymity, location, date, and time.
5.  On submit, the client performs a `POST` request to `/api/reports`.
6.  The backend assigns a randomized `RPT-XXXX` ID, calculates priority based on category (e.g., Sexual Harassment automatically defaults to 'High'), and inserts the record.
7.  The user is presented with a confirmation screen and their tracking ID (if applicable).

### 8.2 The Triage Flow (Admin)
1.  Admin logs in and navigates to `/reports`.
2.  The client issues a `GET` request to `/api/reports`.
3.  Admin selects a 'New' report to review.
4.  Admin updates the status to 'In Progress' via a UI dropdown.
5.  The client sends a `PATCH` request to `/api/reports` with `{ id: "RPT-1234", status: "In Progress" }`.
6.  The backend dynamically constructs an `UPDATE` SQL query, modifying only the provided fields, and returns the updated record.

---

## 9. Styling & UI Design System

The application employs a meticulously crafted design system via Tailwind CSS.

### Premium Aesthetics
*   **Color Palette:** Defined in `globals.css` using CSS variables (`--color-primary`, `--color-accent`, `--color-bg-surface`). This ensures absolute consistency and allows for effortless implementation of themes (like dark mode).
*   **Typography:** The application blends modern sans-serif fonts for readability with elegant serif accents for headings, creating an authoritative yet approachable tone.
*   **Visual Depth:** Heavy utilization of CSS blur filters (e.g., `blur-[110px]`), custom SVG paths, and complex drop shadows (`shadow-[0_24px_50px_-30px_rgba(...)]`) creates a glassmorphic, multi-layered visual experience.

### Responsive Strategy
Tailwind's mobile-first breakpoints (`sm:`, `md:`, `lg:`) are used extensively. For instance, the landing page hero section transitions from a single column stacked layout on mobile to a precisely balanced `md:grid-cols-[1.1fr_0.9fr]` layout on desktop.

---

## 10. Deployment & DevOps Strategy

### Vercel Integration
The platform is optimized for Vercel. 
*   **Edge Network:** Static assets and pre-rendered pages are served globally via Vercel's CDN.
*   **Serverless Functions:** API routes are automatically bundled and deployed as AWS Lambda-backed serverless functions, ensuring automatic scaling during traffic spikes.

### Environment Configuration
The application relies on specific environment variables defined in `.env`:
*   `DATABASE_URL`: The Neon PostgreSQL connection string. Ensure this includes connection pooling parameters (e.g., `?sslmode=require`).
*   `NODE_ENV`: 'development' | 'production'.

### Database Migrations & Seeding
Currently, schema initialization and sample data seeding are handled via the `/api/setup` endpoint or the `npm run test:api` script. In a production scenario, adopting a formal migration tool (like Prisma Migrations or Drizzle) is recommended for schema version control.

---

## 11. Maintenance & Extensibility Guide

### Adding a New API Route
1. Create a new folder under `app/api/` (e.g., `app/api/analytics`).
2. Create a `route.ts` file inside.
3. Export an async function matching the HTTP verb: `export async function GET(request: Request) {}`.
4. Import `getDb` from `@/lib/db`.
5. Implement authentication checks if the route is protected.

### Modifying the Design System
All core colors and structural variables are located in `app/globals.css`. 
To change the primary color:
```css
:root {
  --color-primary: #0a2540; /* Update this hex code */
}
```
Tailwind will automatically reflect this change across all `bg-primary`, `text-primary`, and `border-primary` utility classes.

---

## 12. Appendices: API Specifications

### `POST /api/reports`
*   **Access:** Public
*   **Request Body (application/json):**
    ```json
    {
      "title": "Incident Summary",
      "description": "Full details...",
      "category": "Safety Concern",
      "anonymous": true,
      "location": "Library",
      "incident_date": "2026-05-13",
      "incident_time": "14:30:00",
      "is_online": false,
      "evidence_notes": "None"
    }
    ```
*   **Success Response (201):** `{ "success": true, "reportId": "RPT-XXXX" }`
*   **Error Response (400):** `{ "error": "Missing required fields" }`

### `GET /api/reports`
*   **Access:** Protected (Requires `admin-session` cookie)
*   **Success Response (200):** 
    ```json
    [
      {
        "id": "RPT-8422",
        "title": "Safety Concern in Lab 4",
        "status": "New",
        "priority": "High",
        "created_at": "2026-05-13T12:00:00.000Z"
      }
    ]
    ```

### `PATCH /api/reports`
*   **Access:** Protected
*   **Request Body (application/json):**
    ```json
    {
      "id": "RPT-8422",
      "status": "Resolved"
    }
    ```
*   **Success Response (200):** Returns the fully updated report object.
*   **Error Response (404):** `{ "error": "Not found" }`

---
*End of Documentation.*
