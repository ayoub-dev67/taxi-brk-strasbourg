"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { siteConfig, navigationLinks, servicesLinks } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-black/95 backdrop-blur-lg border-b border-gold-400/20 py-3"
            : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="TAXI BRK - Taxi conventionné Strasbourg"
                width={150}
                height={50}
                priority
                className="h-10 sm:h-12 w-auto"
              />
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navigationLinks.map((link) => {
                const isActive = pathname === link.href;
                const isServices = link.href === "/services";

                if (isServices) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "flex items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200",
                          isActive || pathname.startsWith("/services")
                            ? "text-gold-400"
                            : "text-white/80 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-200",
                            isServicesOpen && "rotate-180"
                          )}
                        />
                      </Link>

                      {/* Dropdown Services */}
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-64 bg-black-50 border border-gold-400/20 rounded-xl shadow-dark overflow-hidden"
                          >
                            {servicesLinks.map((service) => (
                              <Link
                                key={service.href}
                                href={service.href}
                                className={cn(
                                  "block px-4 py-3 transition-all duration-200",
                                  pathname === service.href
                                    ? "bg-gold-400/10 text-gold-400"
                                    : "text-white/80 hover:text-white hover:bg-white/5"
                                )}
                              >
                                {service.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "text-gold-400"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${siteConfig.contact.phoneLink}`}
                className="flex items-center gap-2 text-white/80 hover:text-gold-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="font-medium">{siteConfig.contact.phone}</span>
              </a>
              <Link href="/reservation" className="btn-gold">
                Réserver
              </Link>
            </div>

            {/* Menu Button Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden touch-target text-white"
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile Fullscreen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black lg:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gold-400/20">
              <span className="text-gold-400 font-heading text-xl">Menu</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="touch-target text-white"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <nav className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-180px)]">
              {navigationLinks.map((link, index) => {
                const isActive = pathname === link.href;
                const isServices = link.href === "/services";

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-lg transition-colors duration-200",
                        isActive
                          ? "bg-gold-400/10 text-gold-400 border border-gold-400/30"
                          : "text-white active:bg-white/5"
                      )}
                    >
                      <span className="font-medium">{link.label}</span>
                    </Link>

                    {/* Sous-menu Services */}
                    {isServices && (
                      <div className="ml-4 mt-2 space-y-1">
                        {servicesLinks.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                              "block p-3 pl-6 rounded-lg text-sm transition-colors duration-200",
                              pathname === service.href
                                ? "text-gold-400"
                                : "text-white/60 active:text-white"
                            )}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Contact rapide */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold-400/20 pb-safe bg-black">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.phoneLink}`}
                  className="btn-gold-outline flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Appeler
                </a>
                <Link
                  href="/reservation"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-gold flex items-center justify-center gap-2"
                >
                  Réserver
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
