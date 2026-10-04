# DigitalDimna — Agile Training Platform

A full-stack web application for DigitalDimna's Agile & Scrum training business. The public website showcases courses, bootcamps, events, job openings, blog posts, quizzes, and more. All of this content is managed through a visual **admin dashboard** — no coding required to add, edit, or remove content.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Architecture Overview](#2-architecture-overview)
3. [Managing Your Website Content (Admin Dashboard)](#3-managing-your-website-content-admin-dashboard)
4. [Local Development Setup (For Developers)](#4-local-development-setup-for-developers)
5. [Environment Variables](#5-environment-variables)
6. [Deployment Notes](#6-deployment-notes)
7. [Project Structure](#7-project-structure)

---

## 1. Tech Stack

### Frontend (the public website)

| Technology                       | Purpose                   |
| -------------------------------- | ------------------------- |
| **React 18** + **TypeScript**    | User interface            |
| **Vite**                         | Build tool & dev server   |
| **Tailwind CSS** + **shadcn/ui** | Styling and UI components |
| **React Router**                 | Page navigation           |

### Backend (the content API & admin dashboard)

| Technology                                       | Purpose                                 |
| ------------------------------------------------ | --------------------------------------- |
| **FastAPI** (Python)                             | REST API serving content to the website |
| **SQLAlchemy**                                   | Database models / ORM                   |
| **SQLAdmin**                                     | The visual admin dashboard at `/admin`  |
| **SQLite** (local) / **PostgreSQL** (production) | Database                                |
| **HTTP Basic Auth**                              | Protects the admin dashboard and docs   |

---

## 2. Architecture Overview

The project has two parts that work together:

```
┌─────────────────────┐        HTTP (JSON)        ┌──────────────────────┐
│   React Frontend    │  ───────────────────────► │    FastAPI Backend   │
│  (public website)   │  ◄─────────────────────── │   + Admin Dashboard  │
└─────────────────────┘                           └──────────┬───────────┘
                                                             │
                                                   ┌─────────▼──────────┐
                                                   │     Database       │
                                                   │ (SQLite/Postgres)  │
                                                   └────────────────────┘
```

- The **frontend** fetches content (courses, events, etc.) from the backend API and displays it.
- The **backend** stores all content in a database and exposes it through the API.
- You update content via the **admin dashboard**, and changes appear on the website automatically.

---

## 3. Managing Your Website Content (Admin Dashboard)

This is the part you'll use day-to-day. The admin dashboard lets you manage every piece of site content visually.

### 3.1 Accessing the dashboard

Open the admin dashboard in your browser:

- **Local:** http://127.0.0.1:8000/admin
- **Production:** `https://<your-backend-domain>/admin`

### 3.2 Logging in

When you open the dashboard, your browser will show a login popup asking for a **username** and **password**. Enter the credentials provided to you.

> These credentials are configured through the `ADMIN_USERNAME` and `ADMIN_PASSWORD` environment variables (see [Environment Variables](#5-environment-variables)). If you need them changed, ask your developer or update them in your hosting provider's settings.

### 3.3 Content you can manage

Once logged in, you'll see a sidebar with all manageable content, including:

| Section                                                             | What it controls                                            |
| ------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Courses**                                                         | Your certification courses (PSM, PSPO, SAFe, PMP, etc.)     |
| **Course Schedules**                                                | Batch dates, times, prices, and instructors for each course |
| **Course FAQs**                                                     | Frequently asked questions shown on each course page        |
| **Events**                                                          | Upcoming and past webinars/workshops                        |
| **Job Openings**                                                    | Careers page listings                                       |
| **Blog Posts**                                                      | Full articles on the blog                                   |
| **Blog Highlights**                                                 | Short blog teaser cards on the home page                    |
| **Quizzes**                                                         | Practice assessments                                        |
| **Interview Guides**                                                | Downloadable interview preparation guides                   |
| **Testimonials**                                                    | Student reviews                                             |
| **Pricing Plans / Weekly Modules / Alumni Stories / Bootcamp FAQs** | Bootcamp page content                                       |
| **Stats**                                                           | The "3500+ Students Trained" style counters                 |

### 3.4 How to add, edit, or delete content

**To ADD a new item (e.g. a new course):**

1. Click the content type in the sidebar (e.g. **Courses**).
2. Click the **"+ New Course"** button (top right).
3. Fill in the fields. For courses, the **ID** field is a short slug like `psm-3` or `agile-fundamentals` — keep it lowercase with hyphens and make it unique.
4. Click **Save**.

**To EDIT an existing item:**

1. Click the content type in the sidebar.
2. Find the row you want to change and click the **edit (pencil)** icon.
3. Update the fields and click **Save**.

**To DELETE an item:**

1. Click the content type in the sidebar.
2. Click the **delete (trash)** icon on the row, or open the item and use **Delete**.
3. Confirm. **Deletions are permanent**, so double-check before confirming.

> **Tip — list fields:** Some fields (like a course's _Key Features_ or _Course Content_) hold a list of items. These are entered as a JSON list, for example:
>
> ```json
> ["2-day virtual training", "Exam fees included", "Certificate on completion"]
> ```

> **Tip — adding schedules to a course:** A course's batch dates live in **Course Schedules**. Add a new schedule there and link it to the course via the course ID.

### 3.5 Seeing your changes

After saving, refresh the public website. The updated content loads automatically from the API — there's nothing else to publish.

---

## 4. Local Development Setup (For Developers)

If this project is ever handed to another developer, here's how to run it locally. You'll run **two processes**: the backend API and the frontend dev server.

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.10+

### 4.1 Backend (FastAPI)

```sh
cd backend

# Create and activate a virtual environment
python -m venv .venv
# Windows (PowerShell):
.\.venv\Scripts\Activate.ps1
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# (First time only) Seed the database with initial content
python seed.py

# Start the API server
uvicorn main:app --reload
```

The backend runs at **http://127.0.0.1:8000**:

- API endpoints: http://127.0.0.1:8000/api/... (e.g. `/api/courses`)
- Admin dashboard: http://127.0.0.1:8000/admin
- API docs: http://127.0.0.1:8000/docs

> The seed script is safe to re-run — it only inserts content into tables that are empty, so it won't create duplicates.

### 4.2 Frontend (React)

In a **separate terminal**, from the project root:

```sh
npm install
npm run dev
```

The website runs at **http://localhost:8080**.

### 4.3 Useful frontend commands

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the dev server                      |
| `npm run build`   | Build for production (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally      |
| `npm run lint`    | Run the linter                            |
| `npm run test`    | Run the test suite                        |

---

## 5. Environment Variables

### Backend

| Variable         | Description                                                                                                                | Default (local)               |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `DATABASE_URL`   | Database connection string. Falls back to local SQLite if unset. `postgres://` URLs are auto-converted to `postgresql://`. | `sqlite:///./dev_database.db` |
| `ADMIN_USERNAME` | Username for the admin dashboard & docs                                                                                    | `admin`                       |
| `ADMIN_PASSWORD` | Password for the admin dashboard & docs                                                                                    | `change-me`                   |

> **Important:** Always set a strong `ADMIN_USERNAME` and `ADMIN_PASSWORD` in production. The local defaults are intentionally weak.

### Frontend

| Variable       | Description                 | Default                     |
| -------------- | --------------------------- | --------------------------- |
| `VITE_API_URL` | Base URL of the backend API | `http://127.0.0.1:8000/api` |

When deploying the frontend, set `VITE_API_URL` to your hosted backend, e.g. `https://your-backend.onrender.com/api`.

---

## 6. Deployment Notes

- **Database:** In production, provision a PostgreSQL database and set `DATABASE_URL`. The backend automatically handles the `postgres://` → `postgresql://` conversion used by hosts like Render.
- **Admin security:** Set `ADMIN_USERNAME` and `ADMIN_PASSWORD` in your host's environment settings. These protect both `/admin` and `/docs`.
- **Frontend:** Build with `npm run build` and deploy the `dist/` folder to any static host. Set `VITE_API_URL` to point at the live backend before building.
- **CORS:** The backend allows the local dev origins by default. Add your production frontend domain to the `origins` list in `backend/main.py`.

---

## 7. Project Structure

```
.
├── backend/                  # FastAPI backend
│   ├── main.py               # App, API endpoints, SQLAdmin dashboard
│   ├── models.py             # Database models (Course, Event, Job, ...)
│   ├── database.py           # Database connection & session setup
│   ├── security.py           # HTTP Basic auth for /admin and /docs
│   ├── seed.py               # Seeds initial content into the database
│   └── requirements.txt      # Python dependencies
│
├── src/                      # React frontend
│   ├── pages/                # Page components (Events, Careers, Blog, ...)
│   ├── components/           # Reusable UI components
│   ├── hooks/useFetch.ts     # Hook for fetching API data
│   ├── lib/api.ts            # API client (base URL + response handling)
│   └── data/                 # TypeScript types for content
│
├── package.json              # Frontend dependencies & scripts
└── README.md                 # This file
```

---

© DigitalDimna. All rights reserved.
