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
    <main className="min-h-screen bg-black">
      {/* Header Section */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black z-10" />
        <Image
          src="/gallery/facility.jpg"
          alt="Gallery Header"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-center text-white mb-4"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg text-center max-w-2xl px-4"
          >
            Explore our world-class facilities and vibrant community events
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, backgroundColor: "#1a1a1a" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-gray-900 text-gray-200 border border-gray-800 text-sm font-medium
                         transition-all duration-200 hover:border-gray-700"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-gray-900"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                      <span className="inline-block px-3 py-1 bg-blue-600/90 rounded-md text-sm text-white font-medium">
                        {item.category}
                      </span>
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