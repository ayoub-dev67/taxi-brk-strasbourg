"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "gold";
}

export function Skeleton({ className, variant = "default" }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg",
        variant === "gold" ? "skeleton-gold" : "skeleton",
        className
      )}
    />
  );
}

export function SkeletonCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-400/10 bg-black-50 p-6",
        className
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function SkeletonServiceCard({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-400/10 bg-black-50 p-6 text-center",
        className
      )}
    >
      <Skeleton className="w-14 h-14 rounded-xl mx-auto mb-4" />
      <Skeleton className="h-6 w-2/3 mx-auto mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mx-auto" />
    </div>
  );
}

export function SkeletonTestimonial({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-400/10 bg-black-50 p-6",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-5 w-24 mb-1" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function SkeletonMap({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-400/20 bg-black-50 overflow-hidden relative",
        className
      )}
    >
      <Skeleton className="w-full h-full absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-gold-400/30 border-t-gold-400 animate-spin" />
          <span className="text-gray-500 text-sm">Chargement de la carte...</span>
        </div>
      </div>
    </div>
  );
}

export function SkeletonPrice({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gold-400/20 bg-gradient-to-br from-gold-400/5 to-transparent p-6",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-14" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gold-400/20">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonButton({ className }: SkeletonProps) {
  return <Skeleton className={cn("h-12 rounded-full", className)} />;
}

export function SkeletonText({ className, lines = 3 }: SkeletonProps & { lines?: number }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-3/4" : "w-full")}
        />
      ))}
    </div>
  );
}
