"use client";

import { useInView } from "@/hooks/useInView";
import { ReactNode } from "react";

interface StaggeredAnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const StaggeredAnimation = ({
  children,
  className = "",
  delay = 0,
}: StaggeredAnimationProps) => {
  const [ref, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  const delayStyle = delay > 0 ? { transitionDelay: `${delay}ms` } : {};

  return (
    <div
      ref={ref}
      className={`stagger-animation ${isInView ? "in-view" : ""} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  );
};
