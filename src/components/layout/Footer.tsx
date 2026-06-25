import { motion } from "framer-motion";
import { profile } from "../../data/profile";
import { socials } from "../../data/socials";
import { ArrowIcon } from "../ui/ArrowIcon";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="px-6 md:px-12 lg:px-20 pt-14 pb-10 border-[#1a1a1a] border-t">
      <div className="mx-auto max-w-7xl">
        <div className="gap-12 grid grid-cols-1 md:grid-cols-3 mb-16">
          {/* Currently */}
          <div>
            <p className="mb-6 text-label">/ Currently</p>
            <div className="flex items-center gap-2.5">
              <motion.span
                className="inline-block bg-[#7a9fa0] rounded-full w-2 h-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="font-semibold text-white text-lg">
                {profile.availability}
              </span>
            </div>
          </div>

          {/* Elsewhere */}
          <div>
            <p className="mb-6 text-label">/ Elsewhere</p>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.url}
                    target={social.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      social.url.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className="group flex items-center gap-2 text-[#888] hover:text-white transition-colors duration-200"
                  >
                    <span className="w-16 text-[#555] text-sm shrink-0">
                      {social.platform}
                    </span>
                    <span className="text-sm">{social.displayHandle}</span>
                    <span className="opacity-0 group-hover:opacity-100 ml-0.5 transition-opacity duration-200">
                      <ArrowIcon />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigate */}
          <div>
            <p className="mb-6 text-label">/ Navigate</p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-[#888] hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4 pt-8 border-[#1a1a1a] border-t">
          <p className="font-mono text-[#444] text-xs">
            © {profile.year} {profile.name}. All rights reserved.
          </p>
          <p className="text-[#444] text-label">
            / Creating since {profile.createdSince}
          </p>
        </div>
      </div>
    </footer>
  );
}
