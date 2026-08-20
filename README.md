# SkillGig 💼

A job portal built with React as a learning project. Focused on understanding React fundamentals by building each feature from scratch.

## Project Status

Actively being built. Currently on the `rebuild-from-here` branch, implementing the MVP feature by feature with a focus on understanding React concepts rather than shipping fast. Previous implementation preserved in `archive/full-feature`.

## Demo Accounts (Quick Testing)

To test the different roles (Job Seeker dashboard vs Employer job management dashboard) instantly, you can log in using these pre-registered demo accounts:

* **Job Seeker Demo:**
  * **Email:** `seeker@demo.com`
  * **Password:** `password123`
* **Employer / Company Demo:**
  * **Email:** `company@demo.com`
  * **Password:** `password123`

## Features

- Landing page with live search (controlled inputs)
- Trending jobs with real-time title and location filtering
- Job detail pages with dynamic routing (`/jobs/:id`)
- Statistics section
- Auth page with form validation (controlled form, error states)
- Client-side routing with React Router

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- React Icons
- Supabase

## React Concepts Covered So Far

- Functional components and JSX
- useState and controlled inputs
- Props and one-way data flow
- Lifting state up
- Component composition
- Array methods in JSX (.map, .filter, .find)
- Dynamic routing with useParams
- Programmatic navigation with useNavigate
- Form validation and error state

## Roadmap

- [x] Navbar with routing
- [x] Landing page with search
- [x] Trending jobs with filtering
- [x] Job detail page
- [x] Statistics section
- [x] Auth form with validation
- [x] Global auth state with Context
- [x] Protected routes
- [x] Job posting form
- [x] Mobile menu
- [x] Backend integration
