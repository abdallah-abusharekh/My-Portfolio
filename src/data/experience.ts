export type Experience = {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  startYear: number;
  endYear: number | null;
  description: string;
  highlights: string[];
};

export const experiences: Experience[] = [
  {
    id: "gaza-sky-geeks-frontend-intern",
    title: "Front-End Intern",
    company: "Gaza Sky Geeks",
    location: "Internship",
    period: "Jun 2025 - Mar 2026",
    startYear: 2025,
    endYear: 2026,
    description:
      "Built responsive and scalable web interfaces with React, translating design requirements into reusable UI components.",
    highlights: [
      "Created modular React components for responsive front-end experiences.",
      "Collaborated with a team using Git workflows, code reviews, and iterative development cycles.",
    ],
  },
  {
    id: "areisto-software-full-stack-intern",
    title: "Full-Stack Intern",
    company: "Areisto Software",
    location: "Internship",
    period: "Dec 2025 - Feb 2026",
    startYear: 2025,
    endYear: 2026,
    description:
      "Contributed to an internal management system using Next.js and Nest.js with clear front-end and back-end separation.",
    highlights: [
      "Implemented features following clean architecture principles.",
      "Used GitHub branching strategies, pull requests, and peer reviews in an Agile environment.",
      "Helped deliver maintainable, production-ready solutions across the stack.",
    ],
  },
  {
    id: "gaza-sky-geeks-advanced-react-bootcamp",
    title: "Advanced React Bootcamp",
    company: "Gaza Sky Geeks",
    location: "Bootcamp",
    period: "Jan 2026 - Feb 2026",
    startYear: 2026,
    endYear: 2026,
    description:
      "Built structured front-end applications in team-based, project-driven scenarios.",
    highlights: [
      "Applied advanced React patterns and practical state management techniques.",
      "Focused on performance optimization and maintainable application structure.",
    ],
  },
];
