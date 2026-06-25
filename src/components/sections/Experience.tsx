import { motion } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";
import { experiences } from "../../data/experience";

export function Experience() {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-20 pb-28 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel text="Experience" />

        <motion.h2
          className="mb-16 text-headline text-white"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          A short timeline.
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="top-2 bottom-2 left-[5px] absolute bg-[#222] w-px"
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />

          <div className="space-y-16 pl-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.215, 0.61, 0.355, 1.0],
                }}
              >
                {/* Dot */}
                <motion.div
                  className="top-1.5 -left-[2.35rem] absolute bg-[#0a0a0a] border-[#4a7a7c] border-2 rounded-full w-2.5 h-2.5"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.15 + 0.3,
                    ease: "backOut",
                  }}
                />

                {/* Header */}
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-1 mb-1">
                  <h3 className="font-bold text-white text-xl md:text-2xl">
                    {exp.title}
                  </h3>
                  <span className="sm:mt-1 text-[#555] text-label shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Company */}
                <p className="mb-3 text-[#7a9fa0] text-sm">
                  {exp.company} / {exp.location}
                </p>

                {/* Description */}
                <p className="mb-4 max-w-2xl text-[#777] text-sm md:text-base leading-relaxed">
                  {exp.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2">
                  {exp.highlights.map((highlight, hi) => (
                    <motion.li
                      key={hi}
                      className="flex items-start gap-3 text-[#666] text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.15 + hi * 0.07 + 0.4,
                      }}
                    >
                      <span className="mt-0.5 font-mono text-[#444] text-xs shrink-0">
                        -
                      </span>
                      {highlight}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
