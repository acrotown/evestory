"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import background from "#/public/_static/templates/premium/ivory/background.png";
import flowerBottomLeft from "#/public/_static/templates/premium/ivory/flower-bottom-left.png";
import flowerBottomRight from "#/public/_static/templates/premium/ivory/flower-bottom-right.png";
import flowerTop from "#/public/_static/templates/premium/ivory/flower-top.png";
import flowerTopLeft from "#/public/_static/templates/premium/ivory/flower-top-left.png";
import flowerTopRight from "#/public/_static/templates/premium/ivory/flower-top-right.png";

export function Background() {
  let [isTopLeftLoaded, setIsTopLeftLoaded] = useState(false);
  let [isTopRightLoaded, setIsTopRightLoaded] = useState(false);
  let [isTopLoaded, setIsTopLoaded] = useState(false);
  let [isBottomRightLoaded, setIsBottomRightLoaded] = useState(false);
  let [isBottomLeftLoaded, setIsBottomLeftLoaded] = useState(false);

  return (
    <>
      <Image
        src={background}
        fill
        sizes="100vw"
        placeholder="blur"
        quality={100}
        alt="Background"
        className="pointer-events-none absolute"
      />

      <motion.div
        initial={{ opacity: 0, y: -205 }}
        animate={{
          opacity: isTopLoaded ? 1 : 0,
          y: isTopLoaded ? 0 : -205,
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 1.8,
        }}
        className="pointer-events-none absolute top-0 z-10 w-full"
      >
        <Image
          src={flowerTop}
          alt="Flower top"
          priority
          width={400}
          height={400}
          onLoad={() => setIsTopLoaded(true)}
          className="pointer-events-none mx-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: isTopLoaded ? 1 : 0,
          scale: isTopLoaded ? 1 : 0,
        }}
        transition={{
          type: "spring",
          damping: 20,
        }}
        className="pointer-events-none absolute left-0 top-32"
      >
        <Image
          src="/_static/templates/premium/ivory/star.png"
          alt="Star"
          priority
          width={200}
          height={200}
          onLoad={() => setIsTopLoaded(true)}
          className="pointer-events-none mx-auto"
        />
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          x: "-100%",
          y: "-100%",
        }}
        animate={{
          opacity: isTopLeftLoaded ? 1 : 0,
          x: isTopLeftLoaded ? 0 : "-100%",
          y: isTopLeftLoaded ? 0 : "-100%",
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 1.8,
        }}
        className="pointer-events-none absolute left-0 top-0"
      >
        <Image
          src={flowerTopLeft}
          alt="Leaf top left"
          priority
          width={250}
          height={250}
          style={{
            width: "100%",
            height: "auto",
          }}
          onLoad={() => setIsTopLeftLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: "-100%", x: "100%" }}
        animate={{
          opacity: isBottomLeftLoaded ? 1 : 0,
          y: isBottomLeftLoaded ? 0 : "-100%",
          x: isBottomLeftLoaded ? 0 : "100%",
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 1.8,
        }}
        className="pointer-events-none absolute right-0 top-0"
      >
        <Image
          src={flowerTopRight}
          alt="Flower top right"
          priority
          width={250}
          height={250}
          style={{
            width: "100%",
            height: "auto",
          }}
          onLoad={() => setIsTopRightLoaded(true)}
          className="pointer-events-none"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: "100%", x: "-100%" }}
        animate={{
          opacity: isBottomLeftLoaded ? 1 : 0,
          y: isBottomLeftLoaded ? 0 : "100%",
          x: isBottomLeftLoaded ? 0 : "-100%",
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 1.8,
        }}
        className="pointer-events-none absolute bottom-[4.5rem] left-0"
      >
        <Image
          src={flowerBottomLeft}
          alt="Flower bottom left"
          priority
          width={100}
          height={100}
          onLoad={() => setIsBottomLeftLoaded(true)}
          className="pointer-events-none h-auto w-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: "100%", x: "100%" }}
        animate={{
          opacity: isBottomLeftLoaded ? 1 : 0,
          y: isBottomLeftLoaded ? 0 : "100%",
          x: isBottomLeftLoaded ? 0 : "100%",
        }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 1.8,
        }}
        className="pointer-events-none absolute bottom-[4.5rem] right-0"
      >
        <Image
          src={flowerBottomRight}
          alt="Flower bottom right"
          priority
          width={100}
          height={100}
          onLoad={() => setIsBottomRightLoaded(true)}
          className="pointer-events-none h-auto w-full"
        />
      </motion.div>
    </>
  );
}
