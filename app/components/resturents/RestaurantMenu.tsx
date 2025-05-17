import Link from "next/link";
import React from "react";

// Restaurant items data
const restaurantItems = [
  { name: "Menu", icon: "📜", submenu: [
    { name: "Bangla Food", icon: "🍛", items: [
      { name: "Bhuna Khichuri", href: "/resturents/menu/bangla/bhuna-khichuri" },
      { name: "Panta Ilish", href: "/resturents/menu/bangla/panta-ilish" },
      { name: "Morog Polao", href: "/resturents/menu/bangla/morog-polao" },
    ] },
    { name: "Chinese Food", icon: "🥡", items: [
      { name: "Fried Rice", href: "/resturents/menu/chinese/fried-rice" },
      { name: "Chicken Chow Mein", href: "/resturents/menu/chinese/chow-mein" },
      { name: "Spring Roll", href: "/resturents/menu/chinese/spring-roll" },
    ] },
  ] },
  { name: "Book Table", icon: "🪑", href: "/resturents/book-table" },
  { name: "Offers", icon: "🎉", href: "/resturents/offers" },
];

export default function RestaurantMenu({
  restaurantDropdownOpen,
  setRestaurantDropdownOpen,
  menuDropdownOpen,
  setMenuDropdownOpen,
  foodSubmenuOpen,
  setFoodSubmenuOpen,
  isMobile = false,
  setMobileMenuOpen,
}: any) {
  return (
    <>
      {restaurantItems.map((sub, idx) =>
        sub.submenu ? (
          <div
            key={sub.name}
            className="relative group mb-2"
          >
            <button
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold focus:outline-none"
              aria-haspopup="true"
              aria-expanded={menuDropdownOpen}
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
            >
              <span className="text-lg">{sub.icon}</span> {sub.name}
              <svg className="w-3 h-3 ml-auto" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className={`absolute left-full top-0 ml-2 w-52 bg-white rounded-xl shadow-2xl py-2 z-50 transition-all duration-200 ${menuDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
              {sub.submenu.map((cat: any) => (
                <div key={cat.name}>
                  <div className="px-4 py-2 text-xs font-bold text-gray-500 flex items-center gap-2">
                    <span className="text-lg">{cat.icon}</span> {cat.name}
                  </div>
                  {cat.items.map((item: any) => (
                    isMobile ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                        onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null
      )}
      {/* Divider */}
      <div className="my-2 border-t border-gray-200" />
      {restaurantItems.map((sub) =>
        !sub.submenu ? (
          isMobile ? (
            <Link
              key={sub.name}
              href={sub.href}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold rounded-lg"
              onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
            >
              <span className="text-lg">{sub.icon}</span> {sub.name}
            </Link>
          ) : (
            <a
              key={sub.name}
              href={sub.href}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold rounded-lg"
            >
              <span className="text-lg">{sub.icon}</span> {sub.name}
            </a>
          )
        ) : null
      )}
    </>
  );
} 