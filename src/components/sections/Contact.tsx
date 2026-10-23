import { FormEvent, ReactNode, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../../data/profile";
import { socials } from "../../data/socials";
import { linkedInIcon } from "../../lib/icons";
import { ArrowIcon } from "../ui/ArrowIcon";
import { SectionLabel } from "../ui/SectionLabel";

type Status = "idle" | "sending" | "success" | "error";

const strokeIcon = (d: string) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const brandIcon = (path: string) => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

const socialUrl = (id: string) => socials.find((s) => s.id === id);

const contactItems: {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
}[] = [
  {
    label: "Email me",
    value: profile.email,
    href: socialUrl("email")?.url ?? `mailto:${profile.email}`,
    icon: strokeIcon(
      "M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm-.5 1 8.5 6 8.5-6",
    ),
  },
  {
    label: "LinkedIn",
    value: socialUrl("linkedin")?.displayHandle ?? "",
    href: socialUrl("linkedin")?.url ?? "",
    icon: brandIcon(linkedInIcon.path),
  },
];

const fieldClass =
  "w-full bg-bluegray-900/60 backdrop-blur-sm px-4 py-3 border border-bluegray-700 focus:border-teal-light rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-light/30 text-white text-sm placeholder:text-bluegray-600 transition-colors";

export function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", import.meta.env.VITE_WEB3FORMS_KEY);
    data.append("subject", `New portfolio message from ${data.get("name")}`);
    data.append("from_name", "Portfolio Contact");

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
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
      className="relative px-6 md:px-12 lg:px-20 pb-28 md:pb-40 overflow-hidden"
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
        className="z-10 relative mx-auto max-w-7xl"
        style={{ y: textY }}
      >
        <SectionLabel text="Contact" />

        <div className="gap-12 lg:gap-20 grid lg:grid-cols-2">
          <div className="flex flex-col">
            <motion.h2
              className="mb-6 text-headline text-white"
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
            >
              Get in touch
            </motion.h2>

            <motion.p
              className="mb-10 text-bluegray-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Got an idea, an opportunity, a collaboration, or just want to
              connect? <br />
              Send me a message. I’d love to hear from you.
            </motion.p>

            {/* Contact cards, pinned to the bottom to line up with the form */}
            <ul className="flex flex-col gap-3 mt-auto">
              {contactItems.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-card/80 hover:bg-card-hover backdrop-blur-sm p-4 border border-border-subtle hover:border-teal/40 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 transition-colors"
                  >
                    <span className="flex justify-center items-center bg-bluegray-950/80 border border-border-subtle group-hover:border-teal/50 rounded-xl w-12 h-12 text-bluegray-300 group-hover:text-teal-light transition-colors shrink-0">
                      {item.icon}
                    </span>
                    <span className="flex flex-col min-w-0">
                      <span className="font-medium text-white text-sm">
                        {item.label}
                      </span>
                      <span className="text-bluegray-400 text-sm truncate">
                        {item.value}
                      </span>
                    </span>
                    <span className="flex justify-center items-center bg-white/5 group-hover:bg-teal ml-auto rounded-full w-8 h-8 text-bluegray-300 group-hover:text-white transition-colors shrink-0">
                      <ArrowIcon />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Honeypot: hidden from people, filled in by spam bots */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="gap-4 grid sm:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-bluegray-400 text-xs uppercase tracking-wider">
                  Name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={fieldClass}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-bluegray-400 text-xs uppercase tracking-wider">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </label>
            </div>

            {/* Grows so the form matches the left column's height */}
            <label className="flex flex-col flex-1 gap-2">
              <span className="font-mono text-bluegray-400 text-xs uppercase tracking-wider">
                Message
              </span>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Tell me about your project..."
                className={`${fieldClass} flex-1 resize-none`}
              />
            </label>

            <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mt-2">
              <p
                role="status"
                aria-live="polite"
                className={`text-sm ${
                  status === "error" ? "text-red-400" : "text-teal-light"
                }`}
              >
                {status === "success" && "Thanks! Your message is on its way."}
                {status === "error" && (
                  <>
                    Something went wrong. Please email me at{" "}
                    <a href={`mailto:${profile.email}`} className="underline">
                      {profile.email}
                    </a>
                    .
                  </>
                )}
              </p>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex justify-center items-center gap-3 bg-bluegray-900/75 hover:bg-teal disabled:opacity-60 shadow-[0_0_0_rgba(115,161,177,0)] hover:shadow-[0_0_36px_rgba(115,161,177,0.32)] backdrop-blur-sm px-7 py-3.5 border border-bluegray-700 hover:border-teal-light rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-light/70 font-medium text-bluegray-300 hover:text-white text-sm transition-all duration-300 disabled:cursor-not-allowed shrink-0"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status === "sending" ? "Sending..." : "Send message"}
                <motion.span
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowIcon />
                </motion.span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
