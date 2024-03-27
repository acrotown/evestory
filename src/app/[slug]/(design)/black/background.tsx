"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Background() {
  let [isTopLeftLoaded, setIsTopLeftLoaded] = useState(false);

  let [isBottomLoaded, setIsBottomLoaded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          opacity: isTopLeftLoaded ? 1 : 0,
          y: isTopLeftLoaded ? 0 : -100,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute left-6 top-6 opacity-30"
      >
        <Image
          src="/_static/templates/standard/black/top-left.png"
          alt="Flower top left"
          priority
          width={250}
          height={250}
          onLoad={() => setIsTopLeftLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 290 }}
        animate={{
          opacity: isBottomLoaded ? 1 : 0,
          y: isBottomLoaded ? 0 : 290,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        className="pointer-events-none absolute bottom-[4.5rem] right-6 opacity-30"
      >
        <Image
          src="/_static/templates/standard/black/bottom-right.png"
          alt="Flower bototom right"
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
