"use client";

import SlotSection from "../components/SlotSection";
import React, { useState } from "react"; // Import useState from react
import Image from "next/image"; // Import Image
import { useRouter } from 'next/navigation'; // Import useRouter

// Types - Define these here or import from a shared types file if you have one
type Slot = { time: string; status: string };
type Facility = { title: string; icon: string; image: string; slots: Slot[] };

// Define the initial facilities data here, or fetch it from an API
const initialFacilities: Facility[] = [
  {
    title: "Badminton",
    icon: "🏸",
    image: "/facilities/badminton.jpg",
    slots: [
      { time: "08:00 - 09:00", status: "free" },
      { time: "09:00 - 10:00", status: "booked" },
      { time: "10:00 - 11:00", status: "free" },
    ],
  },
  {
    title: "Footbal",
    icon: "⚽",
    image: "/facilities/futsal.jpg",
    slots: [
      { time: "08:00 - 09:00", status: "free" },
      { time: "09:00 - 10:00", status: "free" },
      { time: "10:00 - 11:00", status: "booked" },
    ],
  },
  {
    title: "Cricket",
    icon: "🏏",
    image: "/facilities/cricket.jpg",
    slots: [
      { time: "08:00 - 09:00", status: "booked" },
      { time: "09:00 - 10:00", status: "free" },
      { time: "10:00 - 11:00", status: "free" },
    ],
  },
  {
    title: "Kid Zone",
    icon: "🧸",
    image: "/facilities/kidzone.jpg",
    slots: [
      { time: "10:00 - 11:00", status: "free" },
      { time: "11:00 - 12:00", status: "free" },
    ],
  },
  {
    title: "Swimming Pool",
    icon: "🏊‍♂️",
    image: "/facilities/swimmingpool.jpg",
    slots: [
      { time: "08:00 - 09:00", status: "free" },
      { time: "09:00 - 10:00", status: "booked" },
      { time: "10:00 - 11:00", status: "free" },
    ],
  },
];

export default function SlotPage() {
  // State for the modal and selected facility, managed at the page level
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  // State for the slot data, managed at the page level
  const [facilitySlots, setFacilitySlots] = useState<Facility[]>(initialFacilities);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const router = useRouter(); // Initialize router

  const handleViewSlots = (facility: Facility) => {
    setSelectedFacility(facility);
    setModalOpen(true);
    setSuccessMsg(null);
  };

  const handleBookSlot = (facilityTitle: string, slotTime: string) => {
    // Update the slot status in the local state first
    setFacilitySlots(prev => prev.map(fac =>
      fac.title === facilityTitle
        ? { ...fac, slots: fac.slots.map(slot => slot.time === slotTime ? { ...slot, status: "booked" } : slot) }
        : fac
    ));
    // Update the selected facility state to reflect the booking immediately in the modal
    setSelectedFacility(prev =>
      prev ? {
        ...prev,
        slots: prev.slots.map(slot => slot.time === slotTime ? { ...slot, status: "booked" } : slot)
      } : null
    );
    setSuccessMsg(`Successfully booked ${slotTime} for ${facilityTitle}! Redirecting...`); // Optional: show a message before redirect

    // Navigate to the booking page after a short delay to show the success message
    setTimeout(() => {
        setModalOpen(false); // Close modal before navigating
        router.push('/booking');
    }, 1000); // Adjust delay as needed
  };

  return (
    <main className="min-h-screen pt-20 bg-gray-900">
      {/* Slot Section Content - Display Facility Cards */}
      <section className="section-padding">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-center mb-12 text-white">Book Your Slot</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {facilitySlots.map((facility) => (
              <div key={facility.title} className="relative h-[350px] group rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.02]">
                {/* Background Image */}
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110 brightness-50 group-hover:brightness-75"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-4 opacity-0 group-hover:opacity-100">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-4xl drop-shadow-lg">{facility.icon}</span>
                      <h3 className="text-3xl font-bold drop-shadow-lg">{facility.title}</h3>
                    </div>
                    <button
                      className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                      onClick={() => handleViewSlots(facility)}
                    >
                      View Available Slots
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Slot Booking Modal - Rendered here */}
      <SlotSection
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          selectedFacility={selectedFacility}
          handleBookSlot={handleBookSlot}
          successMsg={successMsg}
      />
    </main>
  );
} 