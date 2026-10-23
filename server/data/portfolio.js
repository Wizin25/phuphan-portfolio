export const portfolioData = {
  profile: {
    name: "Phan Tấn Phú",
    englishName: "Phan Tan Phu",
    title: "Full-Stack Software Engineer & Solutions Developer",
    subtitle: "Specializing in React, .NET Core, Node.js, and Enterprise Systems",
    bio: "Passionate Software Engineer graduated from FPT University with hands-on experience building production-grade web systems, distributed platforms, and cloud integrations. Strong background in modern front-end architectures (React 18/19, TypeScript), multi-tier backend design (.NET Core, Node.js), and enterprise business operations (ERP / SAP).",
    emailPrimary: "tanphu200213@gmail.com",
    emailSecondary: "phantanphu2505@gmail.com",
    github: "https://github.com/Wizin25",
    location: "Ho Chi Minh City, Vietnam",
    status: "Available for Full-time / Junior / Fresher Roles in HCMC",
    languages: ["Vietnamese (Native)", "English (Professional Working Proficiency)"],
    yearsOfExperience: "Fresher / Junior (2+ years hands-on project delivery)"
  },
  skills: {
    frontend: [
      { name: "ReactJS (v18 & v19)", level: 90, highlight: true },
      { name: "TypeScript / JavaScript (ES6+)", level: 90, highlight: true },
      { name: "Vite & Modern Build Tooling", level: 85 },
      { name: "Ant Design & Tailwind CSS", level: 90, highlight: true },
      { name: "Recharts & Data Visualization", level: 85 },
      { name: "State Management (Recoil, Context API)", level: 85 },
      { name: "Material-UI (MUI) & Bootstrap 5", level: 85 }
    ],
    backend: [
      { name: "C# / ASP.NET Core (.NET 8 & 6)", level: 90, highlight: true },
      { name: "Node.js & Express.js REST APIs", level: 85, highlight: true },
      { name: "Java (OOP, Servlet, JSP, MVC)", level: 80 },
      { name: "Multi-tier Architecture (Service / Repository / DAO)", level: 90, highlight: true },
      { name: "JWT Authentication & Google OAuth 2.0", level: 85 },
      { name: "Entity Framework Core & LINQ", level: 88 }
    ],
    database: [
      { name: "Microsoft SQL Server", level: 90, highlight: true },
      { name: "Relational Schema Design & Normalization", level: 90 },
      { name: "Complex Queries, Stored Procedures & Triggers", level: 88 },
      { name: "Firebase Realtime DB & Firestore", level: 75 }
    ],
    enterpriseAndTools: [
      { name: "SAP S/4HANA & ABAP Programming", level: 80, highlight: true },
      { name: "Supply Chain & ERP Modules (MM, SD, WM, FI/CO)", level: 85 },
      { name: "Git, GitHub & Collaborative Workflows", level: 90, highlight: true },
      { name: "PayOS (VietQR) Payment Gateway Integration", level: 90 },
      { name: "Google Gemini AI API Integration", level: 85 },
      { name: "Python (Web Scraping, Pandas, Automation)", level: 80 },
      { name: "Mobile App Development (Flutter & Dart)", level: 75 }
    ]
  },
  projects: [
    {
      id: "swapx-ev-bss",
      title: "SwapX – EV Battery Swap Station Management System",
      shortDescription: "Enterprise multi-role platform for electric vehicle battery swapping network management.",
      category: "Fullstack",
      featured: true,
      role: "Frontend Lead / Full-Stack Contributor (119+ commits)",
      teamSize: "5 engineers",
      timeline: "10/2025 – 12/2025",
      techStack: [
        "React 19",
        "TypeScript",
        "Vite 7",
        "ASP.NET Core (.NET 8)",
        "Ant Design",
        "Tailwind CSS",
        "Recharts",
        "SQL Server",
        "PayOS (VietQR)",
        "Google Gemini AI"
      ],
      highlights: [
        "Architected complete client-side architecture in React 19 & TypeScript for 3 user roles: EV Drivers, Station Staff, and System Admins.",
        "Built interactive analytics dashboards with Recharts for real-time station capacity, revenue metrics, and battery State of Health (SoH) monitoring.",
        "Implemented end-to-end battery booking workflow, vehicle VIN association, package subscriptions, and on-site staff swap validation.",
        "Integrated PayOS QR-code payment flow and hooked into backend Google Gemini AI endpoints for predictive battery analysis.",
        "Protected application routes with role-based access control (RBAC), JWT authentication, and Google OAuth 2.0 callback handling."
      ],
      github: "https://github.com/Wizin25/FE_EVB-SS-PORTAL",
      liveDemo: null,
      badge: "Flagship CleanTech Project"
    },
    {
      id: "remakers-studio",
      title: "Remakers Studio – Footwear Care & Customization Platform",
      shortDescription: "Production e-commerce and specialized restoration service booking platform.",
      category: "E-Commerce & Service",
      featured: true,
      role: "Frontend Developer (Primary Author)",
      teamSize: "4–5 members",
      timeline: "04/2025 – Present",
      techStack: [
        "React 18",
        "Vite 6",
        "React Router v6",
        "Bootstrap 5",
        "Axios",
        "PayOS Payment Gateway",
        "Google Maps Embed",
        "Vercel"
      ],
      highlights: [
        "Built and deployed live production application to Vercel connected to a remote RESTful API backend at remakers-studio.shop.",
        "Implemented cart management logic with localStorage persistence, quantity validation, and dynamic price calculations.",
        "Integrated PayOS online payment gateway generating automated VietQR codes and handling payment success/cancel redirect callbacks.",
        "Engineered specialized service booking modules (/clean and /restore) allowing customers to submit custom footwear restoration requests.",
        "Designed responsive store locator using Google Maps Embed API and Leaflet, plus an Admin view to manage catalog and order statuses."
      ],
      github: "https://github.com/wizin25/remakers-studio",
      liveDemo: "http://remakers-studio.shop",
      badge: "Deployed to Production"
    },
    {
      id: "cat-dog-platform",
      title: "Cat & Dog Platform (BlogAnimal)",
      shortDescription: "Community and adoption web platform for pet lovers with rich media management.",
      category: "Fullstack",
      featured: false,
      role: "Full-Stack Developer",
      teamSize: "Individual / Academic project",
      timeline: "2024",
      techStack: [
        "ASP.NET Core (.NET 6 Web API)",
        "React 18",
        "Entity Framework Core",
        "SQL Server",
        "Cloudinary SDK",
        "AutoMapper",
        "Tailwind CSS",
        "Material UI",
        "Recoil"
      ],
      highlights: [
        "Designed clean N-tier backend architecture with Controllers, Services, Repository Pattern, and DTO data encapsulation.",
        "Integrated Cloudinary .NET SDK for high-speed cloud image uploading and responsive asset management.",
        "Built rich text editor integration using React-Quill for community blog writing and media sharing.",
        "Constructed normalized SQL Server relational schemas for accounts, posts, pets, and categories."
      ],
      github: "https://github.com/Wizin25",
      liveDemo: null,
      badge: "Clean Architecture"
    },
    {
      id: "perfume-store-mobile",
      title: "Perfume Store Mobile App",
      shortDescription: "Cross-platform mobile e-commerce application for luxury fragrances.",
      category: "Mobile",
      featured: false,
      role: "Mobile App Developer",
      teamSize: "Academic (SWD392)",
      timeline: "2024",
      techStack: [
        "Flutter",
        "Dart",
        "Firebase Authentication",
        "Google Sign-In",
        "Cloud Firestore"
      ],
      highlights: [
        "Developed cross-platform mobile UI/UX with smooth transitions and BottomNavigationBar tab architecture.",
        "Integrated Firebase Authentication with Google Sign-In and secure credential storage.",
        "Built product catalog, interactive details view, shopping cart, and mock checkout flow."
      ],
      github: "https://github.com/Wizin25",
      liveDemo: null,
      badge: "Cross-Platform Mobile"
    },
    {
      id: "sap-erp-abap",
      title: "Enterprise ERP & SAP S/4HANA Solutions",
      shortDescription: "Business process simulation and ABAP development across core enterprise modules.",
      category: "Enterprise / ERP",
      featured: true,
      role: "SAP ABAP & Functional Explorer",
      teamSize: "Academic (SAP341)",
      timeline: "2024 – 2025",
      techStack: [
        "SAP NetWeaver",
        "ABAP Programming",
        "ALV / OOPS ALV",
        "BDC Batch Input",
        "Dynpros",
        "SmartForms",
        "HANA In-Memory"
      ],
      highlights: [
        "Simulated end-to-end enterprise workflows: Materials Management (MM - MM01, P2P), Sales & Distribution (SD - O2C), Finance & Controlling (FI/CO - AR/AP, GL), and Warehouse Management (WM).",
        "Developed custom ABAP reports using ALV Grid and OOPS ALV for data extraction and business reporting.",
        "Automated bulk data migration using Batch Data Communication (BDC) and designed official printable documents with SmartForms.",
        "Implemented database access routines and modular subroutines in accordance with SAP ABAP best practices."
      ],
      github: "https://github.com/Wizin25",
      liveDemo: null,
      badge: "Enterprise Mindset"
    },
    {
      id: "python-automation-scraper",
      title: "Web Scraper & Enterprise Data Automation",
      shortDescription: "Automated data harvesting and Excel reporting tool for business leads.",
      category: "Automation",
      featured: false,
      role: "Python Developer",
      teamSize: "Individual",
      timeline: "2024",
      techStack: [
        "Python 3",
        "BeautifulSoup4",
        "Requests",
        "Pandas",
        "OpenPyXL"
      ],
      highlights: [
        "Built automated crawlers extracting enterprise contact details and email addresses across corporate web pages.",
        "Cleaned, structured, and exported tabular data into standardized Excel workbooks using Pandas DataFrames."
      ],
      github: "https://github.com/Wizin25",
      liveDemo: null,
      badge: "Data Automation"
    }
  ],
  education: [
    {
      degree: "Bachelor of Software Engineering (Kỹ thuật Phần mềm)",
      school: "FPT University (Đại học FPT)",
      period: "2021 – 2025",
      description: "Comprehensive training in Software Architecture, Full-Stack Web Development, Mobile Development, Database Engineering, and Enterprise ERP Systems."
    }
  ]
};
