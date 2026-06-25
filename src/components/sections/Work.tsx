import { motion } from "framer-motion";
import { siGithub } from "simple-icons";
import { SectionLabel } from "../ui/SectionLabel";
import { TechTag } from "../ui/TechTag";
import { projects, Project } from "../../data/projects";

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M2 16L16 2M16 2H6M16 2V12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1.0],
      }}
      className="group"
    >
      {/* Image container */}
      <motion.div
        className="relative bg-[#0f0f0f] mb-5 p-3 border border-[#1f1f1f] rounded-2xl overflow-hidden"
        style={{ aspectRatio: "16/10" }}
        whileHover={{ borderColor: "#333" }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="block rounded-xl w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-700 ease-out"
        />

        {/* Year badge */}
        <div className="top-4 right-4 absolute bg-[#0a0a0a]/80 px-2 py-1 rounded-full font-mono text-[#888] text-[10px] text-label">
          {project.year}
        </div>
      </motion.div>

      {/* Meta */}
      <div className="flex flex-col">
        <div className="min-h-[172px]">
          <div className="flex justify-between items-start gap-4 mb-2">
            <div>
              <h3 className="font-bold text-white group-hover:text-[#c8dfe0] text-xl md:text-2xl transition-colors duration-300">
                {project.title}
              </h3>
              <p className="mt-1 text-[#7a9fa0] text-sm leading-relaxed">
                {project.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-1 shrink-0">
              {project.githubUrl ? (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} GitHub repository`}
                  title="GitHub"
                  className="text-[#666] hover:text-white transition-colors duration-200"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="w-[18px] h-[18px]"
                    role="img"
                    aria-hidden="true"
                  >
                    <path d={siGithub.path} fill="currentColor" />
                  </svg>
                </motion.a>
              ) : null}{" "}
              {project.liveUrl ? (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} live demo`}
                  title="Live demo"
                  className="text-[#666] hover:text-white transition-colors duration-200"
                  whileHover={{ x: 3, y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowIcon />
                </motion.a>
              ) : null}
            </div>
          </div>

          <p className="max-w-xl text-[#666] text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap content-start gap-2">
          {project.tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="px-6 md:px-12 lg:px-20 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <SectionLabel text="Selected Work" />
            <motion.h2
              className="text-headline text-white"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              Things I've shipped recently.
            </motion.h2>
          </div>
          <motion.p
            className="hidden md:block self-start mt-1 text-[#555] text-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {projects.length} projects
          </motion.p>
        </div>

        <div className="gap-10 grid grid-cols-1 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={projects.length + i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
