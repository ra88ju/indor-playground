"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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
    <main className="min-h-screen pt-20 bg-gray-900">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 text-white"
          >
            Contact Us
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 bg-black p-8 rounded-xl border border-white/10"
            >
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">Get in Touch</h2>
                <p className="text-gray-400 mb-6">
                  Have questions about our facilities or booking? We're here to help!
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white">Address</h3>
                  <p className="text-gray-400">
                    123 Sports Avenue<br />
                    City, State 12345<br />
                    Country
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-white">Phone</h3>
                  <p className="text-gray-400">+1 (555) 123-4567</p>
                </div>

                <div>
                  <h3 className="font-semibold text-white">Email</h3>
                  <p className="text-gray-400">info@indoorxarena.com</p>
                </div>

                <div>
                  <h3 className="font-semibold text-white">Business Hours</h3>
                  <p className="text-gray-400">
                    Monday - Friday: 6:00 AM - 10:00 PM<br />
                    Saturday - Sunday: 8:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black p-8 rounded-xl border border-white/10"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-white mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject", { required: "Subject is required" })}
                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message", { required: "Message is required" })}
                    className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold
                           hover:bg-blue-700 transition-colors duration-300"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 