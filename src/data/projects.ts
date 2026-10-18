export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  year: number;
  tags: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: "meethaq",
    title: "Meethaq",
    subtitle: "Milestone contracts and delivery platform",
    description:
      "Platform where freelancers and clients agree on milestone-based contracts, document every delivery, and tie each payment to the client's approval, so scope changes and payment disputes have a clear record instead of getting lost in chat.",
    year: 2026,
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "TanStack Query",
      "RHF",
      "ZOD",
      "next-intl",
      "SignalR",
      "Recharts",
      "Sonner",
    ],
    image: "/projects/meethaq.webp",
    imageWidth: 1500,
    imageHeight: 712,
  },
  {
    id: "academix",
    title: "Academix",
    subtitle: "Multi-tenant school management & assessment platform",
    description:
      "SaaS platform that enables schools to manage students, teachers, classes, attendance, scheduling, examinations, assignments, and AI-assisted assessments from a single application. Designed for multiple schools with role-based experiences for administrators, teachers, students, and parents.",
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
    image: "/projects/academix.webp",
    imageWidth: 1500,
    imageHeight: 712,
    liveUrl: "https://academix-edu.vercel.app",
    githubUrl: "https://github.com/academix-platform/academix",
  },
  {
    id: "cure-way",
    title: "Cure-Way",
    subtitle: "Multi-vendor pharmacy delivery platform",
    description:
      "Multi-vendor pharmacy platform that connects customers with nearby pharmacies, allowing them to browse products, place orders, manage prescriptions, and track deliveries. The platform also provides operational dashboards for pharmacies and administrators to manage inventory, orders, and business operations.",
    year: 2026,
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "Axios",
      "TanStack Query",
    ],
    image: "/projects/cure-way.webp",
    imageWidth: 1280,
    imageHeight: 607,
    liveUrl: "https://cure-way.vercel.app",
    githubUrl: "https://github.com/cure-way/cureway-platform",
  },
  {
    id: "client-portal",
    title: "Client Portal",
    subtitle: "Role-based SaaS project management dashboard",
    description:
      "Project management platform designed for businesses, freelancers, and clients to collaborate through project tracking, task management, meeting scheduling, team communication, and analytics dashboards.",
    year: 2025,
    tags: [
      "NEXT.JS",
      "REACT",
      "TYPESCRIPT",
      "TAILWIND CSS",
      "TanStack Query",
      "FULLCALENDAR",
    ],
    image: "/projects/client-portal.webp",
    imageWidth: 1500,
    imageHeight: 710,
    liveUrl: "https://client-portal-hub.vercel.app",
    githubUrl: "https://github.com/abdallah-abusharekh/client-portal",
  },
  {
    id: "pizzana",
    title: "Pizzana",
    subtitle: "Pizza restaurant ordering app built with React & Redux",
    description:
      "Full-featured restaurant site with a responsive marketing homepage, live menu display, and an ordering flow including cart management, delivery address geocoding, and user session handling - built to practice Redux state management, API integration, and component architecture with React and Tailwind CSS.",
    year: 2026,
    tags: ["REACT", "VITE", "REDUX", "TAILWIND CSS"],
    image: "/projects/pizzana.webp",
    imageWidth: 1500,
    imageHeight: 716,
    liveUrl: "https://pizzana-app.vercel.app/",
    githubUrl: "https://github.com/abdallah-abusharekh/Pizzana",
  },
];
