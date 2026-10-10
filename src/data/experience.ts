export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number | null;
  description?: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "masar-frontend-developer",
    title: "Frontend Developer",
    company: "Masar",
    location: "Startup MVP Bootcamp",
    period: "Aug 2026 - Sep 2026",
    startYear: 2026,
    endYear: 2026,
    highlights: [
      "Built and shipped a production-ready MVP in 8 weeks with a four-person cross-functional team. Worked in weekly delivery cycles with team reviews, aligning design and engineering and cutting scope to ship the core flow first.",
      "Owned the front-end of Meethaq, designing a scalable, feature-based architecture with clean separation of concerns and efficient data handling, and building against API contracts agreed with the backend team.",
    ],
  },
  {
    id: "gaza-sky-geeks-frontend-engineer",
    title: "Frontend Engineer",
    company: "Gaza Sky Geeks",
    location: "Code2Career Program",
    period: "Jun 2025 - Mar 2026",
    startYear: 2025,
    endYear: 2026,
    highlights: [
      "Shipped responsive, pixel-perfect dashboard pages from Figma across multiple mentored projects, owning features from design handoff through code review to merge. Applied composition patterns and server-state management to keep UI consistent and data handling predictable as projects grew.",
      "Took part in weekly code reviews and mentorship sessions with senior developers, applying feedback iteratively to strengthen component architecture and code quality. Collaborated through a shared Git workflow of feature branches, pull requests, and review-driven merges.",
    ],
  },
  {
    id: "gaza-sky-geeks-react-developer",
    title: "React Developer",
    company: "Gaza Sky Geeks",
    location: "Advanced React Bootcamp",
    period: "Jan 2026 - Feb 2026",
    startYear: 2026,
    endYear: 2026,
    highlights: [
      "Led a team of 4 developers through an advanced React deep-dive covering feature-based architecture, TanStack Query, design patterns, and performance techniques like lazy loading and code splitting, in a shared codebase with a branch-and-PR workflow.",
    ],
  },
];
