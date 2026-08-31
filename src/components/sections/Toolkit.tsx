import { motion, type Variants } from "framer-motion";
import type { CSSProperties } from "react";
import {
  siCss,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siShadcnui,
  siSupabase,
  siSwagger,
  siTailwindcss,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";
import { SectionLabel } from "../ui/SectionLabel";
import { skillCategories } from "../../data/skills";

const toolIcons: Record<string, SimpleIcon> = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  "Tailwind CSS": siTailwindcss,
  "Framer Motion": siFramer,
  "Material UI": siMui,
  "Shade CN": siShadcnui,
  Git: siGit,
  Github: siGithub,
  Swagger: siSwagger,
  Figma: siFigma,
  Supabase: siSupabase,
};

// Per-tool brand colors, muted to a mid-tone so nothing reads as neon on dark.
const toolAccents: Record<string, string> = {
  HTML: "#d9724f",
  CSS: "#4f6fd1",
  JavaScript: "#d9c65c",
  TypeScript: "#4a86c4",
  React: "#5fb8d4",
  "Next.js": "#d4d4d4",
  "Node.js": "#6ba36a",
  "Tailwind CSS": "#3fb8bd",
  "Framer Motion": "#b0559e",
  "Material UI": "#4a90d9",
  "Shade CN": "#d4d4d4",
  Git: "#d9614a",
  Github: "#d4d4d4",
  Swagger: "#8fc652",
  Figma: "#b47fe0",
  Supabase: "#4bbf8a",
};

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1.0] },
  },
};

function ToolCard({ name, accent }: { name: string; accent: string }) {
  const icon = toolIcons[name];

  return (
    <motion.li variants={cardVariants}>
      <span
        className="flex justify-center sm:justify-start items-center gap-0 sm:gap-3 sm:bg-card sm:hover:bg-card-hover p-0 sm:p-[18px] sm:border sm:border-border-subtle sm:hover:border-[var(--accent)] rounded-xl h-full text-[#aaa] transition-all hover:-translate-y-0.5 duration-200"
        style={{ "--accent": accent } as CSSProperties}
        aria-label={name}
      >
        {icon && (
          <span
            className="flex justify-center items-center border border-border-subtle hover:border-[var(--accent)] sm:border-0 rounded-lg w-14 h-14 sm:w-[34px] sm:h-[34px] shrink-0 transition-all duration-200"
            style={{ backgroundColor: `${accent}21` }}
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 sm:w-5 sm:h-5"
              style={{ color: accent }}
              role="img"
              aria-hidden="true"
            >
              <path d={icon.path} fill="currentColor" />
            </svg>
          </span>
        )}
        <span className="hidden sm:inline text-sm" aria-hidden="true">
          {name}
        </span>
      </span>
    </motion.li>
  );
}

export function Toolkit() {
  return (
    <section id="toolkit" className="px-6 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <SectionLabel text="Toolkit" />
        <motion.h2
          className="text-headline text-white"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          Tools I reach for daily
        </motion.h2>
      </div>

      {/* Toolkit grid */}
      <div className="mx-auto mt-12 max-w-7xl">
        <div className="relative p-7 border-[0.5px] border-border-subtle rounded-3xl overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 100% 0%, rgba(115,161,177,0.07), transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative gap-10 md:gap-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category, catIdx) => (
              <div key={category.id}>
                <p className="mb-5 text-[#8f8f8f] text-label">
                  {category.title}
                </p>
                <motion.ul
                  className="flex flex-wrap gap-2 sm:gap-3 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  variants={groupVariants}
                  transition={{ delayChildren: catIdx * 0.05 }}
                >
                  {category.items.map((item) => (
                    <ToolCard
                      key={item}
                      name={item}
                      accent={toolAccents[item]}
                    />
                  ))}
                </motion.ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
