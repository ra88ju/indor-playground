"use client";

import { motion } from "framer-motion";

const upcomingEvents = [
  {
    id: 1,
    title: "Summer Badminton Championship",
    date: "June 15-17, 2024",
    time: "9:00 AM - 6:00 PM",
    description: "Join us for our annual summer badminton championship. Open to all skill levels.",
    category: "Tournament",
    registrationDeadline: "June 1, 2024",
    image: "/events/badminton-championship.jpg",
  },
  {
    id: 2,
    title: "Futsal League Season 2",
    date: "July 1-31, 2024",
    time: "Various Times",
    description: "Form your team and compete in our monthly futsal league. Weekly matches.",
    category: "League",
    registrationDeadline: "June 15, 2024",
    image: "/events/futsal-league.jpg",
  },
  {
    id: 3,
    title: "Basketball Training Camp",
    date: "August 5-9, 2024",
    time: "9:00 AM - 4:00 PM",
    description: "Professional basketball training camp for youth players aged 12-18.",
    category: "Training",
    registrationDeadline: "July 20, 2024",
    image: "/events/basketball-camp.jpg",
  },
];

const specialOffers = [
  {
    id: 1,
    title: "Early Bird Membership",
    description: "Get 20% off on annual membership if you sign up before June 30, 2024.",
    validUntil: "June 30, 2024",
    discount: "20%",
  },
  {
    id: 2,
    title: "Group Booking Special",
    description: "Book 5 or more sessions and get 15% off on all bookings.",
    validUntil: "Ongoing",
    discount: "15%",
  },
  {
    id: 3,
    title: "Weekend Package",
    description: "Special rates for weekend morning slots (6 AM - 10 AM).",
    validUntil: "Ongoing",
    discount: "25%",
  },
];

export default function EventsPage() {
  return (
    <main className="min-h-screen pt-20 bg-gray-500">
      <div className="container-custom py-12">
        {/* Upcoming Events */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-center mb-12">Upcoming Events</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                  <div className="space-y-2 text-gray-600 mb-4">
                    <p>📅 {event.date}</p>
                    <p>⏰ {event.time}</p>
                    <p>📝 Registration Deadline: {event.registrationDeadline}</p>
                  </div>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <button className="btn-primary w-full">Register Now</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Special Offers */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-12">Special Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-6"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {offer.discount}
                </div>
                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <p className="text-sm text-gray-500">
                  Valid until: {offer.validUntil}
                </p>
                <button className="btn-primary w-full mt-4">Learn More</button>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
} 