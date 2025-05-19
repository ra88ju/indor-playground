"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// Restaurant items data with prices (from previous conversation)
const restaurantSections = [
  {
    category: "Bangla Food",
    icon: "🍛",
    items: [
      { name: "Bhuna Khichuri", description: "A delicious mix of rice and lentils with meat", price: "৳250" },
      { name: "Panta Ilish", description: "Fermented rice with fried Hilsa fish", price: "৳450" },
      { name: "Morog Polao", description: "Rich chicken polao", price: "৳300" },
    ],
  },
  {
    category: "Chinese Food",
    icon: "🥡",
    items: [
      { name: "Fried Rice", description: "Classic vegetable or chicken fried rice", price: "৳180" },
      { name: "Chicken Chow Mein", description: "Stir-fried noodles with chicken and vegetables", price: "৳220" },
      { name: "Spring Roll", description: "Crispy fried rolls with vegetable filling", price: "৳100" },
    ],
  },
  // Add more categories and items as needed
];

export default function RestaurantPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Hero Section - Inspired by the image */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
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
              <a href="#" className="text-white hover:text-[#ffc107]"><i className="fab fa-instagram"></i></a>{/* Use actual icons/SVGs */} 
              <a href="#" className="text-white hover:text-[#ffc107]"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="text-white hover:text-[#ffc107]"><i className="fab fa-twitter"></i></a>
              <a href="#" className="text-white hover:text-[#ffc107]"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
          {/* Right Image Placeholder (Optional, if you want a separate image on the right like the example) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
             {/* You could place a smaller, circular image here if desired */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item) => (
                    <div key={item.name} className="bg-[#2a2a2a] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <h4 className="text-lg font-semibold mb-1 text-white">{item.name}</h4>
                      {item.description && <p className="text-gray-400 text-sm mb-2">{item.description}</p>}
                      <div className="text-[#ffc107] font-bold text-lg">{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional: Add other sections like About Us, Contact Info, etc. */}

    </main>
  );
} 