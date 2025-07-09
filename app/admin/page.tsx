"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  UsersIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface DashboardStats {
  totalUsers: { value: number; change: string };
  activeBookings: { value: number; change: string };
  facilities: { value: number; change: string };
  revenue: { value: number; change: string };
}

interface Activity {
  id: number;
  type: string;
  description: string;
  time: string;
  userId?: string;
  entityId?: string | null;
}

const statsConfig = [
  {
    key: 'totalUsers',
    name: 'Total Users',
    icon: UsersIcon,
    formatValue: (value: number) => value.toLocaleString(),
  },
  {
    key: 'activeBookings',
    name: 'Active Bookings',
    icon: CalendarIcon,
    formatValue: (value: number) => value.toString(),
  },
  {
    key: 'facilities',
    name: 'Facilities',
    icon: BuildingOfficeIcon,
    formatValue: (value: number) => value.toString(),
  },
  {
    key: 'revenue',
    name: 'Revenue',
    icon: CurrencyDollarIcon,
    formatValue: (value: number) => `$${value.toLocaleString()}`,
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStats(data.stats);
      setActivities(data.recentActivities);
      setError(null);
    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'booking':
        router.push('/admin/slots');
        break;
      case 'event':
        router.push('/admin/events');
        break;
      case 'facility':
        router.push('/admin/facilities');
        break;
      case 'report':
        router.push('/admin/reports');
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ArrowPathIcon className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button
          onClick={fetchDashboardData}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowPathIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Retry
        </button>
      </div>
    );
  }

  return (

    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => {
          const statData = stats?.[stat.key as keyof DashboardStats];
          return (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {stat.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {statData ? stat.formatValue(statData.value) : '-'}
                </p>
                <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                  {statData?.change || '-'}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Recent Activity
            </h3>
            <button
              onClick={fetchDashboardData}
              className="rounded-md text-gray-400 hover:text-gray-500"
              title="Refresh"
            >
              <ArrowPathIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {activities.map((activity) => (
                <li key={activity.id ?? `${activity.type}-${activity.description}-${activity.time}` } className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="truncate text-sm text-gray-500">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin/reports')}
              className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View all
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Quick Actions
            </h3>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={() => handleQuickAction('booking')}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
              >
                Add Booking
              </button>
              <button
                onClick={() => handleQuickAction('event')}
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
              >
                New Event
              </button>
              <button
                onClick={() => handleQuickAction('facility')}
                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500"
              >
                Add Facility
              </button>
              <button
                onClick={() => handleQuickAction('report')}
                className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}