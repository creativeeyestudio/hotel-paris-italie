// components/CurtainReveal.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface CurtainRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  color?: string;
  direction?: "left" | "right" | "top" | "bottom";
  className?: string;
}

export const CurtainReveal = ({
  children,
  delay = 0.2,
  duration = 1,
  color,
  direction = "left",
  className = "",
}: CurtainRevealProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("reveal");
    } else {
      controls.start("initial");
    }
  }, [inView, controls]);

  const directionValue =
    direction === "left"
      ? "-100%"
      : direction === "right"
        ? "100%"
        : direction === "top"
          ? "-100%"
          : "100%";

  const curtainVariants: Variants = {
    initial: {
      x: 0,
      y: 0,
    },
    reveal: {
      x: direction === "left" || direction === "right" ? directionValue : 0,
      y: direction === "top" || direction === "bottom" ? directionValue : 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div ref={ref} className={`relative overflow-y-hidden ${className}`}>
      <motion.div
        className="absolute top-0 left-0 w-full h-full z-20"
        style={{ backgroundColor: color }}
        initial="initial"
        animate={controls}
        variants={curtainVariants}
      />
      <div className="relative z-10 py-1">{children}</div>
    </div>
  );
};
