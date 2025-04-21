"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const team = [
  {
    name: "John Smith",
    role: "Founder & CEO",
    bio: "With over 20 years of experience in sports management, John founded IndoorX Arena to create a premier indoor sports facility.",
    image: "/team/john.jpg",
  },
  {
    name: "Sarah Johnson",
    role: "Facility Manager",
    bio: "Sarah ensures smooth operations and maintains the highest standards of facility management.",
    image: "/team/sarah.jpg",
  },
  {
    name: "Mike Chen",
    role: "Sports Coordinator",
    bio: "Mike organizes tournaments and events, bringing the community together through sports.",
    image: "/team/mike.jpg",
  },
];

const values = [
  {
    title: "Excellence",
    description: "We strive for excellence in everything we do, from facility maintenance to customer service.",
    icon: "⭐",
  },
  {
    title: "Community",
    description: "Building a strong sports community where players of all levels can come together.",
    icon: "🤝",
  },
  {
    title: "Innovation",
    description: "Continuously improving our facilities and services to provide the best experience.",
    icon: "💡",
  },
  {
    title: "Safety",
    description: "Ensuring the highest standards of safety and security for all our visitors.",
    icon: "🛡️",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/about-hero.jpg"
            alt="IndoorX Arena"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl"
          >
            Building a community through sports
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg mb-8">
              At IndoorX Arena, we're dedicated to providing a world-class indoor sports facility
              that brings people together through the power of sports. Our mission is to create
              an inclusive environment where athletes of all levels can train, compete, and
              enjoy their favorite sports year-round.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
} 