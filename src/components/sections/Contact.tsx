import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../../data/profile";
import { ArrowIcon } from "../ui/ArrowIcon";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.0]);
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden"
    >
      {/* Brand gradient background */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <div className="absolute inset-0 bg-bluegray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_64%_at_50%_48%,_rgba(115,161,177,0.28)_0%,_rgba(95,116,130,0.18)_40%,_transparent_74%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_44%_30%_at_50%_50%,_rgba(155,194,207,0.18)_0%,_transparent_66%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_#0a0a0a_0%,_rgba(17,23,28,0.28)_44%,_#0a0a0a_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="z-10 relative px-6 text-center"
        style={{ y: textY }}
      >
        {/* Large headline */}
        <div className="mb-1 overflow-hidden">
          <motion.p
            className="text-display text-white leading-none"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.215, 0.61, 0.355, 1.0] }}
          >
            Let's build
          </motion.p>
        </div>

        <div className="mb-1 overflow-hidden">
          <motion.p
            className="text-bluegray-300 text-display leading-none"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.0,
              delay: 0.1,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
          >
            Something
          </motion.p>
        </div>

        <div className="mb-12 overflow-hidden">
          <motion.p
            className="text-display text-teal-light leading-none"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.0,
              delay: 0.18,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
          >
            Together.
          </motion.p>
        </div>

        {/* Availability */}
        <motion.p
          className="mb-8 text-bluegray-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Available for freelance - {profile.availabilityQuarter}. Drop a line
          and I'll reply within 24 hours.
        </motion.p>

        {/* Email CTA */}
        <motion.a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=Project%20Inquiry`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-bluegray-900/75 hover:bg-teal shadow-[0_0_0_rgba(115,161,177,0)] hover:shadow-[0_0_36px_rgba(115,161,177,0.32)] backdrop-blur-sm px-7 py-3.5 border border-bluegray-700 hover:border-teal-light rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 font-medium text-bluegray-300 hover:text-white text-sm transition-all duration-300"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
        >
          {profile.email}
          <motion.span
            className="opacity-60 group-hover:opacity-100 transition-opacity"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowIcon />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
