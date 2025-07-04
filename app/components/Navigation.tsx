"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Facilities", href: "/facilities" },
  { name: "Slot", href: "/slot" },
  { name: "Events", href: "/events" },
  { name: "Restaurant", href: "/resturents" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set active link based on current path
  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  // Click-away handler to close mobile menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-2 bg-white/95 shadow-lg backdrop-blur-lg' 
          : 'py-8 px-8 bg-white/80 backdrop-blur-sm'
      } left-0 right-0`}
    >
      <nav className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-14 items-center justify-between">
          <div className="flex-1 flex items-center justify-start">
            <Link 
              href="/" 
              className="group p-1.5 transition-transform duration-200 ease-out hover:scale-105"
            >
              <span className="font-extrabold text-blue-600 tracking-tight text-lg sm:text-xl lg:text-2xl group-hover:text-blue-700 transition-colors">
                Indoor Park
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-blue-100/80 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 transition-all"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-1 xl:gap-x-2 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-semibold transition-all text-sm lg:text-base xl:text-lg px-3 xl:px-4 py-2 rounded-lg group ${activeLink === item.href ? 'text-blue-600 bg-blue-50' : 'text-gray-900 hover:text-blue-600 hover:bg-blue-50'}`}
                onClick={() => setActiveLink(item.href)}
              >
                <span className="relative z-10">{item.name}</span>
                <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-blue-600 transform origin-left transition-transform ${activeLink === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
            <Link
              href="/booking"
              className="ml-4 btn-primary text-sm lg:text-base xl:text-lg px-5 py-2.5 xl:px-6 hover:scale-105 active:scale-100 transition-all shadow-md hover:shadow-lg"
            >
              Book Now
            </Link>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div 
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-0 z-50 backdrop-blur-lg transition-all duration-300 ease-in-out ${
            mobileMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible pointer-events-none'
          }`}
        >
          <div 
            className={`absolute inset-0 bg-gradient-to-b from-blue-900/95 to-black/95 transition-opacity duration-500 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className={`relative flex flex-col w-full h-full pt-6 pb-6 px-6 overflow-y-auto transform transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}>
            <div className="flex items-center justify-between pb-8">
              <Link 
                href="/" 
                className="p-1.5 group transition-transform duration-200 ease-out hover:scale-105" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="font-extrabold text-white tracking-tight text-xl sm:text-2xl lg:text-3xl group-hover:text-blue-400 transition-colors">
                  Indoor Park
                </span>
              </Link>
              <button
                type="button"
                className="rounded-full p-2.5 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20 active:scale-95 transition-all"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
              </button>
            </div>
            <div className="flex flex-col w-full space-y-2 mt-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transform transition-all duration-300 delay-[${index * 50}ms] ${
                    mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                  } block w-full text-left py-4 text-base sm:text-lg font-semibold ${activeLink === item.href ? 'text-white bg-white/10' : 'text-white/90 hover:text-white hover:bg-white/5'} border-b border-white/10 hover:border-white/20 rounded-lg px-4 backdrop-blur-sm`}
                  onClick={() => {
                     setActiveLink(item.href);
                     setMobileMenuOpen(false);
                   }}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="w-full mt-auto pt-8 pb-4 shrink-0">
              <Link
                href="/booking"
                className={`transform transition-all duration-300 delay-[800ms] ${
                  mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                } block w-full text-center text-base sm:text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 px-6 py-4 rounded-xl active:scale-95 shadow-lg hover:shadow-xl transition-all`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}