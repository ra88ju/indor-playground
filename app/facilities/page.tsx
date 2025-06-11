"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const facilities = [
  {
    id: "football",
    name: "Football Field",
    description: "Spacious arena with professional turf and lighting, perfect for matches and training.",
    features: [
      "FIFA-approved Artificial Turf",
      "Floodlit Arena",
      "Changing Rooms",
      "Spectator Stands",
    ],
    pricing: "From $30/hour",
    image: "/facilities/football.jpg",
  },
  {
    id: "cricket",
    name: "Cricket Nets",
    description: "Practice nets with quality pitch and safety nets for cricket enthusiasts.",
    features: [
      "Professional Pitch",
      "Safety Nets",
      "Bowling Machine",
      "Coaching Available",
    ],
    pricing: "From $25/hour",
    image: "/facilities/cricket.jpg",
  },
  {
    id: "badminton",
    name: "Badminton Courts",
    description: "Professional-grade courts with proper lighting and ventilation. Perfect for both casual players and competitive matches.",
    features: [
      "4 Professional Courts",
      "LED Lighting",
      "Air-conditioned",
      "Equipment Rental Available",
    ],
    pricing: "From $20/hour",
    image: "/facilities/badminton.jpg",
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    description: "Clean and safe swimming pool suitable for all ages, with lifeguard supervision.",
    features: [
      "Heated Pool",
      "Lifeguard On Duty",
      "Changing Facilities",
      "Kids Area",
    ],
    pricing: "From $18/hour",
    image: "/facilities/swimming-pool.jpg",
  },
  {
    id: "kids-zone",
    name: "Kids Zone",
    description: "A safe and fun environment for children with various activities and games. Supervised play area with trained staff.",
    features: [
      "Soft Play Area",
      "Ball Pit",
      "Climbing Structures",
      "Supervised Activities",
      "Safe Environment",
    ],
    pricing: "From $10/hour",
    image: "/facilities/kids-zone.jpg",
  },
  {
    id: "restaurant",
    name: "Restaurant",
    description: "Enjoy delicious meals and snacks at our on-site restaurant, offering a variety of cuisines.",
    features: [
      "Multi-cuisine Menu",
      "Family Friendly",
      "Comfortable Seating",
      "Special Kids Menu",
    ],
    pricing: "Menu Priced",
    image: "/facilities/restaurant.jpg",
  },
];

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<any>(null);
  const [isBookingDrawerOpen, setIsBookingDrawerOpen] = useState(false);

  const handleBookNowClick = (facility: any) => {
    setSelectedFacility(facility);
    setIsBookingDrawerOpen(true);
  };

  return (
    <main className="min-h-screen pt-20 bg-gray-200">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Facilities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="relative w-full aspect-[16/9] bg-gray-100">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-bold mb-2 text-gray-900">{facility.name}</h2>
                <p className="text-gray-600 mb-4 flex-grow">{facility.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-gray-800">Features:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {facility.features.map((feature) => (
                      <li key={feature} className="hover:text-blue-600 transition-colors duration-200">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-lg font-semibold text-blue-600">
                    {facility.pricing}
                  </span>
                  <motion.button
                    onClick={() => handleBookNowClick(facility)}
                    className="btn-primary text-sm px-4 py-2 rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedFacility && (
        null
      )}
    </main>
  );
} 