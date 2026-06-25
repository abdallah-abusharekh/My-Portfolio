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
    image: "/academix.png",
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
    image: "/cure-way.jpg",
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
    image: "/client-portal.png",
    liveUrl: "https://client-portal-hub.vercel.app",
    githubUrl: "https://github.com/abdallah-abusharekh/client-portal",
  },
  {
    id: "devblog",
    title: "DevBlog",
    subtitle: "Modern blog application built with Next.js 16",
    description:
      "Created as a learning project to showcase App Router architecture, server-side data fetching, dynamic routing, React Context, and modern React patterns through a clean, responsive blogging interface.",
    year: 2025,
    tags: ["NEXT.JS", "APP ROUTER", "REACT", "TYPESCRIPT"],
    image: "/dev-blog.png",
    liveUrl: "https://dev-blog-nextapp.vercel.app",
    githubUrl: "https://github.com/abdallah-abusharekh/DevBlog",
  },
];
