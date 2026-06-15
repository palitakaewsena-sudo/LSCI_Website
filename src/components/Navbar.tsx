"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Menu, X, Activity } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Technology", href: "/technology" },
    { name: "Education", href: "/education" },
    { name: "Prototype Demo", href: "/prototype" },
    { name: "Device", href: "/device" },
    { name: "Company", href: "/company" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-card-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-tr from-sky-500 to-teal-400 text-white shadow-md neon-glow">
                <Activity className="w-6 h-6 animate-pulse-slow" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gradient">
                Zycel
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-primary-color font-semibold bg-sky-500/10 border-b-2 border-sky-500 rounded-b-none"
                      : "text-foreground/75 hover:text-foreground hover:bg-foreground/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Controls (Theme Toggle + Action Button) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-all duration-200"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Quick Demo CTA */}
            <Link
              href="/prototype"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Try Prototype
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-foreground/5 hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-all duration-200"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-foreground/5"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-card-border px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "text-primary-color bg-sky-500/10 font-semibold"
                    : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-card-border">
            <Link
              href="/prototype"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 rounded-lg shadow-md"
            >
              Try Prototype
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
