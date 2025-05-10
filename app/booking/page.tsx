"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  phone: string;
  sport: string;
  date: string;
  time: string;
  players: number;
  notes: string;
  paymentMethod: string;
};

const sports = [
  { id: "badminton", name: "Badminton" },
  { id: "futsal", name: "Footbal" },
  { id: "cricket", name: "Cricket" },
  { id: "table-tennis", name: "Table Tennis" },
];

const paymentMethods = [
  { value: "credit-card", label: "Credit Card", icon: "💳" },
  { value: "paypal", label: "PayPal", icon: "🅿️" },
  { value: "cash", label: "Cash", icon: "💵" },
];

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log(data);
      toast.success("Booking request submitted successfully!");
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">Book Your Game</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray p-8 rounded-xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register("phone", { required: "Phone number is required" })}
                  className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="sport" className="block text-sm font-medium text-white mb-2">
                  Sport
                </label>
                <select
                  id="sport"
                  {...register("sport", { required: "Please select a sport" })}
                  className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select a sport</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
                {errors.sport && (
                  <p className="mt-1 text-sm text-red-500">{errors.sport.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-white mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  {...register("date", { required: "Date is required" })}
                  className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-500">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-white mb-2">
                  Time
                </label>
                <input
                  type="time"
                  id="time"
                  {...register("time", { required: "Time is required" })}
                  className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.time && (
                  <p className="mt-1 text-sm text-red-500">{errors.time.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="players" className="block text-sm font-medium text-white mb-2">
                  Number of Players
                </label>
                <input
                  type="number"
                  id="players"
                  min="1"
                  {...register("players", {
                    required: "Number of players is required",
                    min: { value: 1, message: "Minimum 1 player required" },
                  })}
                  className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.players && (
                  <p className="mt-1 text-sm text-red-500">{errors.players.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="paymentMethod" className="block text-sm font-medium text-white mb-2">
                  Payment Method
                </label>
                <div className="flex flex-col md:flex-row gap-4">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer border transition-all duration-200 w-full md:w-auto
                        ${
                          (watch('paymentMethod') === method.value)
                            ? 'bg-blue-900 border-blue-500 shadow-lg scale-105' 
                            : 'bg-gray-900 border-gray-700 hover:border-blue-400'
                        }
                      `}
                    >
                      <input
                        type="radio"
                        value={method.value}
                        {...register("paymentMethod", { required: "Please select a payment method" })}
                        className="hidden"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-semibold text-white">{method.label}</span>
                    </label>
                  ))}
                </div>
                {errors.paymentMethod && (
                  <p className="mt-1 text-sm text-red-500">{errors.paymentMethod.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-white mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                rows={4}
                {...register("notes")}
                className="mt-1 block w-full rounded-lg bg-gray-900 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full md:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Book Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 