import { motion } from "framer-motion";
import { SectionLabel } from "../ui/SectionLabel";
import { profile } from "../../data/profile";

const DotIcon = () => (
  <span className="inline-block bg-[#4a7a7c] mt-1 mr-2 rounded-full w-1.5 h-1.5 shrink-0" />
);

export function Services() {
  return (
    <section id="services" className="px-6 md:px-12 lg:px-20 pb-28 md:pb-40">
      <div className="mx-auto max-w-7xl">
        <SectionLabel text="Services" />

        <motion.h2
          className="mb-14 text-headline text-white"
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
        >
          What I can help with.
        </motion.h2>

        <div className="gap-5 grid grid-cols-1 md:grid-cols-3">
          {profile.services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group relative flex flex-col gap-5 p-7 overflow-hidden card-base"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.215, 0.61, 0.355, 1.0],
              }}
              whileHover={{
                borderColor: "#2a2a2a",
                backgroundColor: "#181818",
                y: -4,
              }}
            >
              <div className="top-[-5rem] right-[-5rem] absolute bg-[radial-gradient(circle_at_center,_rgba(115,161,177,0.28)_0%,_rgba(155,194,207,0.12)_34%,_transparent_68%)] blur-lg rounded-full w-56 h-56 opacity-0 transition-all translate-x-8 -translate-y-8 scale-75 duration-500 ease-out pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100" />

              {/* Number */}
              <span className="z-10 relative text-[#444] group-hover:text-bluegray-400 text-label transition-colors duration-300">
                {service.number}
              </span>

              {/* Title */}
              <h3 className="z-10 relative font-bold text-white text-xl leading-tight">
                {service.title}
              </h3>

              {/* Description */}
              <p className="z-10 relative text-[#666] group-hover:text-bluegray-400 text-sm leading-relaxed transition-colors duration-300">
                {service.description}
              </p>

              {/* Features */}
              <ul className="z-10 relative space-y-2 mt-auto pt-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start text-[#777] group-hover:text-bluegray-300 text-sm transition-colors duration-300"
                  >
                    <DotIcon />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
