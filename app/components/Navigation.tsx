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
  const [restaurantDropdownOpen, setRestaurantDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [foodSubmenuOpen, setFoodSubmenuOpen] = useState("");
  const restaurantRef = useRef<HTMLDivElement>(null);

  // Click-away handler to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (restaurantRef.current && !restaurantRef.current.contains(event.target as Node)) {
        setRestaurantDropdownOpen(false);
        setMenuDropdownOpen(false);
        setFoodSubmenuOpen("");
      }
    }
    if (restaurantDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [restaurantDropdownOpen]);

  return (
    <header className="fixed w-full z-50 shadow-sm py-2 bg-white/90 backdrop-blur-sm top-1 left-0 right-0 max-w-screen-xl mx-auto rounded-xl">
      <nav className="w-full px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-14 items-center justify-between">
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="p-1.5">
              <span className="font-extrabold text-blue-600 tracking-tight text-xl">Indoor Park</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-7 w-7" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-10 xl:gap-x-14">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors text-base xl:text-lg px-2 xl:px-4 py-1 rounded-lg hover:bg-blue-50"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex flex-1 justify-end">
            <Link
              href="/booking"
              className="btn-primary text-base xl:text-lg px-6 py-2"
            >
              Book Now
            </Link>
          </div>
        </div>
        {/* Simple Mobile menu */}
        <div className={`lg:hidden fixed inset-0 z-50 bg-black transition-transform duration-300 ${mobileMenuOpen ? '' : 'translate-x-full'}`}>
          <div className="flex flex-col w-full h-screen items-start pt-16 pb-8 px-8 overflow-y-auto">
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full p-2 text-gray-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="h-8 w-8" aria-hidden="true" />
            </button>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block w-full text-left py-3 text-xl font-semibold text-white hover:text-blue-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="w-full mt-auto pt-8 pb-4 shrink-0">
              <Link
                href="/booking"
                className="block w-full text-center text-lg font-bold text-white border-2 border-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition-colors"
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