import { motion } from "framer-motion";
import {
  siFigma,
  siFramer,
  siGit,
  siGithub,
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
import { skillCategories, marqueeItems } from "../../data/skills";

const Sparkle = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="mx-4 text-bluegray-700 shrink-0"
  >
    <path d="M12 2L13.09 8.26L19 6L14.74 10.91L21 12L14.74 13.09L19 19L13.09 14.74L12 21L10.91 14.74L5 19L9.26 13.09L3 12L9.26 10.91L5 6L10.91 8.26L12 2Z" />
  </svg>
);

const marqueeIcons: Record<string, SimpleIcon> = {
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  React: siReact,
  "Next.js": siNextdotjs,
  "Node.js": siNodedotjs,
  Tailwind: siTailwindcss,
  "Material UI": siMui,
  "shade CN": siShadcnui,
  "Framer Motion": siFramer,
  Figma: siFigma,
  Swagger: siSwagger,
  Supabase: siSupabase,
  Git: siGit,
  Github: siGithub,
};

function BrandIcon({ label }: { label: string }) {
  const icon = marqueeIcons[label];

  if (!icon) return null;

  return (
    <span
      className="group/icon flex justify-center items-center bg-card hover:bg-bluegray-900 border border-border-subtle hover:border-teal/50 rounded-xl w-14 md:w-16 h-14 md:h-16 text-bluegray-500 hover:text-teal-light transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_26px_rgba(115,161,177,0.18)]"
      aria-label={label}
      title={label}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-7 md:w-8 h-7 md:h-8 transition-transform duration-300 group-hover/icon:scale-110"
        role="img"
        aria-hidden="true"
      >
        <path d={icon.path} fill="currentColor" />
      </svg>
    </span>
  );
}

// Duplicate items for seamless infinite loop
const repeatedItems = [...marqueeItems, ...marqueeItems];

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
          Tools I reach for daily.
        </motion.h2>
      </div>

      {/* Marquee */}
      <div className="my-10 py-0.5 border-[#1f1f1f] border-y overflow-hidden">
        <div className="py-5 marquee-wrapper">
          <div className="marquee-track">
            {repeatedItems.map((item, i) => (
              <span key={i} className="flex items-center shrink-0">
                <BrandIcon label={item} />
                <Sparkle />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Skills grid */}
      <div className="mx-auto mt-12 max-w-7xl">
        <div className="gap-8 md:gap-12 grid grid-cols-2 md:grid-cols-4">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{
                duration: 0.6,
                delay: catIdx * 0.1,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
            >
              <p className="mb-5 text-[#555] text-label">{category.title}</p>
              <ul className="space-y-2.5">
                {category.items.map((item, itemIdx) => (
                  <motion.li
                    key={itemIdx}
                    className="text-[#aaa] text-sm"
                    initial={{ x: -8, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: catIdx * 0.08 + itemIdx * 0.05,
                    }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
