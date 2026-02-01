"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  iconRotate?: boolean;
}

export function PremiumCard({
  children,
  className = "",
  hoverEffect = true,
  glowOnHover = true,
}: PremiumCardProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || !hoverEffect) {
    return (
      <div className={cn("card-premium", className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "card-premium relative overflow-hidden group",
        glowOnHover && "hover-glow",
        className
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Bordure animée au hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(212, 175, 55, 0.3), transparent 50%, rgba(212, 175, 55, 0.1))",
        }}
      />

      {/* Shimmer au hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  className = "",
}: ServiceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "card-premium relative overflow-hidden group text-center",
        className
      )}
      whileHover={!prefersReducedMotion ? { scale: 1.02, y: -4 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-gold-400/10 to-transparent rounded-2xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-gold-400/5 blur-2xl" />
      </div>

      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl border border-gold-400/10 group-hover:border-gold-400/40 transition-colors duration-300" />

      {/* Icon with rotation */}
      <motion.div
        className="w-14 h-14 rounded-xl bg-gold-400/10 flex items-center justify-center mx-auto mb-4 relative z-10"
        whileHover={!prefersReducedMotion ? { rotate: 6 } : {}}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="text-gold-400"
          whileHover={!prefersReducedMotion ? { scale: 1.1 } : {}}
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 relative z-10 group-hover:text-gold-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-400 text-sm relative z-10">{description}</p>

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </motion.div>
  );
}

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  date?: string;
  className?: string;
}

export function TestimonialCard({
  name,
  rating,
  comment,
  date,
  className = "",
}: TestimonialCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "card-premium relative overflow-hidden group",
        className
      )}
      whileHover={!prefersReducedMotion ? { scale: 1.01 } : {}}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-400/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.svg
            key={i}
            className={`w-4 h-4 ${i < rating ? "text-gold-400" : "text-gray-600"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={!prefersReducedMotion ? { opacity: 0, scale: 0 } : {}}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>

      {/* Comment */}
      <p className="text-gray-300 text-sm mb-4 relative z-10">&ldquo;{comment}&rdquo;</p>

      {/* Author */}
      <div className="flex items-center justify-between relative z-10">
        <span className="text-white font-medium">{name}</span>
        {date && <span className="text-gray-500 text-xs">{date}</span>}
      </div>
    </motion.div>
  );
}
