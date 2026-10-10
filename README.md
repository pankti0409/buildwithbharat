# 🏛️ Tark Shaastra (તર્ક શાસ્ત્ર) - Civic Redressal & Intelligence System
### *Next-Gen AI-Powered Proof-of-Resolution Municipal Governance Platform for Gujarat*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.7-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion/)

---

## 📖 Table of Contents
1. [Executive Summary & Core Philosophy](#-executive-summary--core-philosophy)
2. [Key Innovations & Technical Highlights](#-key-innovations--technical-highlights)
3. [Architecture & Technology Stack](#-architecture--technology-stack)
4. [Role-Based Portals & Feature Matrix](#-role-based-portals--feature-matrix)
   - [Public & Landing Experience](#1-public--landing-experience)
   - [Citizen Portal (`/citizen`)](#2-citizen-portal-citizen)
   - [Department Field Officer Portal (`/department`)](#3-department-field-officer-portal-department)
   - [Municipal Admin & Command Center (`/admin`)](#4-municipal-admin--command-center-admin)
5. [Design System & Theme Tokens](#-design-system--theme-tokens)
6. [Component Library Breakdown](#-component-library-breakdown)
7. [State Management & Context Architecture](#-state-management--context-architecture)
8. [Mock Data Engine & Simulated Workflows](#-mock-data-engine--simulated-workflows)
9. [Directory Structure](#-directory-structure)
10. [Getting Started & Local Development](#-getting-started--local-development)
11. [Demo Accounts & Role Switcher](#-demo-accounts--role-switcher)

---

## 🌟 Executive Summary & Core Philosophy

**Tark Shaastra** (derived from Sanskrit *तर्कशास्त्र* — "The Science of Logic and Reasoning") is a hyper-accountable civic redressal and municipal intelligence platform built to solve the **"Closed on Paper, Broken on Ground"** crisis in public works.

Traditional municipal grievance portals allow officers to mark tickets as "Resolved" simply by clicking a checkbox. **Tark Shaastra mathematically mandates Proof-of-Resolution** through:
1. **Geo-Locked Capture**: GPS, timestamp, and compass metadata sealed upon citizen photo submission.
2. **AI Vision & Spatial Deduplication**: Computer vision detects grievance category in <300ms and flags duplicate tickets within a 500m radius.
3. **Geo-Fenced Proof of Work**: Field officers can only submit resolution photos when their GPS location is physically verified within 100 meters of the initial complaint pin.
4. **Automated Citizen IVR Verification**: An automated voice call (in Gujarati or English) dials the citizen. Press `1` to confirm satisfaction and finalize closure, or press `2` to instantly reopen the ticket with zero red tape.
5. **Civic Gamification & XP**: Citizens earn experience points (XP), unlock civic badges, and redeem municipal tax rebates, transit passes, or free nursery saplings.

---

## ⚡ Key Innovations & Technical Highlights

| Feature | Technical Implementation | Impact |
| :--- | :--- | :--- |
| **Interactive Before/After Slider** | Dynamic drag-slider overlay comparing original complaint vs. verified officer resolution photo | Transparent, visual proof of actual work done |
| **Simulated GPS Camera** | Custom camera component with live coordinates, altitude, heading, accuracy radius, and EXIF mock validation | Eliminates fake, outdated, or downloaded stock photo uploads |
| **Interactive Gujarat GIS Map** | React-Leaflet with custom map markers, category pins, cluster counts, and instant preview drawers | Ward-level geographic visibility for citizens and city engineers |
| **Interactive IVR Simulator** | Real-time audio waveform animation, bilingual speech-to-text transcripts, keypad simulation (`1` vs `2`) | Auditable feedback loop that reaches citizens on basic keypad phones |
| **AI Anti-Fraud & Integrity Suite** | Heuristic & spatial engine monitoring geo-fence breaches, duplicate image hashes, and suspicious resolution time anomalies | Prevents fake contractor billing and lazy ticket closure |
| **Native Dual-Language Localization** | Context-driven dictionary system supporting **English** and **Gujarati (`ગુજરાતી`)** | Inclusive access across municipal officers and citizens alike |
| **Dual Theme System** | Sleek Dark Mode (`#0F172A`) & Crisp Light Mode (`#F8FAFC`) with vibrant pastel semantic badges | Modern, accessible, and high-contrast UI |

---

## 🛠 Architecture & Technology Stack

### Core Frameworks & Libraries
- **React 18.3.1**: Component-driven architecture using TypeScript for complete type safety.
- **Vite 6.0.3**: Lightning-fast Hot Module Replacement (HMR) and optimized ES bundle building.
- **Tailwind CSS 3.4.17**: Utility-first CSS configured with custom color tokens, responsive breakpoints, and dark mode class strategy.
- **React Router DOM 6.28.0**: Client-side nested routing, layout wrappers, and automatic URL synchronization.
- **Framer Motion 12.4.7**: Physics-based animations, layout transitions, interactive hover dynamics, and modal entrance effects.
- **Lucide React 1.16.0**: Unified, modern icon set across all portals.
- **React Leaflet 4.2.1 & Leaflet 1.9.4**: Open-source interactive GIS mapping and custom geo-markers.
- **Recharts 2.15.0**: Data visualization suite for department performance, SLA tracking, velocity, and municipal trends.
- **Canvas-Confetti 1.9.4**: Gamification reward celebration animations upon level-up and complaint verification.

---

## 📱 Role-Based Portals & Feature Matrix

### 1. Public & Landing Experience
- **Hero Section**: Dynamic headline, active statistics counter, dual CTA for reporting grievances or viewing the live city map, and toll-free helpline direct-dial banner (`1800-TARK-78`).
- **How It Works**: 4-step interactive logic sequence explaining Geo-Locked capture, AI categorization, Geo-Fenced resolution, and Citizen IVR verification.
- **Live Impact Dashboard**: Real-time counter of resolved grievances, average SLA hours, citizen satisfaction rate (94.2%), and automated IVR calls dispatched.
- **Interactive Verification Showcase**: Embedded interactive Before/After comparison slider demonstrating real pothole and road repair resolutions across Ahmedabad wards.
- **Municipal Trust Partners**: Verified integrations with AMC (Ahmedabad Municipal Corporation), SMC (Surat), VMC (Vadodara), and GMC (Gandhinagar).
- **Authentication (`/auth`)**: Role-based instant entry supporting Citizen OTP simulation, Officer Department SSO, and Municipal Commissioner Command login.
- **Legal & Policy Pages**: `/privacy` and `/terms` for civic transparency compliance.

---

### 2. Citizen Portal (`/citizen`)
Designed for simplicity, accessibility, and high civic engagement:

```
/citizen
├── / (Index)         -> Citizen Dashboard (Active tickets, daily civic quest, XP summary)
├── /report           -> GPS-Locked Grievance Report Form with AI preview
├── /complaints       -> "My Complaints" Ledger with timeline audit & before/after slider
├── /map              -> Interactive Ward Community Map with spatial filtering
├── /rewards          -> Gamification Hub (XP, Level, Badges, Redeemable Perks)
└── /help             -> Voice Helpline & Twilio IVR Simulation Guide
```

- **`CitizenHome`**: High-level personal overview showing active complaint statuses, quick "Report Issue" banner, 7-day streak tracker, community leaderboard rank, and nearby neighborhood alerts.
- **`CitizenReport`**:
  - Embedded GPS camera simulation with live latitude/longitude, accuracy, and address reverse-geocoding.
  - Category selector (Roads & Potholes, Solid Waste, Water & Drainage, Streetlights, Public Health, Encroachment, Parks).
  - Vision AI confidence score and real-time duplicate risk percentage warning.
  - Multi-language title and description inputs with urgency level selector.
- **`CitizenMyComplaints`**:
  - Ticket filter tabs: *All*, *In Progress*, *Resolved*, *Verified*, *Reopened*.
  - Full grievance drawer featuring chronological timeline audit trail (timestamps, actors, notes).
  - Visual verification drawer with interactive Before/After image slider.
  - Citizen action triggers: **Confirm Resolution (Earn +50 XP)** or **Reopen Grievance**.
  - Community engagement: Upvoting and real-time public comments.
- **`CitizenCommunityMap`**:
  - Full-screen GIS Leaflet map displaying active and resolved issues across Gujarat.
  - Category filters, status toggles, and ward boundaries.
  - Interactive marker pins that open instant preview cards with direct navigation to ticket details.
- **`CitizenRewards`**:
  - XP Progress bar with level calculation formula: `Level = floor(XP / 150) + 1`.
  - Unlockable civic badges: *Eagle Eye*, *Ward Guardian*, *Quick Verifier*, *Zero Backlog*, *Community Hero*.
  - Redeemable civic store: Municipal property tax rebate vouchers (₹250), AMTS/BRTS transit passes, botanical nursery sapling coupons, and municipal merchandise.
- **`CitizenHelp`**:
  - Interactive Twilio-style IVR audio simulator.
  - Detailed audio transcript in Gujarati (`ગુજરાતી`) and English.
  - Step-by-step keypad instructions for offline/senior citizens using basic feature phones.

---

### 3. Department Field Officer Portal (`/department`)
Tailored for ward engineers, sanitation supervisors, and field contractors:

```
/department
├── / (Index)         -> Department KPI Dashboard (SLA countdown, backlog velocity)
├── /queue            -> Active Task Queue with Geo-Fence validation & Resolution camera
└── /performance      -> Individual & Departmental Performance Analytics
```

- **`DepartmentDashboard`**:
  - Real-time SLA monitoring cards (Critical <4h, Urgent <12h, Standard <24h).
  - Department workload distribution by ward.
  - Velocity indicators: Average resolution turnaround time and reopened ticket penalty index.
- **`DepartmentQueue`**:
  - Sortable work order list with color-coded urgency tags.
  - Distance calculator showing real-time proximity (in meters) to complaint location.
  - **Resolution Modal**:
    - Geo-Fence verification engine (blocks submission if officer is >100m away from the original pin).
    - Camera upload for after-repair photo.
    - Resolution notes in Gujarati and English.
    - Automatic dispatch trigger for the citizen verification IVR call.
- **`DepartmentPerformance`**:
  - Individual officer efficiency score, resolved tickets this month, on-time SLA percentage, and supervisor feedback remarks.

---

### 4. Municipal Admin & Command Center (`/admin`)
Full municipal oversight for City Commissioners, Ward Councillors, and Vigilance Officers:

```
/admin
├── / (Index)         -> Command Center Dashboard (City-wide telemetry & charts)
├── /complaints       -> Master Complaints Registry with advanced query filters
├── /departments      -> Department SLA Leaderboard & Inter-agency Benchmarks
├── /heatmap          -> High-Density Civic Heatmap & Geographic Hotspot Detector
├── /fraud            -> AI Anti-Fraud & Integrity Audit Engine
├── /officers         -> Field Workforce Roster & Deployment Manager
└── /ivr              -> Live Citizen Voice IVR Call Monitor & Sentiment Analyzer
```

- **`AdminDashboard`**:
  - High-level KPIs: Total Complaints Filed, Resolution Rate %, Average Turnaround (hrs), and Citizen Trust Score.
  - Volume trend charts (Weekly / Monthly resolution velocity via Recharts).
  - Category breakdown distribution and active alerts ticker.
- **`AdminComplaintsTable`**:
  - Comprehensive table with search by ticket ID, citizen phone, department, or ward.
  - Status transition controls and direct escalation triggers.
- **`AdminDepartmentRanking`**:
  - Leaderboard ranking departments (Roads, Solid Waste, Water, Streetlights, Health) on SLA adherence, reopen rates, and average hours.
- **`AdminHeatmap`**:
  - Geographic density visualization highlighting chronic infrastructure failure clusters across Ahmedabad and Gujarat zones.
- **`AdminFraudIntegrity`**:
  - AI heuristic monitoring flagging:
    - **Geo-Fence Breaches**: Officer attempted photo upload from >100m away.
    - **Photo Duplication**: Repeated image hash detected across multiple tickets.
    - **Time Anomalies**: Ticket opened and marked resolved in under 2 minutes.
    - **Repeated Reopens**: Work marked complete but rejected multiple times by citizens.
- **`AdminOfficerManagement`**:
  - Ward-wise officer roster, duty status (`ON_DUTY`, `FIELD`, `ON_LEAVE`), active task load, and accuracy scores.
- **`AdminIvrMonitor`**:
  - Live feed of automated outbound verification calls.
  - Speech-to-text transcript viewer, audio duration, citizen sentiment analysis (`POSITIVE`, `NEUTRAL`, `NEGATIVE`), and keypad response recording (`Press 1` vs `Press 2`).

---

## 🎨 Design System & Theme Tokens

The application features a modern design system tailored in [tailwind.config.js](file:///c:/Users/PANKTI/Desktop/buildwithbharat/frontend/tailwind.config.js):

### Semantic Pastel & Vibrant Palette
- **Mint** (`#059669` / `#ECFDF5` / `#10B981`): Verified, success, environmental, solid waste.
- **Sky** (`#0284C7` / `#F0F9FF` / `#0EA5E9`): Active, water supply, navigation, info.
- **Lavender** (`#7C3AED` / `#FAF5FF` / `#8B5CF6`): Roads & infrastructure, AI classification, rewards.
- **Butter** (`#D97706` / `#FFFBEB` / `#F59E0B`): Streetlights, warnings, medium urgency.
- **Peach** (`#EA580C` / `#FFF7ED` / `#F97316`): Public health, pending triage, SLA caution.
- **Rose** (`#E11D48` / `#FFF1F2` / `#F43F5E`): Critical urgency, geo-fence breach, reopen alerts.

### Canvas & Surface Structure
| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| `canvas` | `#F8FAFC` (Slate-50) | `#0F172A` (Slate-900) | App background |
| `card` | `#FFFFFF` | `#1E293B` (Slate-800) | Elevated content cards |
| `surface.darkBorder` | `#E2E8F0` | `#334155` | Borders and subtle dividers |
| `ink` | `#0F172A` | `#F8FAFC` | Primary typography |
| `ink.muted` | `#64748B` | `#94A3B8` | Subtitles, helper text |

### Typography
- **Primary Body / Headings**: `"Plus Jakarta Sans"`, `Inter`, sans-serif.
- **Gujarati Typography**: `"Noto Sans Gujarati"`, sans-serif.
- **Telemetry & Numbers**: `"JetBrains Mono"`, ui-monospace, monospace.

---

## 🧩 Component Library Breakdown

All shared components are located in [`frontend/src/components/common/`](file:///c:/Users/PANKTI/Desktop/buildwithbharat/frontend/src/components/common/):

1. **`BeforeAfterSlider.tsx`**: Interactive touch/mouse drag comparison slider for resolution photo audits with floating Before/After badges.
2. **`GpsCamera.tsx`**: Camera simulation interface with real-time GPS telemetry overlay, compass heading, EXIF metadata stamping, and retake controls.
3. **`IvrSimulator.tsx`**: Interactive phone mock with simulated ringing, bilingual audio playback, animated sound waves, and interactive keypad buttons.
4. **`MapComponent.tsx`**: Leaflet GIS map with custom SVG markers, colored status halos, interactive tooltips, and fly-to zoom animations.
5. **`Navbar.tsx`**: Sticky responsive navigation with role indicator badge, quick role switcher dropdown, language switcher, dark mode toggle, XP pills, and user profile drawer trigger.
6. **`ProfileModal.tsx`**: Detailed user profile modal with edit options, ward selector, earned badges gallery, streak calendar, and activity log.
7. **`Timeline.tsx`**: Chronological milestone tracker showing status changes, responsible actors, timestamps, and attached notes.
8. **`StatCard.tsx`**: Standardized metric card supporting icons, change percentages, pastel color themes, and subtle hover lifts.
9. **`StatusChip.tsx`**: Color-coded badge for `PENDING`, `IN_PROGRESS`, `RESOLVED`, `VERIFIED`, and `REOPENED` statuses.
10. **`ThemeToggle.tsx`**: Seamless Light / Dark mode toggle button with sun/moon icons.
11. **`LanguageSwitcher.tsx`**: Quick toggle between **English** and **ગુજરાતી**.
12. **`Modal.tsx` & `Drawer.tsx`**: Accessible, animated overlay modals and side sheets powered by Framer Motion.
13. **`Button.tsx` & `Card.tsx`**: Accessible UI primitives with variant props (`primary`, `secondary`, `outline`, `danger`, `ghost`).
14. **`EmptyState.tsx` & `Skeleton.tsx`**: Polished placeholder cards and pulsing skeleton loaders for smooth async states.
15. **`Footer.tsx`**: Municipal portal footer with grievance helpline links, government disclaimers, ward directory, and quick links.

---

## 🧠 State Management & Context Architecture

The frontend state is modularized into four React Context providers wrapped at the root level in [App.tsx](file:///c:/Users/PANKTI/Desktop/buildwithbharat/frontend/src/App.tsx):

```
<ThemeProvider>
  <LanguageProvider>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          ...
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </LanguageProvider>
</ThemeProvider>
```

- **`AuthContext.tsx`**: Manages current user session, active role (`citizen` | `officer` | `admin`), local storage persistence, XP/Level progression, and seamless role switching.
- **`LanguageContext.tsx`**: Provides bilingual translation dictionary (`en` & `gu`) and the `t(key)` helper function.
- **`ThemeContext.tsx`**: Manages `light` / `dark` class toggling on the `document.documentElement` with `localStorage` persistence.
- **`ToastContext.tsx`**: Dispatches animated floating notifications (`success`, `error`, `info`, `warning`) across all pages.

---

## 💾 Mock Data Engine & Simulated Workflows

The platform contains a built-in state engine in [`frontend/src/services/api.ts`](file:///c:/Users/PANKTI/Desktop/buildwithbharat/frontend/src/services/api.ts) with preloaded, realistic municipal data across Gujarat (Ahmedabad, Surat, Vadodara, Gandhinagar):

- **5 Municipal Departments**: Roads & Bridges, Solid Waste, Water Supply & Drainage, Streetlights, Public Health.
- **Preloaded Realistic Grievances**: Includes potholes on CG Road, overflowing bins in Vastrapur, water pipeline bursts in Maninagar, faulty streetlights on SG Highway, etc.
- **Live Local Storage Persistence**: Any complaint created, resolved, upvoted, or verified persists in browser `localStorage` across page reloads.
- **Simulated Real-Time Methods**:
  - `getComplaints()`, `getComplaintById(id)`
  - `createComplaint(data)` (Auto-assigns ticket number, simulates vision AI object detection & duplicate risk score)
  - `resolveComplaint(id, data)` (Calculates distance to original pin, validates 100m geo-fence, and queues Twilio IVR call)
  - `verifyComplaint(id)` / `reopenComplaint(id, reason)`
  - `upvoteComplaint(id)` & `addComment(id, text)`
  - `claimReward(rewardId)` (Deducts XP and issues civic voucher code)

---

## 📂 Directory Structure

```
buildwithbharat/
├── README.md                          # Comprehensive Documentation
└── frontend/
    ├── index.html                     # HTML Entry point with Google Fonts
    ├── package.json                   # Dependencies & Scripts
    ├── postcss.config.js              # PostCSS Tailwind plugins
    ├── tailwind.config.js             # Design tokens & semantic color system
    ├── tsconfig.json                  # TypeScript compiler options
    ├── vite.config.ts                 # Vite bundler configuration
    ├── public/                        # Static assets & public files
    └── src/
        ├── App.tsx                    # Root Router, Route Guards & Layouts
        ├── main.tsx                   # React DOM render entry
        ├── index.css                  # Global Tailwind imports & CSS custom properties
        ├── types/
        │   └── index.ts               # Core TypeScript models (Complaint, User, GPS, etc.)
        ├── context/
        │   ├── AuthContext.tsx        # Authentication & Role state
        │   ├── LanguageContext.tsx    # English & Gujarati localization
        │   ├── ThemeContext.tsx       # Dark/Light mode provider
        │   └── ToastContext.tsx       # Notification toast dispatcher
        ├── services/
        │   └── api.ts                 # Mock API service, state store & workflow engine
        ├── components/
        │   └── common/
        │       ├── BeforeAfterSlider.tsx  # Interactive resolution image slider
        │       ├── Button.tsx             # Standardized button variants
        │       ├── Card.tsx               # Surface card container
        │       ├── Drawer.tsx             # Slide-over sidebar drawer
        │       ├── EmptyState.tsx         # Zero-data feedback component
        │       ├── Footer.tsx             # Government portal footer
        │       ├── GpsCamera.tsx          # Simulated GPS camera with EXIF metadata
        │       ├── IvrSimulator.tsx       # Interactive phone call simulator
        │       ├── LanguageSwitcher.tsx   # En / Gu toggle button
        │       ├── MapComponent.tsx       # Leaflet interactive GIS map
        │       ├── Modal.tsx              # Overlay dialog modal
        │       ├── Navbar.tsx             # Top navigation with role switcher
        │       ├── ProfileModal.tsx       # User details & badges modal
        │       ├── Skeleton.tsx           # Skeleton loading state
        │       ├── StatCard.tsx           # Key metric card
        │       ├── StatusChip.tsx         # Status indicator badge
        │       ├── ThemeToggle.tsx        # Dark / light mode toggle
        │       └── Timeline.tsx           # Ticket audit milestone tracker
        └── pages/
            ├── LandingPage.tsx            # Public landing & verification showcase
            ├── AuthPage.tsx               # Login & role selector page
            ├── PrivacyPolicyPage.tsx      # Privacy & data policy
            ├── TermsPage.tsx              # Municipal terms of service
            ├── citizen/                   # Citizen Portal Views
            │   ├── CitizenLayout.tsx
            │   ├── CitizenHome.tsx
            │   ├── CitizenReport.tsx
            │   ├── CitizenMyComplaints.tsx
            │   ├── CitizenCommunityMap.tsx
            │   ├── CitizenRewards.tsx
            │   └── CitizenHelp.tsx
            ├── department/                # Department Officer Portal Views
            │   ├── DepartmentLayout.tsx
            │   ├── DepartmentDashboard.tsx
            │   ├── DepartmentQueue.tsx
            │   └── DepartmentPerformance.tsx
            └── admin/                     # Municipal Admin Command Views
                ├── AdminLayout.tsx
                ├── AdminDashboard.tsx
                ├── AdminComplaintsTable.tsx
                ├── AdminDepartmentRanking.tsx
                ├── AdminHeatmap.tsx
                ├── AdminFraudIntegrity.tsx
                ├── AdminOfficerManagement.tsx
                └── AdminIvrMonitor.tsx
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation & Run Steps

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Start the local Vite development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Visit [http://localhost:5173](http://localhost:5173) in your web browser.

### Available Scripts
- `npm run dev`: Starts the Vite dev server with hot module replacement.
- `npm run build`: Type-checks with `tsc` and creates an optimized production bundle in `dist/`.
- `npm run preview`: Previews the production build locally.

---

## 👥 Demo Accounts & Role Switcher

You can switch between any of the 3 roles at any time using the **Quick Role Switcher** in the top navigation bar, or via the `/auth` page:

| Role | Demo User | Department / Scope | Preloaded Features |
| :--- | :--- | :--- | :--- |
| **Citizen** | `Aarav Patel` | Navrangpura (Ward 12), Ahmedabad | Report GPS tickets, track resolution sliders, claim XP rewards, upvote neighborhood issues |
| **Field Officer** | `Rajesh Solanki` | Roads & Bridges Dept (Navrangpura) | View assigned queue, test 100m geo-fence resolution camera, add repair notes |
| **Municipal Admin** | `Commissioner S. Mehta (IAS)` | Central Command (All Wards) | City-wide analytics, department ranking, fraud integrity detector, live IVR monitor |

---

## 🏛️ Built with Pride for Gujarat Municipal Governance
*Empowering citizens with transparency, equipping field officers with verified proof of work, and enabling municipal leaders with real-time civic intelligence.*