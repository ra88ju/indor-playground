"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

type MenuSection = {
  category: string;
  icon: string;
  items: MenuItem[];
};

const restaurantSections = [
  {
    category: "Bangla Food",
    icon: "🍛",
    items: [
      { 
        name: "Bhuna Khichuri", 
        description: "A delicious mix of rice and lentils with meat", 
        price: "৳250",
        image: "/resturents/khichuri.jpg"
      },
      { 
        name: "Panta Ilish", 
        description: "Fermented rice with fried Hilsa fish", 
        price: "৳450",
        image: "/resturents/panta-ilish.jpg"
      },
      { 
        name: "Morog Polao", 
        description: "Rich chicken polao", 
        price: "৳300",
        image: "/resturents/morog-polao.jpg"
      },
    ],
  },
  {
    category: "Chinese Food",
    icon: "🥡",
    items: [
      { 
        name: "Fried Rice", 
        description: "Classic vegetable or chicken fried rice", 
        price: "৳180",
        image: "/resturents/fried-rice.jpg"
      },
      { 
        name: "Chicken Chow Mein", 
        description: "Stir-fried noodles with chicken and vegetables", 
        price: "৳220",
        image: "/resturents/chicken-chowmein.jpg"
      },
      { 
        name: "Spring Roll", 
        description: "Crispy fried rolls with vegetable filling", 
        price: "৳100",
        image: "/resturents/spring-roll.jpg"
      },
      {
        name: "Burger", 
        description: "Crispy fried rolls with vegetable filling", 
        price: "৳100",
        image: "/resturents/burger.jpg"
      },
      {
        name: "Pizza", 
        description: "Crispy fried rolls with vegetable filling", 
        price: "৳100",
        image: "/resturents/pizza.jpg"
      },
      {
        name: "Pasta", 
        description: "Crispy fried rolls with vegetable filling", 
        price: "৳100",
        image: "/resturents/pasta.jpg"
      },
    ],
  },
  {
    category: "Juice Bar",
    icon: "🍹",
    items: [
      {
        name: "Fresh Orange Juice",
        description: "Freshly squeezed orange juice, served chilled",
        price: "৳120",
        image: "/resturents/orange-juice.jpg"
      },
      {
        name: "Mango Smoothie",
        description: "Creamy mango smoothie with a hint of mint",
        price: "৳150",
        image: "/resturents/mango-smoothie.jpg"
      },
      {
        name: "Lemon Mint Cooler",
        description: "Refreshing lemon and mint drink",
        price: "৳100",
        image: "/resturents/lemon-mint.jpg"
      },
    ],
  },
];

// Add a helper to slugify food names for image filenames
function slugify(str: string) {
  return str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

// MenuCard component for professional, dynamic menu cards
function MenuCard({ item, setSelectedMenuItem, setOrderModalOpen }: { item: { name: string; description: string; price: string; image: string }, setSelectedMenuItem: (item: any) => void, setOrderModalOpen: (open: boolean) => void }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        transition: { duration: 0.2 }
      }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      {/* Image Container with Loading State */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200"></div>
        )}
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`object-cover transition-all duration-500 ${imgLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-xl font-bold text-blue-600">{item.price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedMenuItem(item);
              setOrderModalOpen(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Order Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function RestaurantPage() {
  const menuSectionRef = useRef<HTMLDivElement>(null);

  // Dynamic background gradient based on time of day
  const [bgGradient, setBgGradient] = useState("bg-gradient-to-b from-blue-50 to-gray-50");

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      // Morning
      setBgGradient("bg-gradient-to-b from-yellow-100 via-blue-50 to-white");
    } else if (hour >= 12 && hour < 17) {
      // Afternoon
      setBgGradient("bg-gradient-to-b from-blue-100 via-green-50 to-white");
    } else if (hour >= 17 && hour < 20) {
      // Evening
      setBgGradient("bg-gradient-to-b from-orange-200 via-pink-100 to-white");
    } else {
      // Night
      setBgGradient("bg-gradient-to-b from-gray-900 via-blue-900 to-gray-700");
    }
  }, []);

  const scrollToMenu = () => {
    menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <main className={`min-h-screen transition-colors duration-700 ${bgGradient}`}>
        {/* Enhanced Hero Section */}
        <section className="relative min-h-[80vh] lg:min-h-[120vh] flex items-center overflow-hidden">
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/resturents-hero.jpg"
              alt="Restaurant Hero"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
          </div>
          
          {/* Content Container */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Main Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-center"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Experience Culinary Excellence
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
                    Discover our carefully curated menu featuring the finest local and international cuisines
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToMenu}
                      className="px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                    >
                      View Menu
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl border border-white/20 w-full sm:w-auto"
                    >
                      Make Reservation
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {[
                  { label: "Menu Items", value: "50+" },
                  { label: "Daily Specials", value: "10+" },
                  { label: "Happy Hours", value: "4-7 PM" },
                  { label: "Rating", value: "4.8" }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-4 text-center border border-white/20 shadow-lg"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-black mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-700">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        </section>

        {/* Menu Section */}
        <section ref={menuSectionRef} className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
            >
              Our Menu
            </motion.h2>
            
            <div className="space-y-16">
              {restaurantSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.category}
                  id={section.category === "Juice Bar" ? "juice-bar" : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.2 }}
                  className={`border-b border-gray-200 pb-12 last:border-b-0 ${section.category === 'Juice Bar' ? 'rounded-3xl bg-white/30 backdrop-blur-md shadow-2xl border border-blue-200/40 p-6 md:p-10 my-8' : ''}`}
                >
                  <div className="flex items-center gap-3 mb-8">
                    {section.category === 'Juice Bar' ? (
                      <div className="flex items-center gap-4 w-full">
                        <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-200 via-cyan-200 to-green-200 shadow-lg border-2 border-white text-3xl md:text-4xl">
                          {section.icon}
                        </span>
                        <div className="flex flex-col">
                          <h3 className="text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight">{section.category}</h3>
                          <span className="text-base md:text-lg text-blue-700 font-medium mt-1">Freshly Squeezed & Blended</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <span className="text-4xl">{section.icon}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{section.category}</h3>
                      </>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {section.items.map((item) => (
                      <MenuCard key={item.name} item={item} setSelectedMenuItem={setSelectedMenuItem} setOrderModalOpen={setOrderModalOpen} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50"
          aria-label="Back to Top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>

        {/* Order Modal */}
        {orderModalOpen && selectedMenuItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black rounded-lg p-8 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Order: {selectedMenuItem && 'name' in selectedMenuItem ? selectedMenuItem.name : ''}</h2>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const quantity = Number(formData.get('quantity'));
                  const specialInstructions = formData.get('specialInstructions');
                  const res = await fetch('/api/restaurant', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      itemId: (selectedMenuItem as any)._id || (selectedMenuItem as any).id,
                      quantity,
                      specialInstructions,
                    }),
                  });
                  const result = await res.json();
                  if (res.ok) {
                    alert('Order placed successfully!');
                    setOrderModalOpen(false);
                    setSelectedMenuItem(null);
                  } else {
                    alert(result.error || 'Order failed');
                  }
                }}
              >
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Quantity</label>
                  <input
                    name="quantity"
                    type="number"
                    min="1"
                    defaultValue="1"
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-medium">Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    className="w-full border rounded px-3 py-2"
                    rows={2}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setOrderModalOpen(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Place Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </>
  );
}