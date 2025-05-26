"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      toast.success("Message sent successfully!");
      reset();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-20 bg-gray-200">
      <div className="container-custom py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: Info */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col p-0">
            <div className="rounded-t-2xl bg-white py-4 px-6 flex items-center justify-center">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-900 tracking-wide">GET IN TOUCH WITH US NOW</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 flex-1">
              {/* Phone */}
              <div className="bg-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-none">
                <FaPhoneAlt className="text-4xl text-blue-900 mb-2" />
                <div className="font-bold text-xl text-black mb-1">Phone Number</div>
                <div className="text-black text-lg">01750497069</div>
              </div>
              {/* Email */}
              <div className="bg-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-none">
                <FaEnvelope className="text-4xl text-blue-900 mb-2" />
                <div className="font-bold text-xl text-black mb-1">Email</div>
                <div className="text-black text-lg">indorparkbd@gmail.com</div>
              </div>
              {/* Location */}
              <div className="bg-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-none sm:col-span-1">
                <FaMapMarkerAlt className="text-4xl text-blue-900 mb-2" />
                <div className="font-bold text-xl text-black mb-1">Location</div>
                <div className="text-black text-center text-base">Nader Hazir Mor, Plane Chottor Bypass Road, Rajshahi 6207</div>
              </div>
              {/* Service Hours */}
              <div className="bg-indigo-100 rounded-xl p-6 flex flex-col items-center justify-center shadow-none sm:col-span-1">
                <FaClock className="text-4xl text-blue-900 mb-2" />
                <div className="font-bold text-xl text-black mb-1">Service Hours</div>
                <div className="text-black text-center text-base">Open 24 hours, 7 days a week</div>
              </div>
            </div>
          </div>
          {/* Right Card: Form */}
          <div className="bg-white rounded-2xl shadow-lg flex flex-col p-0">
            <div className="rounded-t-2xl bg-white py-4 px-6 flex items-center justify-center">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 tracking-wide">CONTACT US</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 flex-1 flex flex-col justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-base font-semibold text-black mb-1">First Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your first name"
                    {...register("name", { required: "Name is required" })}
                    className="block w-full rounded-lg bg-indigo-100 border-none text-black px-3 py-2 placeholder:text-gray-700 font-medium focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-base font-semibold text-black mb-1">Last Name</label>
                  <input
                    type="text"
                    id="lastname"
                    placeholder="Enter your last name"
                    className="block w-full rounded-lg bg-indigo-100 border-none text-black px-3 py-2 placeholder:text-gray-700 font-medium focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="number" className="block text-base font-semibold text-black mb-1">Number</label>
                  <input
                    type="text"
                    id="number"
                    placeholder="Enter your number"
                    className="block w-full rounded-lg bg-indigo-100 border-none text-black px-3 py-2 placeholder:text-gray-700 font-medium focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-semibold text-black mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="block w-full rounded-lg bg-indigo-100 border-none text-black px-3 py-2 placeholder:text-gray-700 font-medium focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-base font-semibold text-black mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Message"
                    {...register("message", { required: "Message is required" })}
                    className="block w-full rounded-lg bg-indigo-100 border-none text-black px-3 py-2 placeholder:text-gray-700 font-medium focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-yellow-300 text-black rounded-lg font-bold text-xl hover:bg-yellow-400 transition-colors duration-300 mt-6"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 