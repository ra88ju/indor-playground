"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryItems = [
  {
    id: 1,
    title: "Badminton Tournament",
    category: "Events",
    image: "/gallery/badminton-tournament.jpg",
  },
  {
    id: 2,
    title: "Futsal Match",
    category: "Sports",
    image: "/gallery/futsal-match.jpg",
  },
  {
    id: 3,
    title: "Basketball Practice",
    category: "Training",
    image: "/gallery/basketball-practice.jpg",
  },
  {
    id: 4,
    title: "Table Tennis Championship",
    category: "Events",
    image: "/gallery/table-tennis.jpg",
  },
  {
    id: 5,
    title: "Facility Overview",
    category: "Arena",
    image: "/gallery/facility.jpg",
  },
  {
    id: 6,
    title: "Community Event",
    category: "Events",
    image: "/gallery/community.jpg",
  },
  {
    id: 7,
    title: "Training Session",
    category: "Training",
    image: "/gallery/training.jpg",
  },
  {
    id: 8,
    title: "Arena Interior",
    category: "Arena",
    image: "/gallery/interior.jpg",
  },
];

const categories = ["All", "Events", "Sports", "Training", "Arena"];

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-20">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Gallery</h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white p-4">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
} 