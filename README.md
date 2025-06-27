# Shelter4U Real Estate Platform

Welcome to the codebase for **Shelter4U**, a modern real estate platform built with Next.js, React, and Tailwind CSS. This project is designed for scalability, maintainability, and developer friendliness.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Conventions](#code-conventions)
- [API & Data Flow](#api--data-flow)
- [Component Patterns](#component-patterns)
- [Testing & Linting](#testing--linting)
- [Deployment](#deployment)

---

## Project Overview

Shelter4U is a real estate platform for property listings, inquiries, careers, events, and more. It features a modern UI, dynamic content, and a robust backend API.

---

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS, Framer Motion
- **Backend:** Node.js (API routes in Next.js)
- **Database:** (Assumed MongoDB or similar, via Models/)
- **Other:** EmailJS (for job applications), Lucide React Icons

---

## Project Structure

```
real-estate-shelter4u/
├── app/
│   ├── Components/           # Shared React components (Cards, Footer, Header, etc.)
│   ├── home/                 # Home page sections
│   ├── about/                # About subpages (career, team, events, etc.)
│   ├── project-page/         # Dynamic project detail pages
│   ├── search/               # Search page and components
│   ├── Inquiry/              # Inquiry form page
│   ├── contactus/            # Contact us page
│   ├── others/               # Legal info, loans for NRI, etc.
│   ├── api/                  # API routes (REST endpoints)
│   ├── layout.js             # App-wide layout
│   ├── page.jsx              # Main entry point
│   └── globals.css           # Global styles (Tailwind)
├── Models/                   # Mongoose (or similar) models for DB
├── lib/                      # Utility libraries (e.g., analytics)
├── public/                   # Static assets
├── uploads/                  # Uploaded files (e.g., brochures)
├── package.json
├── tailwind.config.mjs
└── README.md                 # (This file)
```

---

## Development Workflow

1. **Clone the repo:**  
   `git clone <repo-url> && cd real-estate-shelter4u`

2. **Install dependencies:**  
   `npm install`

3. **Environment variables:**  
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   # Add any other required env vars here
   ```

4. **Run the development server:**  
   `npm run dev`

5. **Lint and format:**  
   `npm run lint`  
   `npm run format` (if configured)

---

## Code Conventions

- **Dolphin Comments 🐬:**  
  Throughout the codebase, you'll find "dolphin comments" (🐬) and detailed inline comments.  
  - **Purpose:** Explain the intent, structure, and non-obvious logic.
  - **Example:**  
    ```js
    //  : This component renders the job application form for a specific career/job opening.
    ```

- **Component Structure:**  
  - Use functional components and React hooks.
  - Keep components focused and reusable.
  - Use Framer Motion for animations where appropriate.

- **API Calls:**  
  - Use `fetch` for API requests.
  - All API endpoints are under `/app/api/`.

- **Styling:**  
  - Use Tailwind CSS utility classes.
  - Use custom classes for complex layouts.

- **File Naming:**  
  - Use PascalCase for components, camelCase for functions/variables.

---

## API & Data Flow

- **API Routes:**  
  - Located in `/app/api/`.
  - RESTful endpoints for careers, events, inquiries, etc.
  - Example: `/api/about/career` returns all career listings.

- **Data Fetching:**  
  - Server components use `fetch` for SSR/SSG.
  - Client components use hooks (`useEffect`, etc.) for dynamic data.

- **Models:**  
  - All DB models are in `/Models/`.
  - Example: `Career.js`, `Event.js`, `Project.js`.

---

## Component Patterns

- **Loading Skeletons:**  
  - Each page has a `loading.js` for skeleton UIs during data fetch.

- **Client/Server Split:**  
  - Components with user interaction or state are marked "use client".
  - Data-fetching and SSR logic is in server components.

- **Reusable Components:**  
  - Shared UI (Cards, Footer, Header, etc.) in `/app/Components/`.

---

## Testing & Linting

- **Linting:**  
  - ESLint is configured via `eslint.config.mjs`.
  - Run `npm run lint` before committing.

- **Testing:**  
  - (Add details if you have a test setup, e.g., Jest/React Testing Library.)

---

## Deployment

- **Build:**  
  `npm run build`
- **Start:**  
  `npm start`
- **Vercel:**  
  - The project is compatible with Vercel for easy deployment.

---

**Happy coding! 🐬**
