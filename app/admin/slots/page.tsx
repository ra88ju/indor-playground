"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  ClockIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

interface TimeSlot {
  id: number;
  facilityId: number;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  isAvailable: boolean;
  price: number;
  maxBookings: number;
  currentBookings: number;
}

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function AdminSlotsPage() {
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [selectedDay, setSelectedDay] = useState('All');
  const [formData, setFormData] = useState({
    facilityId: '',
    startTime: '',
    endTime: '',
    dayOfWeek: 'Monday',
    price: '',
    maxBookings: '',
  });

  const fetchSlots = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/slots');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSlots(data);
    } catch (error: any) {
      setError(error);
      console.error('Error fetching slots:', error);
      toast.error('Failed to load slots');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/admin/slots';
      const method = editingSlot ? 'PUT' : 'POST';
      const body = editingSlot
        ? { ...formData, id: editingSlot.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...body,
          facilityId: parseInt(body.facilityId as string),
          price: parseFloat(body.price as string),
          maxBookings: parseInt(body.maxBookings as string),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchSlots();
      setIsModalOpen(false);
      setEditingSlot(null);
      setFormData({
        facilityId: '',
        startTime: '',
        endTime: '',
        dayOfWeek: 'Monday',
        price: '',
        maxBookings: '',
      });
      toast.success(
        editingSlot ? 'Time slot updated successfully' : 'Time slot added successfully'
      );
    } catch (error: any) {
      console.error('Error saving slot:', error);
      toast.error(error.message || 'Failed to save time slot');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this time slot?')) return;

    try {
      const response = await fetch(`/api/admin/slots?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchSlots();
      toast.success('Time slot deleted successfully');
    } catch (error: any) {
      console.error('Error deleting slot:', error);
      toast.error(error.message || 'Failed to delete time slot');
    }
  };

  const handleEdit = (slot: TimeSlot) => {
    setEditingSlot(slot);
    setFormData({
      facilityId: slot.facilityId.toString(),
      startTime: slot.startTime,
      endTime: slot.endTime,
      dayOfWeek: slot.dayOfWeek,
      price: slot.price.toString(),
      maxBookings: slot.maxBookings.toString(),
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingSlot(null);
    setFormData({
      facilityId: '',
      startTime: '',
      endTime: '',
      dayOfWeek: 'Monday',
      price: '',
      maxBookings: '',
    });
    setIsModalOpen(true);
  };

  const filteredSlots = selectedDay === 'All'
    ? slots
    : slots.filter(slot => slot.dayOfWeek === selectedDay);

  if (loading) {
    return <div className="text-center">Loading time slots...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading time slots: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Slots Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage time slots for your facilities
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Time Slot
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
        >
          <option value="All">All Days</option>
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSlots.map((slot) => (
          <div
            key={slot.id}
            className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
          >
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400" />
                  <span className="ml-2 text-lg font-medium text-gray-900">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    slot.isAvailable
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {slot.isAvailable ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {slot.dayOfWeek}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BuildingOfficeIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  Facility #{slot.facilityId}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <UserGroupIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {slot.currentBookings} / {slot.maxBookings} booked
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  ${slot.price}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(slot)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleDelete(slot.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="facilityId" className="block text-sm font-medium text-gray-700">
                    Facility ID
                  </label>
                  <input
                    type="number"
                    name="facilityId"
                    id="facilityId"
                    value={formData.facilityId}
                    onChange={(e) => setFormData({ ...formData, facilityId: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      id="startTime"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      id="endTime"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700">
                    Day of Week
                  </label>
                  <select
                    id="dayOfWeek"
                    name="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {daysOfWeek.map((day) => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label htmlFor="maxBookings" className="block text-sm font-medium text-gray-700">
                      Max Bookings
                    </label>
                    <input
                      type="number"
                      name="maxBookings"
                      id="maxBookings"
                      value={formData.maxBookings}
                      onChange={(e) => setFormData({ ...formData, maxBookings: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                      min="1"
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {editingSlot ? 'Update' : 'Add'} Time Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}