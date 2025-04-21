"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const facilities = [
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
    id: "futsal",
    name: "Futsal Arena",
    description: "FIFA-approved artificial turf for the perfect playing experience. Ideal for 5-a-side matches and training sessions.",
    features: [
      "FIFA-approved Artificial Turf",
      "Professional Goals",
      "Floodlit",
      "Changing Rooms",
    ],
    pricing: "From $30/hour",
    image: "/facilities/futsal.jpg",
  },
  {
    id: "basketball",
    name: "Basketball Court",
    description: "Full-size court with professional flooring and equipment. Suitable for training, matches, and casual play.",
    features: [
      "Full-size Court",
      "Professional Flooring",
      "Scoreboard",
      "Training Equipment",
    ],
    pricing: "From $25/hour",
    image: "/facilities/basketball.jpg",
  },
  {
    id: "table-tennis",
    name: "Table Tennis",
    description: "Multiple tables with professional equipment available. Perfect for both beginners and advanced players.",
    features: [
      "4 Professional Tables",
      "Equipment Rental",
      "Training Area",
      "Tournament Ready",
    ],
    pricing: "From $15/hour",
    image: "/facilities/table-tennis.jpg",
  },
];

export default function FacilitiesPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Facilities</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={facility.image}
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{facility.name}</h2>
                <p className="text-gray-600 mb-4">{facility.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Features:</h3>
                  <ul className="list-disc list-inside text-gray-600">
                    {facility.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-600">
                    {facility.pricing}
                  </span>
                  <a
                    href="/booking"
                    className="btn-primary text-sm"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 