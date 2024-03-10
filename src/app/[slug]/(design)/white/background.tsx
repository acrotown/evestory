"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Background() {
  let [isTopLeftLoaded, setIsTopLeftLoaded] = useState(false);
  let [isTopRightLoaded, setIsTopRightLoaded] = useState(false);
  let [isTopLoaded, setIsTopLoaded] = useState(false);
  let [isBottomLoaded, setIsBottomLoaded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -305 }}
        animate={{
          opacity: isTopLoaded ? 1 : 0,
          y: isTopLoaded ? 0 : -305,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="pointer-events-none absolute top-0 w-full"
      >
        <Image
          src="/_static/templates/standard/white/top.png"
          alt="Leaf top"
          priority
          width={400}
          height={300}
          onLoad={() => setIsTopLoaded(true)}
          className="pointer-events-none mx-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: isTopLeftLoaded ? 0.3 : 0,
          x: isTopLeftLoaded ? 0 : -100,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute left-0 top-0 opacity-30"
      >
        <Image
          src="/_static/templates/standard/white/top-left.png"
          alt="Leaf top left"
          priority
          width={250}
          height={250}
          onLoad={() => setIsTopLeftLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: isTopRightLoaded ? 0.3 : 0,
          x: isTopRightLoaded ? 0 : 100,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="pointer-events-none absolute right-0 top-0 opacity-30"
      >
        <Image
          src="/_static/templates/standard/white/top-right.png"
          alt="Leaf top right"
          priority
          width={250}
          height={250}
          onLoad={() => setIsTopRightLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 290 }}
        animate={{
          opacity: isBottomLoaded ? 0.3 : 0,
          y: isBottomLoaded ? 0 : 290,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        className="pointer-events-none absolute bottom-[4.5rem] right-0 opacity-30"
      >
        <Image
          src="/_static/templates/standard/white/bottom-right.png"
          alt="Leaf bottom right"
          priority
          width={250}
          height={250}
          onLoad={() => setIsBottomLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>
    </>
  );
}
