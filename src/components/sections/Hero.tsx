import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  siFacebook,
  siGithub,
  siInstagram,
  type SimpleIcon,
} from "simple-icons";
import { profile } from "../../data/profile";
import { socials } from "../../data/socials";

const linkedInIcon = {
  title: "LinkedIn",
  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
} satisfies Pick<SimpleIcon, "title" | "path">;

const socialIcons: Record<string, Pick<SimpleIcon, "title" | "path">> = {
  github: siGithub,
  linkedin: linkedInIcon,
  facebook: siFacebook,
  instagram: siInstagram,
};

const heroSocials = ["github", "linkedin", "facebook", "instagram"]
  .map((id) =>
    socials.find(
      (social) => social.id === id || social.platform.toLowerCase() === id,
    ),
  )
  .filter((social): social is (typeof socials)[number] => Boolean(social));

function SocialIconLink({ social }: { social: (typeof socials)[number] }) {
  const icon = socialIcons[social.platform.toLowerCase()];

  if (!icon) return null;

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.platform}
      title={social.platform}
      className="flex justify-center items-center hover:bg-bluegray-900/80 hover:shadow-[0_0_20px_rgba(115,161,177,0.18)] border border-transparent hover:border-teal/40 rounded-full w-8 h-8 text-label hover:text-teal-light transition-all hover:-translate-y-0.5 duration-300"
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        role="img"
        aria-hidden="true"
      >
        <path d={icon.path} fill="currentColor" />
      </svg>
    </a>
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const softwareY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const engineerY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const softwareYSpring = useSpring(softwareY, springConfig);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex flex-col justify-between min-h-screen overflow-hidden"
    >
      {/* Nav spotlight */}
      <div className="top-[-11rem] left-1/2 z-0 absolute bg-[radial-gradient(ellipse_at_center,_rgba(155,194,207,0.38)_0%,_rgba(115,161,177,0.22)_32%,_rgba(71,80,89,0.08)_58%,_transparent_74%)] blur-2xl w-[min(46rem,125vw)] h-[25rem] -translate-x-1/2 pointer-events-none" />
      <div className="top-0 left-1/2 z-0 absolute bg-[linear-gradient(180deg,_rgba(155,194,207,0.18)_0%,_rgba(115,161,177,0.11)_34%,_rgba(115,161,177,0)_78%)] [clip-path:polygon(42%_0,_58%_0,_78%_100%,_22%_100%)] blur-xl w-[min(30rem,82vw)] h-[24rem] -translate-x-1/2 pointer-events-none" />

      {/* Radial vignette */}
      <div className="z-10 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#0a0a0a_100%)] pointer-events-none" />

      {/* Static portrait for screens without the scroll animation */}
      <div className="lg:hidden bottom-28 sm:bottom-32 md:bottom-24 left-1/2 z-30 absolute w-28 sm:w-36 md:w-44 aspect-square -translate-x-1/2 pointer-events-none">
        <img
          src="/abdallah-dark.jpg"
          alt={profile.name}
          className="block shadow-2xl shadow-black/40 rounded-2xl w-full h-full object-cover"
        />
      </div>

      {/* Top meta */}
      <motion.div
        className="z-20 relative flex justify-between items-center px-6 md:px-12 lg:px-20 pt-28"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <p className="text-label">/ Portfolio — {profile.year}</p>
        <p className="text-label">{profile.location}</p>
      </motion.div>

      {/* Main display type */}
      <motion.div
        className="z-20 relative flex flex-col flex-1 justify-center items-center px-4 md:px-8 lg:px-14"
        style={{ opacity }}
      >
        {/* Software */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-display text-white leading-none select-none"
            style={{ y: softwareYSpring }}
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: 0.2,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
          >
            Software
          </motion.h1>
        </div>

        {/* Engineer */}
        <div className="overflow-hidden">
          <motion.p
            className="text-[#2a2a2a] text-display leading-none select-none"
            style={{ y: engineerY }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.0,
              delay: 0.4,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
          >
            Engineer
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom meta */}
      <motion.div
        className="z-20 relative flex sm:flex-row flex-col justify-between items-center gap-3 sm:gap-4 px-6 md:px-12 lg:px-20 pb-8 sm:pb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="flex items-center gap-1.5 sm:gap-1">
          {heroSocials.map((social) => (
            <SocialIconLink key={social.platform} social={social} />
          ))}
        </div>
        <p className="font-mono text-[#666] text-[0.62rem] sm:text-[0.7rem] text-center uppercase tracking-[0.12em] whitespace-nowrap">
          / Creating since {profile.createdSince}
        </p>
      </motion.div>
    </section>
  );
}
