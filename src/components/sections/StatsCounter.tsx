"use client";

import { useEffect, useState, useRef } from "react";
import { Car, Users, Award } from "lucide-react";

interface Stat {
  icon: typeof Car;
  value: number;
  suffix: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: Car,
    value: 2500,
    suffix: "+",
    label: "Courses réalisées",
    color: "text-gold-400",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Clients satisfaits",
    color: "text-green-400",
  },
  {
    icon: Award,
    value: 15,
    suffix: " ans",
    label: "D'expérience",
    color: "text-blue-400",
  },
];

function useCountUp(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatCard({ stat, isVisible }: { stat: Stat; isVisible: boolean }) {
  const count = useCountUp(stat.value, 2000, isVisible);

  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center">
        <stat.icon className={`w-8 h-8 ${stat.color}`} />
      </div>
      <div className="mb-2">
        <span className="text-4xl md:text-5xl font-bold text-white">
          {count.toLocaleString("fr-FR")}
        </span>
        <span className="text-2xl md:text-3xl font-bold text-gold-400">
          {stat.suffix}
        </span>
      </div>
      <p className="text-gray-400">{stat.label}</p>
    </div>
  );
}

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 bg-gradient-to-b from-black to-black-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            La confiance de nos{" "}
            <span className="text-gold-gradient">clients</span>
          </h2>
          <div className="divider-gold" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
