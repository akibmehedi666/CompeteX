# CompeteX — Unified Tech Competition, Hackathon & Mentorship Platform

> **An interactive web portal connecting students, organizers, mentors, sponsors, and recruiters for university hackathons, competitive programming, and tech symposiums.**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)

---

## 📌 Problem It Solves

University tech competitions, hackathons, and symposiums are typically coordinated across fragmented, disconnected platforms: registrations are managed through arbitrary Google Forms, physical venues and stage locations are shared via static image flyers, team matchmaking happens haphazardly in unstructured social media groups, and leaderboards and mentorship booking remain completely isolated.

Organizers lack a centralized portal to review teams, publish real-time score updates, engage corporate sponsors, and monitor attendee satisfaction. Participants, in turn, struggle to find complementary teammates with specific skill tags, navigate multi-building campus venues, or schedule guidance sessions with verified mentors.

**CompeteX** resolves this fragmentation by establishing an all-in-one web platform uniting event discovery, interactive geospatial campus mapping via Leaflet, automated team building, live leaderboards, mentorship booking, and corporate recruitment within a unified interface.

---

## ✨ Features

- **Interactive Geospatial Venue Map (`/map`):** Integrated Leaflet & OpenStreetMap mapping engine displaying competition venues, auditoriums, team booths, and dining halls with custom interactive pins and location detail drawers.
- **Event Discovery & Showcase (`/events`, `/events/[id]`):** Centralized catalog of upcoming and active hackathons, coding contests, and symposiums detailing eligibility, prize pools, schedules, and 1-click registration.
- **Dynamic Leaderboard Engine (`/leaderboard`, `/leaderboard/[eventId]`):** Real-time contest ranking and scoreboard visualization with team standings and metric charts powered by Recharts.
- **Team Builder & Matchmaking (`/team-builder`, `/teams`, `/teams/[id]`):** Matchmaking platform enabling participants to post team recruitment listings, search profiles by technical skills (e.g., Python, React, PyTorch), and send/accept team invitations.
- **1-on-1 Mentorship Booking (`/mentors`, `/mentors/[id]`, `/mentor/dashboard`):** Directory of verified academic and industry mentors with dedicated session request workflows and scheduling dashboards.
- **Organizer Command Center (`/organizer/dashboard`):** Event management dashboard allowing contest organizers to verify entrants, update live scoreboard standings, and coordinate event logistics.
- **Recruitment & Job Board (`/jobs`, `/jobs/post`, `/recruitment`):** Sponsoring company interface to post job/internship openings and scout top-performing contest competitors.
- **Sponsorship Marketplace (`/sponsorship`):** Tiered partnership hub connecting corporate sponsors with event hosts to manage sponsorship packages and perks.
- **Institution Profiles & Community Ratings (`/institutions`, `/institutions/[id]`, `/rating`):** Academic directory displaying institutional contest history, student participant rosters, and verified event reviews.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS v4
- **Geospatial Mapping:** Leaflet 1.9.4 & React-Leaflet 5.0.0
- **Data Visualization & Analytics:** Recharts 3.6.0
- **Animations & UI Components:** Framer Motion 12, Lucide React, Sonner (toast notifications), Next.js Toploader
- **Forms & Validation:** React Hook Form 7, Zod 4, `@hookform/resolvers`
- **State Management:** Zustand 5

---

## 📸 Screenshots

> _Visual walkthrough of the CompeteX portal interface, geospatial maps, and competition telemetry._

| Interactive Campus Map & Venue Explorer | Event Discovery & Live Leaderboard |
| :---: | :---: |
| ![Interactive Map Placeholder](docs/screenshots/map_placeholder.png)<br>_Placeholder: Leaflet geospatial venue mapping interface_ | ![Leaderboard Placeholder](docs/screenshots/leaderboard_placeholder.png)<br>_Placeholder: Live competition leaderboard and event details_ |

| Team Builder & Member Matchmaking | Mentorship Directory & Booking |
| :---: | :---: |
| ![Team Builder Placeholder](docs/screenshots/team_builder_placeholder.png)<br>_Placeholder: Team recruitment hub and skill filtering_ | ![Mentorship Portal Placeholder](docs/screenshots/mentorship_placeholder.png)<br>_Placeholder: Mentor booking and session dashboard_ |

---

## 🚀 How to Run

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- npm, yarn, or pnpm

### 2. Clone Repository & Install Dependencies

```bash
# Clone the repository
git clone https://github.com/akibmehedi666/CompeteX.git
cd CompeteX

# Install required dependencies
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to: **`http://localhost:3000`**

### 4. Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

---

## 📂 Project Structure

```
CompeteX/
├── app/
│   ├── layout.tsx                 # Root layout with top-loader and notification providers
│   ├── page.tsx                   # Landing page with hero banner and feature showcase
│   ├── dashboard/                 # User overview dashboard
│   ├── events/                    # Event discovery and [id] event detail pages
│   ├── map/                       # Leaflet interactive geospatial venue mapping
│   ├── leaderboard/               # Dynamic competition scoreboards
│   ├── team-builder/              # Matchmaking and team creation hub
│   ├── teams/                     # Team profiles and member rosters
│   ├── mentors/                   # Mentor directory, [id] profiles, and signup flow
│   ├── mentor/dashboard/          # Mentor session management portal
│   ├── organizer/dashboard/       # Event organizer command dashboard
│   ├── jobs/                      # Job postings and application flows
│   ├── recruitment/               # Recruiter candidate scouting dashboard
│   ├── sponsorship/               # Corporate sponsorship marketplace
│   ├── institutions/              # University profiles and event reviews
│   └── profile/                   # User profile configuration and portfolio links
├── components/                    # Reusable UI primitives and form controls
├── lib/                           # Utility helpers and API endpoint routing
├── public/                        # Static icons, vector assets, and brand graphics
├── package.json                   # Dependencies and npm script definitions
├── tsconfig.json                  # TypeScript compiler configuration
└── README.md                      # Documentation
```
