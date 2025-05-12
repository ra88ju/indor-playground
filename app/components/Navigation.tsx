"use client";

import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Restaurant", href: "/resturents" },
  { name: "Facilities", href: "/facilities" },
  { name: "Slot ", href: "/slot" },
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
  { name: "About", href: "/about" },
];

const restaurantItems = [
  { name: "Menu", href: "/resturents/menu", submenu: [
    { name: "Bangla Food", href: "/resturents/menu/bangla" },
    { name: "Chinese Food", href: "/resturents/menu/chinese" },
  ] },
  { name: "Book Table", href: "/resturents/book-table" },
  { name: "Offers", href: "/resturents/offers" },
];

const banglaFoodItems = [
  { name: "Bhuna Khichuri", href: "/resturents/menu/bangla/bhuna-khichuri" },
  { name: "Panta Ilish", href: "/resturents/menu/bangla/panta-ilish" },
  { name: "Morog Polao", href: "/resturents/menu/bangla/morog-polao" },
];
const chineseFoodItems = [
  { name: "Fried Rice", href: "/resturents/menu/chinese/fried-rice" },
  { name: "Chicken Chow Mein", href: "/resturents/menu/chinese/chow-mein" },
  { name: "Spring Roll", href: "/resturents/menu/chinese/spring-roll" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [restaurantDropdownOpen, setRestaurantDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [foodSubmenuOpen, setFoodSubmenuOpen] = useState("");

  return (
    <header className="fixed w-full bg-white/70 backdrop-blur-sm z-50 shadow-sm py-2">
      <nav className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-blue-600">Indoor Park Rjshahi</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) =>
              item.name === "Restaurant" ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setRestaurantDropdownOpen(true)}
                  onMouseLeave={() => { setRestaurantDropdownOpen(false); setMenuDropdownOpen(false); setFoodSubmenuOpen(""); }}
                >
                  <button
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1"
                  >
                    {item.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {restaurantDropdownOpen && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                      {restaurantItems.map((sub) =>
                        sub.submenu ? (
                          <div
                            key={sub.name}
                            className="relative group"
                            onMouseEnter={() => setMenuDropdownOpen(true)}
                            onMouseLeave={() => { setMenuDropdownOpen(false); setFoodSubmenuOpen(""); }}
                          >
                            <a
                              href={sub.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
                              onMouseEnter={() => setMenuDropdownOpen(true)}
                            >
                              {sub.name}
                              <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                            </a>
                            {menuDropdownOpen && (
                              <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                                {/* Bangla Food */}
                                <button
                                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
                                  onMouseEnter={() => setFoodSubmenuOpen("bangla")}
                                  onMouseLeave={() => setFoodSubmenuOpen("")}
                                  onClick={() => setFoodSubmenuOpen(foodSubmenuOpen === "bangla" ? "" : "bangla")}
                                  type="button"
                                >
                                  Bangla Food
                                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                {foodSubmenuOpen === "bangla" && (
                                  <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                                    {banglaFoodItems.map((item) => (
                                      <a
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                      >
                                        {item.name}
                                      </a>
                                    ))}
                                  </div>
                                )}
                                {/* Chinese Food */}
                                <button
                                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center justify-between"
                                  onMouseEnter={() => setFoodSubmenuOpen("chinese")}
                                  onMouseLeave={() => setFoodSubmenuOpen("")}
                                  onClick={() => setFoodSubmenuOpen(foodSubmenuOpen === "chinese" ? "" : "chinese")}
                                  type="button"
                                >
                                  Chinese Food
                                  <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                </button>
                                {foodSubmenuOpen === "chinese" && (
                                  <div className="absolute left-full top-0 ml-1 w-44 bg-white rounded-lg shadow-lg py-2 z-50 animate-fade-in">
                                    {chineseFoodItems.map((item) => (
                                      <a
                                        key={item.name}
                                        href={item.href}
                                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                      >
                                        {item.name}
                                      </a>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ) : (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                          >
                            {sub.name}
                          </a>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/booking"
              className="btn-primary text-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
        {/* Mobile menu */}
        <div className={`lg:hidden ${mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
          <div className="fixed inset-0 bg-gray-100" aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-blue-600">Indoor Park Rajshahi</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) =>
                    item.name === "Restaurant" ? (
                      <div key={item.name}>
                        <button
                          className="-mx-3 w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          onClick={() => setRestaurantDropdownOpen(!restaurantDropdownOpen)}
                          type="button"
                        >
                          {item.name}
                          <svg className={`w-4 h-4 ml-2 transition-transform ${restaurantDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {restaurantDropdownOpen && (
                          <div className="pl-4">
                            {restaurantItems.map((sub) =>
                              sub.submenu ? (
                                <div key={sub.name}>
                                  <button
                                    className="w-full flex items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                    onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                                    type="button"
                                  >
                                    {sub.name}
                                    <svg className={`w-3 h-3 ml-2 transition-transform ${menuDropdownOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                  </button>
                                  {menuDropdownOpen && (
                                    <div className="pl-4">
                                      <button
                                        className="w-full flex items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setFoodSubmenuOpen(foodSubmenuOpen === "bangla" ? "" : "bangla")}
                                        type="button"
                                      >
                                        Bangla Food
                                        <svg className={`w-3 h-3 ml-2 transition-transform ${foodSubmenuOpen === "bangla" ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                      </button>
                                      {foodSubmenuOpen === "bangla" && (
                                        <div className="pl-4">
                                          {banglaFoodItems.map((item) => (
                                            <Link
                                              key={item.name}
                                              href={item.href}
                                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                              onClick={() => setMobileMenuOpen(false)}
                                            >
                                              {item.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                      <button
                                        className="w-full flex items-center justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                        onClick={() => setFoodSubmenuOpen(foodSubmenuOpen === "chinese" ? "" : "chinese")}
                                        type="button"
                                      >
                                        Chinese Food
                                        <svg className={`w-3 h-3 ml-2 transition-transform ${foodSubmenuOpen === "chinese" ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                      </button>
                                      {foodSubmenuOpen === "chinese" && (
                                        <div className="pl-4">
                                          {chineseFoodItems.map((item) => (
                                            <Link
                                              key={item.name}
                                              href={item.href}
                                              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                              onClick={() => setMobileMenuOpen(false)}
                                            >
                                              {item.name}
                                            </Link>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-4 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  )}
                </div>
                <div className="py-6">
                  <Link
                    href="/booking"
                    className="btn-primary block text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
} 