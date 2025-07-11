import { HeroHighlight, Highlight } from "@packages/shadcn/hero-highlight";
import { motion } from "npm:framer-motion@^12.23.3";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
          This site is under{" "}
          <Highlight className="text-black dark:text-white">
            construction
          </Highlight>
          <br />
          It will be{" "}
          <Highlight className="text-black dark:text-white">live</Highlight>
          very soon!
        </motion.h1>
      </HeroHighlight>
    </div>
  );
};
export default Home;
