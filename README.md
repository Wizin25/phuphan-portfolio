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

---

## 📬 Contact API Endpoints
* `GET /api/health` - API server status check
* `GET /api/portfolio` - Full portfolio payload (profile, skills, projects)
* `GET /api/projects` - Filterable project list
* `GET /api/skills` - Categorized skills matrix
* `POST /api/contact` - Working contact form submission endpoint
