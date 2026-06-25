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
    items: ["React", "Next.js", "Node.js"],
  },
  {
    id: "styling-motion",
    title: "Styling & Motion",
    items: ["Tailwind CSS", "Framer Motion", "Material UI", "Shade CN"],
  },
  {
    id: "tooling",
    title: "Tooling",
    items: ["Git", "Github", "Swagger", "Figma", "Supabase"],
  },
];

export const marqueeItems = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Tailwind",
  "Material UI",
  "shade CN",
  "Framer Motion",
  "Figma",
  "Swagger",
  "Supabase",
  "Git",
  "Github",
];
