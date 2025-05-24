"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Restaurant items data with prices (from previous conversation)
const restaurantSections = [
  {
    category: "Bangla Food",
    icon: "🍛",
    items: [
      { 
        name: "Bhuna Khichuri", 
        description: "A delicious mix of rice and lentils with meat", 
        price: "৳250",
        image: "/resturents/bhuna-khichuri.jpg"
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
    ],
  },
  // Add more categories and items as needed
];

// Add a helper to slugify food names for image filenames
function slugify(str: string) {
  return str.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
}

// MenuCard component for professional, dynamic menu cards
function MenuCard({ item }: { item: { name: string; description: string; price: string; image: string } }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 flex flex-col items-start min-h-[370px] relative overflow-hidden">
      {/* Image with skeleton loader and SVG fallback */}
      <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-[#232323] to-[#333] mb-4 flex items-center justify-center relative">
        {!imgLoaded && !imgError && (
          <div className="absolute inset-0 animate-pulse bg-gray-700"></div>
        )}
        {!imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className={`object-cover rounded-xl transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 200px"
            priority={false}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-[#ffc107]">
            {/* SVG fallback icon */}
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24"><rect width="24" height="24" rx="12" fill="#232323"/><path d="M7 17V7h10v10H7zm2-2h6V9H9v6z" fill="#ffc107"/></svg>
            <span className="text-xs text-gray-400 mt-2">No Image</span>
          </div>
        )}
      </div>
      <h4 className="text-2xl font-semibold mb-1 text-black">{item.name}</h4>
      {item.description && <p className="text-black text-base mb-3">{item.description}</p>}
      <div className="flex items-center gap-2 mt-auto w-full">
        <span className="bg-[#ffc107] text-[#232323] font-bold text-lg px-4 py-1 rounded-full shadow">{item.price}</span>
      </div>
    </div>
  );
}

export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section - Inspired by the image */}
      <section className="relative h-[100vh] flex items-center overflow-hidden">
        <Image
          src="/resturents-hero.jpg" // Placeholder, consider a pizza/food image similar to the example
          alt="Delicious Food"
          fill
          className="object-cover object-right opacity-30" // Adjust opacity and object position as needed
          priority
        />
        <div className="container mx-auto px-4 z-10 flex flex-col lg:flex-row items-center lg:justify-between">
          {/* Left Content */}
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#ffc107]">There is no Loyal Love than The Love of Food.</h1>
            <p className="text-lg md:text-xl mb-6 max-w-md lg:max-w-none mx-auto lg:mx-0">
              Good food basically that we have in our plate is a result of immense amount of hard work that is put at various stages.... Consume it with utmost respect.
            </p>
            <Link href="/order" className="inline-block bg-[#ffc107] text-[#1a1a1a] font-bold py-3 px-8 rounded-full text-lg hover:bg-[#ffb300] transition-colors">
              Order Now
            </Link>
            {/* Social Icons - Placeholder based on image */}
            <div className="mt-8 flex justify-center lg:justify-start gap-6">
              <a href="#" aria-label="Instagram" className="text-white hover:text-[#ffc107] transition-colors">
                {/* Instagram SVG */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.052.072 5.77.13 4.77.31 3.95.6c-.82.29-1.51.68-2.2 1.37C.68 2.46.29 3.15 0 3.97c-.29.82-.47 1.82-.53 3.1C-.013 8.332 0 8.736 0 12c0 3.264.013 3.668.072 4.948.058 1.282.24 2.282.53 3.1.29.82.68 1.51 1.37 2.2.69.69 1.38 1.08 2.2 1.37.82.29 1.82.47 3.1.53C8.332 23.987 8.736 24 12 24s3.668-.013 4.948-.072c1.282-.058 2.282-.24 3.1-.53.82-.29 1.51-.68 2.2-1.37.69-.69 1.08-1.38 1.37-2.2.29-.82.47-1.82.53-3.1.059-1.28.072-1.684.072-4.948s-.013-3.668-.072-4.948c-.058-1.282-.24-2.282-.53-3.1-.29-.82-.68-1.51-1.37-2.2-.69-.69-1.38-1.08-2.2-1.37-.82-.29-1.82-.47-3.1-.53C15.668.013 15.264 0 12 0z"/><path d="M12 5.838A6.162 6.162 0 1 0 12 18.162 6.162 6.162 0 1 0 12 5.838zm0 10.162A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-white hover:text-[#ffc107] transition-colors">
                {/* Facebook SVG */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24H12.82v-9.294H9.692V11.01h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.696h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-white hover:text-[#ffc107] transition-colors">
                {/* Twitter SVG */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.916 4.916 0 0 0-8.38 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.633A9.936 9.936 0 0 0 24 4.557z"/></svg>
              </a>
              <a href="#" aria-label="WhatsApp" className="text-white hover:text-[#ffc107] transition-colors">
                {/* WhatsApp SVG */}
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.151-.174.2-.298.3-.497.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.363.709.306 1.262.489 1.694.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.617h-.001a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.991c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .06 5.435.057 12.086c0 2.13.557 4.21 1.615 6.033L0 24l6.064-1.594a11.88 11.88 0 0 0 5.978 1.527h.005c6.554 0 11.89-5.435 11.893-12.086a11.82 11.82 0 0 0-3.49-8.465"/></svg>
              </a>
            </div>
          </div>
          {/* Right Image Placeholder (Optional, if you want a separate image on the right like the example) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="w-64 h-64 rounded-full overflow-hidden shadow-lg border-4 border-[#ffc107] bg-white flex items-center justify-center">
              <Image
                src="/food-drink.jpg" // Make sure this file is in your public directory
                alt="Food and Drink"
                width={256}
                height={256}
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section (Using previous data) */}
      <section className="section-padding py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#ffc107]">Our Menu</h2>
          <div className="space-y-12">
            {restaurantSections.map((section) => (
              <div key={section.category} className="border-b border-gray-700 pb-8 last:border-b-0">
                <h3 className="text-2xl font-bold mb-6 text-gray-200 flex items-center gap-3">
                    <span className="text-3xl">{section.icon}</span> {section.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {section.items.map((item) => (
                    <MenuCard key={item.name} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional: Add other sections like About Us, Contact Info, etc. */}

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-[#ffc107] text-[#1a1a1a] rounded-full p-3 shadow-lg hover:bg-[#ffb300] transition-colors z-50"
        aria-label="Back to Top"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
      </button>
    </main>
  );
} 