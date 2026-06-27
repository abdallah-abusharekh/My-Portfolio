import { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { profile } from "../../data/profile";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(10,10,10,0)", "rgba(10,10,10,0.92)"],
  );
  const navBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"],
  );

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return () => unsub();
  }, [scrollY]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <motion.header
      className="top-0 right-0 left-0 z-50 fixed flex justify-center px-4 pt-4"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
    >
      <motion.nav
        className="relative flex justify-between sm:justify-center items-center gap-2 sm:gap-6 px-3 sm:px-4 py-2.5 rounded-full w-full sm:w-auto max-w-[calc(100vw-2rem)]"
        style={{
          backgroundColor: navBg,
          borderColor: navBorder,
          borderWidth: "1px",
          borderStyle: "solid",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        {/* Logo / Name */}
        <a
          href="#"
          className="flex items-center gap-2 sm:mr-2"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <div className="flex justify-center items-center bg-teal rounded-full w-8 h-8 font-bold text-white text-xs">
            <img src="/logo-white.webp" alt="logo" width={30} height={30} />
          </div>
          <span className="font-semibold text-white text-sm">
            {profile.name.split(" ")[0]}
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="hover:bg-white/5 px-3 py-1.5 rounded-full text-[#aaa] hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="bg-bluegray-800 hover:bg-teal shadow-[0_0_0_rgba(115,161,177,0)] hover:shadow-[0_0_28px_rgba(115,161,177,0.28)] sm:ml-2 px-3 sm:px-4 py-1.5 border border-bluegray-600 hover:border-teal-light rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 font-medium text-bluegray-300 hover:text-white text-sm transition-all hover:-translate-y-0.5 duration-300"
          >
            Let's talk
          </a>

          <button
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="sm:hidden flex justify-center items-center bg-bluegray-900/80 hover:bg-bluegray-800 border border-bluegray-700 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 w-9 h-9 text-bluegray-300 hover:text-white transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4"
              fill="none"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M5 8H19M5 16H19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="sm:hidden top-[calc(100%+0.5rem)] right-0 absolute bg-[#0a0a0a]/95 shadow-2xl shadow-black/30 backdrop-blur-xl p-2 border border-white/10 rounded-2xl w-48"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="gap-1 grid">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="hover:bg-white/5 px-4 py-3 rounded-xl text-[#aaa] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
