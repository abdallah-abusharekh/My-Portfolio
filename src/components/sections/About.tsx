import { motion } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";
import { profile } from "../../data/profile";

export function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-12 lg:px-20 py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <SectionLabel text="About" />

        <div className="items-start gap-y-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_14rem_minmax(0,1fr)] lg:gap-x-16">
          {/* Left: Headline */}
          <div className="overflow-hidden">
            <motion.h2
              className="text-headline text-white"
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -80px 0px" }}
              transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              {profile.headline}
            </motion.h2>
          </div>

          <div
            aria-hidden="true"
            className="hidden lg:block min-h-56"
          />

          {/* Right: Bio */}
          <div className="space-y-6 pt-0 lg:pt-2">
            {profile.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-[#888] md:text-[1.05rem] text-base leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1.0],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
