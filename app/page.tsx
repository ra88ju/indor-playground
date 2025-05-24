"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const facilities = [
  {
    title: "Badminton ", // badmainton
    description: "Professional-grade courts with proper lighting and ventilation",
    icon: "🏸",
    image: "/facilities/badminton.jpg"
  },
  // footbal
  {
    title: "Footbal",
    description: "FIFA-approved artificial turf for the perfect playing experience",
    icon: "⚽",
    image: "/facilities/futsal.jpg"
  },
  // cricket
  {
    title: "Cricket",
    description: "Full-size court with professional flooring and equipment",
    icon: "🏀",
    image: "/facilities/cricket.jpg"
  },
  // Kid Zone
  {
    title: "Kid Zone",
    description: "Fun and safe play area for children with a variety of games and activities",
    icon: "🧸",
    image: "/facilities/kidzone.jpg" // Use a placeholder or add your own image
  },
  // Swimming Pool
  {
    title: "Swimming Pool",
    description: "Indoor heated swimming pool for all ages and skill levels",
    icon: "🏊‍♂️",
    image: "/facilities/swimmingpool.jpg" // Use a placeholder or add your own image
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] lg:min-h-[120vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/stadium-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay (optional, for darkening/lightening) */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Content */}
        <div className="relative z-20 w-full text-center">
          <h1 className="text-5xl font-bold text-white">Welcome to Indoor Sports Ground</h1>
          <p className="text-2xl text-white mt-4">Your Ultimate Indoor Sports Experience</p>
          <button className="mt-8 px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Book Your Game Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            Our Facilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative h-[400px] group rounded-xl overflow-hidden"
              >
                {/* Background Image */}
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{facility.icon}</span>
                      <h3 className="text-2xl font-bold">{facility.title}</h3>
                    </div>
                    <p className="text-gray-200 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {facility.description}
                    </p>
                    <Link 
                      href="/booking" 
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg 
                               hover:bg-blue-700 transition-colors duration-300
                               opacity-0 group-hover:opacity-100"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
