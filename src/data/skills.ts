export type SkillCategory = {
  id: string;
  title: string;
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    items: ["HTML", "CSS", "JavaScript", "TypeScript"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    items: ["React", "Next.js", "Node.js", "Express"],
  },
  {
    id: "styling-motion",
    title: "Styling & Motion",
    items: ["Tailwind CSS", "Framer Motion", "Material UI", "shadcn/ui"],
  },
  {
    id: "data",
    title: "Data",
    items: ["PostgreSQL", "MongoDB", "Prisma", "Supabase"],
  },
  {
    id: "tooling",
    title: "Tooling",
    items: ["Git & GitHub", "Swagger", "Postman", "Figma"],
  },
];

export const marqueeItems = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Tailwind",
  "Material UI",
  "shadcn/ui",
  "Framer Motion",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Figma",
  "Swagger",
  "Postman",
  "Supabase",
  "Git",
  "GitHub",
];
