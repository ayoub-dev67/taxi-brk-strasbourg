"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Calendar, Car, CreditCard, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/reservation", icon: Calendar, label: "Réserver" },
  { href: "/services", icon: Car, label: "Services" },
  { href: "/tarifs", icon: CreditCard, label: "Tarifs" },
  { href: "/contact", icon: Phone, label: "Contact" },
];

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className="nav-mobile-sticky lg:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative touch-target flex flex-col items-center justify-center gap-1",
                "transition-colors duration-200",
                isActive
                  ? "text-gold-400"
                  : "text-gray-400 active:text-gold-400"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>

              {/* Indicateur actif */}
              {isActive && (
                <motion.div
                  layoutId="mobileNavIndicator"
                  className="absolute -top-0.5 w-8 h-0.5 bg-gold-400 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
