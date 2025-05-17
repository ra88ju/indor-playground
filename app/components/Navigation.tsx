"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
// Resturents itmes 
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

// SlotCard component for professional, dynamic slot display
function SlotCard({ slot, facilityName, onBook, countdown }: {
  slot: any;
  facilityName: string;
  onBook: (facility: string, time: string) => void;
  countdown?: number;
}) {
  const isBooked = slot.status === "booked";
  return (
    <div
      className={`rounded-lg p-4 border text-center transition-all duration-200 shadow-md
        ${isBooked ? "bg-black text-white border-black" : "border-green-400 bg-green-50 hover:shadow-lg hover:border-blue-400"}
        ${isBooked ? "opacity-90" : "hover:scale-105"}
      `}
      style={{ minHeight: 160 }}
    >
      <div className="font-bold text-xl mb-2 tracking-wide">{slot.time}</div>
      <div className="mt-2">
        {isBooked ? (
          <span className="text-gray-300 font-semibold text-lg">Booked</span>
        ) : (
          <>
            <span className="text-green-600 font-bold text-lg">Free</span>
            <div className="text-xs mt-1 text-gray-600">
              {typeof countdown === "number" && (
                <span>
                  {Math.floor(countdown / 3600).toString().padStart(2, '0')}
                  :{Math.floor((countdown % 3600) / 60).toString().padStart(2, '0')}
                  :{(countdown % 60).toString().padStart(2, '0')} left
                </span>
              )}
            </div>
            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed w-full font-semibold"
              onClick={() => onBook(facilityName, slot.time)}
              disabled={isBooked}
            >
              Book Now
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [restaurantDropdownOpen, setRestaurantDropdownOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [foodSubmenuOpen, setFoodSubmenuOpen] = useState("");
  const restaurantRef = useRef<HTMLDivElement>(null);
  const [slotModalOpen, setSlotModalOpen] = useState(false);
  const [countdowns, setCountdowns] = useState<Record<string, number>>({});
  const [selectedFacility, setSelectedFacility] = useState<string>("All");
  const [bookingSlot, setBookingSlot] = useState<{facility: string, time: string} | null>(null);
  const [slotFacilities, setSlotFacilities] = useState([
    {
      name: "Badminton Court",
      slots: [
        { time: "08:00 - 09:00", status: "free", expiresAt: Date.now() + 24 * 60 * 60 * 1000 },
        { time: "09:00 - 10:00", status: "booked" },
        { time: "10:00 - 11:00", status: "free", expiresAt: Date.now() + 20 * 60 * 60 * 1000 },
      ],
    },
    {
      name: "Futsal Arena",
      slots: [
        { time: "08:00 - 09:00", status: "booked" },
        { time: "09:00 - 10:00", status: "free", expiresAt: Date.now() + 12 * 60 * 60 * 1000 },
        { time: "10:00 - 11:00", status: "free", expiresAt: Date.now() + 5 * 60 * 60 * 1000 },
      ],
    },
    {
      name: "Table Tennis",
      slots: [
        { time: "08:00 - 09:00", status: "free", expiresAt: Date.now() + 8 * 60 * 60 * 1000 },
        { time: "09:00 - 10:00", status: "free", expiresAt: Date.now() + 2 * 60 * 60 * 1000 },
        { time: "10:00 - 11:00", status: "booked" },
      ],
    },
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // Countdown logic
  useEffect(() => {
    if (!slotModalOpen) return;
    const interval = setInterval(() => {
      const newCountdowns: Record<string, number> = {};
      slotFacilities.forEach(facility => {
        facility.slots.forEach(slot => {
          if (slot.status === "free" && slot.expiresAt) {
            const remaining = Math.max(0, Math.floor((slot.expiresAt - Date.now()) / 1000));
            newCountdowns[facility.name + slot.time] = remaining;
          }
        });
      });
      setCountdowns(newCountdowns);
    }, 1000);
    return () => clearInterval(interval);
  }, [slotModalOpen]);

  // Professional booking handler
  const handleBookSlot = (facility: string, time: string) => {
    setSlotFacilities(prev => prev.map(f =>
      f.name === facility
        ? { ...f, slots: f.slots.map(s => s.time === time ? { ...s, status: "booked" } : s) }
        : f
    ));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
    setBookingSlot(null);
  };

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
                  className="relative"
                  ref={restaurantRef}
                >
                  <button
                    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors flex items-center gap-1 focus:outline-none"
                    aria-haspopup="true"
                    aria-expanded={restaurantDropdownOpen}
                    onClick={() => setRestaurantDropdownOpen((open) => !open)}
                  >
                    {item.name}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <div className={`absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 transition-all duration-200 ${restaurantDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
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
                            {sub.submenu.map((cat) => (
                              <div key={cat.name}>
                                <div className="px-4 py-2 text-xs font-bold text-gray-500 flex items-center gap-2">
                                  <span className="text-lg">{cat.icon}</span> {cat.name}
                                </div>
                                {cat.items.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                                  >
                                    {item.name}
                                  </a>
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
                        <a
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold rounded-lg"
                        >
                          <span className="text-lg">{sub.icon}</span> {sub.name}
                        </a>
                      ) : null
                    )}
                  </div>
                </div>
              ) : item.name.trim() === "Slot" ? (
                <button
                  key={item.name}
                  onClick={() => setSlotModalOpen(true)}
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </button>
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
                          className="-mx-3 w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 focus:outline-none"
                          onClick={() => setRestaurantDropdownOpen((open) => !open)}
                          type="button"
                          aria-haspopup="true"
                          aria-expanded={restaurantDropdownOpen}
                        >
                          {item.name}
                          <svg className={`w-4 h-4 ml-2 transition-transform ${restaurantDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {restaurantDropdownOpen && (
                          <div className="pl-4">
                            {restaurantItems.map((sub, idx) =>
                              sub.submenu ? (
                                <div key={sub.name} className="mb-2">
                                  <button
                                    className="w-full flex items-center gap-2 justify-between rounded-lg px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold focus:outline-none"
                                    onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
                                    type="button"
                                    aria-haspopup="true"
                                    aria-expanded={menuDropdownOpen}
                                  >
                                    <span className="text-lg">{sub.icon}</span> {sub.name}
                                    <svg className={`w-3 h-3 ml-2 transition-transform ${menuDropdownOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                  </button>
                                  {menuDropdownOpen && (
                                    <div className="pl-4">
                                      {sub.submenu.map((cat) => (
                                        <div key={cat.name}>
                                          <div className="px-4 py-2 text-xs font-bold text-gray-500 flex items-center gap-2">
                                            <span className="text-lg">{cat.icon}</span> {cat.name}
                                          </div>
                                          {cat.items.map((item) => (
                                            <Link
                                              key={item.name}
                                              href={item.href}
                                              className="block px-6 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-lg"
                                              onClick={() => setMobileMenuOpen(false)}
                                            >
                                              {item.name}
                                            </Link>
                                          ))}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ) : null
                            )}
                            {/* Divider */}
                            <div className="my-2 border-t border-gray-200" />
                            {restaurantItems.map((sub) =>
                              !sub.submenu ? (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-semibold rounded-lg"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <span className="text-lg">{sub.icon}</span> {sub.name}
                                </Link>
                              ) : null
                            )}
                          </div>
                        )}
                      </div>
                    ) : item.name.trim() === "Slot" ? (
                      <div key={item.name}>
                        <button
                          className="-mx-3 w-full flex items-center justify-between rounded-lg px-4 py-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 focus:outline-none"
                          onClick={() => setSlotModalOpen(true)}
                          type="button"
                          aria-haspopup="true"
                          aria-expanded={slotModalOpen}
                        >
                          {item.name}
                          <svg className={`w-4 h-4 ml-2 transition-transform ${slotModalOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </button>
                        {slotModalOpen && (
                          <div className="pl-4">
                            {slotFacilities
                              .filter(facility => selectedFacility === "All" || facility.name === selectedFacility)
                              .map(facility => {
                                return (
                                  <div key={facility.name}>
                                    <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      {facility.slots.map(slot => {
                                        return (
                                          <SlotCard
                                            key={slot.time}
                                            slot={slot}
                                            facilityName={facility.name}
                                            onBook={handleBookSlot}
                                            countdown={countdowns[facility.name + slot.time]}
                                          />
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
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
      {/* Slot Modal */}
      {slotModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="absolute inset-0" onClick={() => setSlotModalOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl z-10 animate-fade-in-up">
            {/* Back Button */}
            <button
              className="absolute top-4 left-4 text-black-500 hover:text-blue-600 text-lg font-bold border border-gray-300 rounded px-3 py-1 bg-white shadow"
              onClick={() => setSlotModalOpen(false)}
            >
              ← Back
            </button>
            {/* Filter Dropdown */}
            <div className="mb-6 flex justify-center">
              <select
                className="border rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedFacility}
                onChange={e => setSelectedFacility(e.target.value)}
              >
                <option value="All">All Facilities</option>
                {slotFacilities.map(f => (
                  <option key={f.name} value={f.name}>{f.name}</option>
                ))}
              </select>
            </div>
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setSlotModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Available Slots</h2>
            <div className="space-y-6">
              {slotFacilities
                .filter(facility => selectedFacility === "All" || facility.name === selectedFacility)
                .map(facility => {
                  return (
                    <div key={facility.name}>
                      <h3 className="text-lg font-semibold mb-2">{facility.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {facility.slots.map(slot => {
                          return (
                            <SlotCard
                              key={slot.time}
                              slot={slot}
                              facilityName={facility.name}
                              onBook={handleBookSlot}
                              countdown={countdowns[facility.name + slot.time]}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {/* Booking Form Modal */}
      {bookingSlot && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40">
          <div className="absolute inset-0" onClick={() => setBookingSlot(null)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10 animate-fade-in-up">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setBookingSlot(null)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Book Slot</h2>
            <div className="mb-4 text-center">
              <div className="font-semibold">{bookingSlot.facility}</div>
              <div className="text-gray-600">{bookingSlot.time}</div>
            </div>
            {/* Mock booking form */}
            <form onSubmit={e => { e.preventDefault(); alert('Booking submitted!'); setBookingSlot(null); }}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full mb-3 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
} 