"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode, useState } from "react";
import Link from "next/link";

interface AnimatedButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "pulse";
  type?: "button" | "submit";
  disabled?: boolean;
}

export function AnimatedButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
}: AnimatedButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (prefersReducedMotion) {
      onClick?.();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  const baseClasses = `
    relative overflow-hidden inline-flex items-center justify-center gap-2
    font-semibold transition-all duration-300
    ${variant === "primary" ? "btn-gold" : ""}
    ${variant === "outline" ? "btn-gold-outline" : ""}
    ${variant === "pulse" ? "btn-gold animate-button-pulse" : ""}
    ${className}
  `;

  const content = (
    <>
      {/* Shimmer effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ translateX: ["−100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{ left: ripple.x, top: ripple.y }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 300, height: 300, opacity: 0, x: -150, y: -150 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={handleClick}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={baseClasses}
      onClick={handleClick}
      whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
    >
      {content}
    </motion.button>
  );
}

// Bouton CTA avec effet pulse permanent
export function PulseButton({
  children,
  href,
  onClick,
  className = "",
}: Omit<AnimatedButtonProps, "variant">) {
  const prefersReducedMotion = useReducedMotion();

  const buttonContent = (
    <motion.span
      className={`relative inline-flex items-center justify-center gap-2 btn-gold ${className}`}
      whileHover={!prefersReducedMotion ? { scale: 1.05 } : {}}
      whileTap={!prefersReducedMotion ? { scale: 0.98 } : {}}
    >
      {/* Pulse ring */}
      {!prefersReducedMotion && (
        <>
          <span className="absolute inset-0 rounded-full animate-ping-slow bg-gold-400/30" />
          <motion.span
            className="absolute inset-0 rounded-full bg-gold-400/20"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Glow effect */}
      {!prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-full blur-md bg-gold-400/30"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.span>
  );

  if (href) {
    return <Link href={href} onClick={onClick}>{buttonContent}</Link>;
  }

  return (
    <button type="button" onClick={onClick}>
      {buttonContent}
    </button>
  );
}
