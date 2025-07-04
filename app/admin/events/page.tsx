"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  capacity: number;
  registeredCount: number;
  price: string;
  venue: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'Tournament',
    status: 'Upcoming',
    capacity: '',
    price: '',
    venue: '',
  });

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/events');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error: any) {
      setError(error);
      console.error('Error fetching events:', error);
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/admin/events';
      const method = editingEvent ? 'PUT' : 'POST';
      const body = editingEvent
        ? { ...formData, id: editingEvent.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchEvents();
      setIsModalOpen(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        type: 'Tournament',
        status: 'Upcoming',
        capacity: '',
        price: '',
        venue: '',
      });
      toast.success(
        editingEvent ? 'Event updated successfully' : 'Event added successfully'
      );
    } catch (error: any) {
      console.error('Error saving event:', error);
      toast.error(error.message || 'Failed to save event');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/admin/events?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchEvents();
      toast.success('Event deleted successfully');
    } catch (error: any) {
      console.error('Error deleting event:', error);
      toast.error(error.message || 'Failed to delete event');
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      type: event.type,
      status: event.status,
      capacity: event.capacity.toString(),
      price: event.price.replace('$', ''),
      venue: event.venue,
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      type: 'Tournament',
      status: 'Upcoming',
      capacity: '',
      price: '',
      venue: '',
    });
    setIsModalOpen(true);
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading events: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Events Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage events and bookings
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Event
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search events..."
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option>All Types</option>
            <option>Tournament</option>
            <option>Camp</option>
            <option>Competition</option>
          </select>
          <select className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option>All Status</option>
            <option>Upcoming</option>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
          >
            <div className="flex-1 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 truncate">{event.title}</h3>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    event.status === 'Open'
                      ? 'bg-green-100 text-green-800'
                      : event.status === 'Upcoming'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {event.status}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{event.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {event.startDate} - {event.endDate}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {event.venue}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <UsersIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {event.registeredCount} / {event.capacity} registered
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CurrencyDollarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                  {event.price}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => handleEdit(event)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <PencilIcon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
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
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option>Tournament</option>
                      <option>Camp</option>
                      <option>Competition</option>
                    </select>
                  </div>
                  {editingEvent && (
                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option>Upcoming</option>
                        <option>Open</option>
                        <option>Closed</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                      Capacity
                    </label>
                    <input
                      type="number"
                      name="capacity"
                      id="capacity"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    id="venue"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {editingEvent ? 'Update' : 'Add'} Event
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