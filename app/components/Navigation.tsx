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
    <header className="fixed w-full bg-white z-50 shadow-sm py-2">
      <nav className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
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
        <div className={`lg:hidden fixed inset-0 z-50 bg-white transition-transform duration-300 ${mobileMenuOpen ? '' : 'hidden'}`}>
          <div className="flex flex-col h-full w-full items-center justify-center gap-8">
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
                className="text-2xl font-semibold text-gray-800 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-8 text-xl font-bold text-white bg-blue-600 px-8 py-3 rounded-lg shadow hover:bg-blue-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 