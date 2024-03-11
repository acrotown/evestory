"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import left from "#/public/_static/templates/standard/white/left.png";
import right from "#/public/_static/templates/standard/white/right.png";

export function Background() {
  let [isLeftLoaded, setIsLeftLoaded] = useState(false);
  let [isRightLoaded, setIsRightLoaded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{
          opacity: isLeftLoaded ? 1 : 0,
          x: isLeftLoaded ? 0 : -100,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute bottom-20 left-0"
      >
        <Image
          src={left}
          alt="Leaf left"
          priority
          width={250}
          height={250}
          onLoad={() => setIsLeftLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: isRightLoaded ? 1 : 0,
          x: isRightLoaded ? 0 : 100,
        }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="pointer-events-none absolute right-0 top-14"
      >
        <Image
          src={right}
          alt="Leaf right"
          priority
          width={250}
          height={250}
          onLoad={() => setIsRightLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>
    </>
  );
}
