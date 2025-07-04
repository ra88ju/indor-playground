"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  available: boolean;
}

interface Order {
  id: number;
  items: {
    menuItemId: number;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'preparing' | 'completed' | 'cancelled';
  createdAt: string;
  customerName: string;
}

const categories = [
  'Starters',
  'Main Course',
  'Beverages',
  'Desserts',
  'Snacks',
];

export default function AdminRestaurantPage() {
  const [activeTab, setActiveTab] = useState<'menu' | 'orders'>('menu');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Starters',
    available: true,
  });

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/admin/restaurant/menu');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error: any) {
      console.error('Error fetching menu items:', error);
      toast.error('Failed to load menu items');
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/restaurant/orders');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'menu') {
          await fetchMenuItems();
        } else {
          await fetchOrders();
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/restaurant/menu', {
        method: selectedItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          id: selectedItem?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchMenuItems();
      setIsModalOpen(false);
      setSelectedItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Starters',
        available: true,
      });
      toast.success(`Menu item ${selectedItem ? 'updated' : 'added'} successfully`);
    } catch (error: any) {
      console.error('Error saving menu item:', error);
      toast.error(error.message || 'Failed to save menu item');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this menu item?')) return;

    try {
      const response = await fetch(`/api/admin/restaurant/menu?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchMenuItems();
      toast.success('Menu item deleted successfully');
    } catch (error: any) {
      console.error('Error deleting menu item:', error);
      toast.error(error.message || 'Failed to delete menu item');
    }
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
    });
    setIsModalOpen(true);
  };

  const handleOrderStatusChange = async (orderId: number, newStatus: Order['status']) => {
    try {
      const response = await fetch(`/api/admin/restaurant/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchOrders();
      toast.success('Order status updated successfully');
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast.error(error.message || 'Failed to update order status');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Restaurant Management
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage menu items and orders
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('menu')}
            className={`${
              activeTab === 'menu'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Menu Items
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`${
              activeTab === 'orders'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Orders
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'menu' ? (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Add Menu Item
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
              >
                <div className="flex-1 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {item.price.toFixed(2)}
                  </div>
                  <div className="mt-2 text-sm text-gray-500">{item.category}</div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Items
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Time
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      #{order.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {order.customerName}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      <ul className="list-disc list-inside">
                        {order.items.map((item, index) => (
                          <li key={index}>
                            {item.quantity}x {item.name} (${item.price.toFixed(2)})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : order.status === 'preparing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      {order.status === 'pending' && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleOrderStatusChange(order.id, 'preparing')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <ClockIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => handleOrderStatusChange(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircleIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                      {order.status === 'preparing' && (
                        <button
                          onClick={() => handleOrderStatusChange(order.id, 'completed')}
                          className="text-green-600 hover:text-green-900"
                        >
                          <CheckCircleIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="absolute right-0 top-0 pr-4 pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedItem(null);
                    setFormData({
                      name: '',
                      description: '',
                      price: '',
                      category: 'Starters',
                      available: true,
                    });
                  }}
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <div className="relative mt-1 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="available"
                    name="available"
                    type="checkbox"
                    checked={formData.available}
                    onChange={(e) =>
                      setFormData({ ...formData, available: e.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                    Available
                  </label>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {selectedItem ? 'Update' : 'Add'} Menu Item
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