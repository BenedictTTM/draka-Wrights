'use client';

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Hide navigation on admin and auth routes
  const isAdminRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/reports') || pathname.startsWith('/chat') || pathname.startsWith('/settings');
  const isAuthRoute = pathname.startsWith('/login');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { to: "/about-policy", label: "About" },
    { to: "/definitions", label: "Definitions" },
    { to: "/reporting", label: "Reporting" },
    { to: "/committee", label: "Committee" },
    { to: "/resources", label: "Resources" },
    { to: "/procedures", label: "Procedures" },
    { to: "/faq", label: "FAQ" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (isAdminRoute || isAuthRoute) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "pt-1" : "pt-0"}`}>
      <div
        className={`mx-auto transition-all duration-300 ${isScrolled ? "max-w-6xl" : "w-full"}`}>
        <nav
          className={`flex items-center justify-between px-4 md:px-6 py-3 md:py-4 transition-all duration-300 ${
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-sm border-b md:border md:rounded-full border-[var(--color-border)] py-2.5 md:py-2.5 mt-0 md:mt-2"
              : "bg-primary border-b border-primary-dark"
          }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
              isScrolled ? "bg-primary text-white" : "bg-accent text-primary-dark"
            }`}>
              UG
            </div>
            <span className={`font-semibold text-base md:text-lg tracking-tight ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              UG Policy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex items-center space-x-5 text-xs font-semibold uppercase tracking-[0.14em] ${
            isScrolled ? "text-textSecondary" : "text-white/80"
          }`}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={`transition-colors duration-200 ${
                  isScrolled ? "hover:text-primary" : "hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/reporting" className="inline-block">
              <button type="button" className={`text-xs font-semibold uppercase tracking-[0.1em] px-4 py-2 rounded-md flex items-center justify-center transition-colors shadow-sm ${
                isScrolled
                  ? "bg-primary text-white hover:bg-primary-dark"
                  : "bg-accent text-primary-dark hover:bg-accent-soft"
              }`}>
                Report Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-1 ${isScrolled ? "text-primary" : "text-white"}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            type="button"
          >
            {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-40" role="dialog" aria-modal="true">
            {/* backdrop - clicking closes */}
            <div
              className="absolute inset-0 bg-primary-dark/40 backdrop-blur-sm"
              onClick={closeMenu}
            />

            {/* panel */}
            <div className="absolute top-[72px] left-4 right-4 mx-auto max-w-md">
              <div
                className="bg-white rounded-xl shadow-xl p-5 border border-[var(--color-border)] transform transition duration-250"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Removing redundant X button as it is on the navbar */}

                <nav className="mt-1 flex flex-col uppercase tracking-[0.1em] font-semibold text-sm text-textSecondary">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      href={item.to}
                      onClick={closeMenu}
                      className="block py-3.5 px-3 rounded-lg text-center hover:bg-bgPrimary hover:text-primary transition"
                    >
                      {item.label}
                    </Link>
                  ))}

                  <Link href="/reporting" onClick={closeMenu} className="mt-5">
                    <button type="button" className="w-full bg-primary text-white px-4 py-3.5 rounded-lg uppercase flex justify-center font-semibold shadow-sm hover:bg-primary-dark transition-colors">
                      Report Now
                    </button>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;