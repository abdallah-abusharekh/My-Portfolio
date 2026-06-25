import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Toolkit } from "./components/sections/Toolkit";
import { Work } from "./components/sections/Work";
import { Experience } from "./components/sections/Experience";
import { Services } from "./components/sections/Services";
import { Contact } from "./components/sections/Contact";
import { profile } from "./data/profile";

function Intro() {
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"],
  });

  const imageY = useTransform(scrollYProgress, [0, 0.45, 1], [0, -32, -32]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    [1, 0.92, 0.92],
  );
  const imageRotate = useTransform(
    scrollYProgress,
    [0, 0.75, 1],
    [0, 180, 180],
  );
  const imageYSpring = useSpring(imageY, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const imageScaleSpring = useSpring(imageScale, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const imageRotateSpring = useSpring(imageRotate, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div ref={introRef} className="relative">
      <div className="hidden lg:block top-0 bottom-0 z-30 absolute inset-x-0 pointer-events-none">
        <div className="top-0 sticky flex justify-center items-end pb-12 h-screen">
          <motion.div
            initial={{ opacity: 0, y: 84 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.15, delay: 0.65, ease: [0.215, 0.61, 0.355, 1.0] }}
          >
            <motion.div
              className="relative w-28 sm:w-36 md:w-44 lg:w-[200px] aspect-square"
              style={{
                y: imageYSpring,
                scale: imageScaleSpring,
                rotateY: imageRotateSpring,
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="/abdallah-dark.jpg"
                alt={profile.name}
                className="block absolute inset-0 shadow-2xl shadow-black/40 rounded-2xl w-full h-full object-cover [backface-visibility:hidden]"
              />
              <img
                src="/abdallah.png"
                alt={profile.name}
                className="block absolute inset-0 shadow-2xl shadow-black/40 rounded-2xl w-full h-full object-cover [backface-visibility:hidden] [transform:rotateY(180deg)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Hero />
      <About />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      <main>
        <Intro />
        <Toolkit />
        <Work />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
