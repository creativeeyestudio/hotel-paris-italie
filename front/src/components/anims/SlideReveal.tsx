// components/SlideReveal.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface SlideRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: "left" | "right" | "top" | "bottom";
  offset?: number | string;
  className?: string;
}

export const SlideReveal = ({
  children,
  delay = 0.2,
  duration = 0.6,
  direction = "bottom",
  offset = -100,
  className = "",
}: SlideRevealProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start("reveal");
    } else {
      controls.start("initial");
    }
  }, [inView, controls]);

  const isHorizontal = direction === "left" || direction === "right";
  const fromValue =
    direction === "left" || direction === "top" ? `-${offset}` : `${offset}`;

  const slideVariants: Variants = {
    initial: {
      opacity: 0,
      x: isHorizontal ? fromValue : 0,
      y: isHorizontal ? 0 : fromValue,
    },
    reveal: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={controls}
      variants={slideVariants}
    >
      {children}
    </motion.div>
  );
};
