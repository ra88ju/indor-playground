"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Define the Facility interface again
interface Facility {
  id: number;
  name: string;
  status: string;
  capacity: number;
  price: string;
  lastUpdated: string;
}

export default function FacilitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    status: 'Active',
    capacity: '',
    price: '',
  });

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/facilities');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFacilities(data);
    } catch (error: any) {
      setError(error);
      console.error('Error fetching facilities:', error);
      toast.error('Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingFacility
        ? '/api/admin/facilities'
        : '/api/admin/facilities';
      
      const method = editingFacility ? 'PUT' : 'POST';
      const body = editingFacility
        ? { ...formData, id: editingFacility.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchFacilities();
      setIsModalOpen(false);
      setEditingFacility(null);
      setFormData({ name: '', status: 'Active', capacity: '', price: '' });
      toast.success(
        editingFacility ? 'Facility updated successfully' : 'Facility added successfully'
      );
    } catch (error) {
      console.error('Error saving facility:', error);
      toast.error('Failed to save facility');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this facility?')) return;

    try {
      const response = await fetch(`/api/admin/facilities?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await fetchFacilities();
      toast.success('Facility deleted successfully');
    } catch (error) {
      console.error('Error deleting facility:', error);
      toast.error('Failed to delete facility');
    }
  };

  const handleEdit = (facility: Facility) => {
    setEditingFacility(facility);
    setFormData({
      name: facility.name,
      status: facility.status,
      capacity: facility.capacity.toString(),
      price: facility.price.replace('/hour', ''),
    });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingFacility(null);
    setFormData({ name: '', status: 'Active', capacity: '', price: '' });
    setIsModalOpen(true);
  };

  const filteredFacilities = Array.isArray(facilities)
    ? facilities.filter((facility: Facility) =>
        facility.name.toLowerCase().includes((searchTerm || '').toLowerCase())
      )
    : [];

  if (loading) {
    return <div className="text-center">Loading facilities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading facilities: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Facilities
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage your indoor sports facilities
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Add Facility
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search facilities..."
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option>All Status</option>
            <option>Active</option>
            <option>Maintenance</option>
            <option>Inactive</option>
          </select>
          <select className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6">
            <option>Sort by</option>
            <option>Name</option>
            <option>Status</option>
            <option>Last Updated</option>
          </select>
        </div>
      </div>

      {/* Facilities Table */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Capacity
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Last Updated
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredFacilities.map((facility) => (
                    <tr key={facility.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {facility.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          facility.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {facility.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {facility.capacity}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {facility.price}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {facility.lastUpdated}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(facility)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button 
                            onClick={() => handleDelete(facility.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
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
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
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
                    <option>Active</option>
                    <option>Maintenance</option>
                    <option>Inactive</option>
                  </select>
                </div>
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
                    Price ($/hour)
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
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {editingFacility ? 'Update' : 'Add'} Facility
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