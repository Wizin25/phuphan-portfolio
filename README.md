# 🚀 Phan Tấn Phú (Phan Tan Phu) - Full-Stack Portfolio

A modern, high-performance, responsive Full-Stack Portfolio website built with **React (v18)** and **Node.js (Express)**, designed to showcase all of Phú's real projects, technical skills, architectures, and contact channels.

---

## 🌟 Tech Stack

* **Frontend:** React 18, Vite 6, Tailwind CSS, Lucide React Icons.
* **Backend:** Node.js, Express.js REST API, CORS.
* **Architecture:** Decoupled Client-Server with unified deployment support.

---

## 📂 Project Structure

```
phu-portfolio/
├── server/
│   ├── index.js               # Express API server (Portfolio, Projects, Skills, Contact)
│   ├── data/
│   │   └── portfolio.js       # All projects, skills, education & metadata
│   └── package.json
├── client/
│   ├── index.html             # Tailwind CDN & typography setup
│   ├── vite.config.js         # Vite dev server with /api proxy to port 5000
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation bar with live API status pill
│   │   │   ├── Hero.jsx       # Hero headline & call-to-actions
│   │   │   ├── About.jsx      # Engineering pillars & highlights
│   │   │   ├── Skills.jsx     # Interactive categorized skill matrix
│   │   │   ├── Projects.jsx   # Filterable real-world project cards
│   │   │   ├── ProjectModal.jsx # Detailed deep-dive architecture modal
│   │   │   ├── Experience.jsx # Education & milestones timeline
│   │   │   ├── Contact.jsx    # Real working contact form calling Node.js API
│   │   │   └── Footer.jsx     # Bottom footer with socials
│   │   ├── App.jsx            # State & API fetching
│   │   └── main.jsx
│   └── package.json
└── package.json               # Root scripts
```

---

## ⚡ Quick Start (Running Locally)

### 1. Install Dependencies
Open terminal in the project directory:

```bash
# Install Server dependencies
cd server
npm install

# Install Client dependencies
cd ../client
npm install
```

### 2. Run the Application

**Option A: Development Mode (Two terminals)**

* **Terminal 1 (Backend API on port 5000):**
  ```bash
  cd server
  npm start
  ```
  *(Server runs at `http://localhost:5000`)*

* **Terminal 2 (Frontend on port 3000):**
  ```bash
  cd client
  npm run dev
  ```
  *(Open browser at `http://localhost:3000`)*

**Option B: Production Mode (Single port)**
```bash
# Build the client
cd client
npm run build

# Start the server (which automatically serves the client build)
cd ../server
npm start
```
*(Open browser at `http://localhost:5000`)*

## 📊 Click Analytics (Umami)

The client sends one pageview when the portfolio loads and a small set of named events to Umami Cloud: project opens, skills category changes, and contact actions. Event properties use fixed project IDs, skill category keys, and contact action types; visible labels, email addresses, phone numbers, and form contents are not sent. The provided Umami Website ID is configured as the default. To use a different website, override it with `VITE_UMAMI_WEBSITE_ID` in `client/.env.local` for local development or in the deployment platform's client build environment. See `client/.env.example`. The ID is public client-side configuration, not a secret.

Automatic tracking is disabled so the initial pageview is sent once and only selected events are recorded. URL search parameters and fragments are excluded. Umami's Do Not Track option is enabled and respects the browser's DNT signal when available.

The public analytics section requests aggregate data from a server endpoint using the Umami Share URL's scoped read-only token. It shows visitors, visits, pageviews, and selected portfolio events for the last 30 days, cached for five minutes. It does not expose the Umami token or collect visitor-level details in the portfolio UI. Update the share slug in `server/index.js` and the dashboard link in `client/src/components/PublicAnalytics.jsx` if the Share URL changes.

---

## 📬 Contact API Endpoints
* `GET /api/health` - API server status check
* `GET /api/portfolio` - Full portfolio payload (profile, skills, projects)
* `GET /api/projects` - Filterable project list
* `GET /api/skills` - Categorized skills matrix
* `POST /api/contact` - Working contact form submission endpoint
