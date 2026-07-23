export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: number;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "academix",
    title: "Academix",
    subtitle: "Multi-tenant school management & assessment platform",
    description:
      "Co-developed a full-stack SaaS platform in a team of 3, owning the frontend architecture and leading modules for examinations, assignments, scheduling, dashboards, and role-based user flows.",
    year: 2026,
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "PRISMA",
      "POSTGRESQL",
      "CLERK",
      "RHF",
      "ZOD",
    ],
    image: "/academix.webp",
    liveUrl: "https://academix-edu.vercel.app",
    githubUrl: "https://github.com/academix-platform/academix",
  },
  {
    id: "cure-way",
    title: "Cure-Way",
    subtitle: "Multi-vendor pharmacy delivery platform",
    description:
      "Contributed to a production-grade multi-vendor platform, building scalable frontend features, role-aware components, operational dashboards, and REST API integrations.",
    year: 2026,
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "Axios",
      "TanStack Query",
    ],
    image: "/cure-way.webp",
    liveUrl: "https://cure-way.vercel.app",
    githubUrl: "https://github.com/cure-way/cureway-platform",
  },
  {
    id: "client-portal",
    title: "Client Portal",
    subtitle: "Role-based SaaS project management dashboard",
    description:
      "Designed and built a SaaS-style dashboard with role-based experiences for Admins, Freelancers, and Customers, including project tracking, tasks, analytics, and meeting scheduling.",
    year: 2025,
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "TanStack Query",
      "FULLCALENDAR",
    ],
    image: "/client-portal.webp",
    liveUrl: "https://client-portal-hub.vercel.app",
    githubUrl: "https://github.com/abdallah-abusharekh/client-portal",
  },
  {
    id: "pizzana",
    title: "Pizzana",
    subtitle: "Pizza restaurant ordering app built with React & Redux",
    description:
      "A full-featured restaurant site with a responsive marketing homepage, live menu display, and an ordering flow including cart management, delivery address geocoding, and user session handling - built to practice Redux state management, API integration, and component architecture with React and Tailwind CSS.",
    year: 2026,
    tags: ["REACT", "VITE", "REDUX", "TAILWIND CSS"],
    image: "/pizzana.webp",
    liveUrl: "https://pizzana-app.vercel.app/",
    githubUrl: "https://github.com/abdallah-abusharekh/Pizzana",
  },
];
