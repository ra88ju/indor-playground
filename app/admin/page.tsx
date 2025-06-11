"use client";

import {
  UsersIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Users',
    value: '2,543',
    change: '+12.3%',
    icon: UsersIcon,
  },
  {
    name: 'Active Bookings',
    value: '45',
    change: '+5.4%',
    icon: CalendarIcon,
  },
  {
    name: 'Facilities',
    value: '12',
    change: '+2',
    icon: BuildingOfficeIcon,
  },
  {
    name: 'Revenue',
    value: '$12,345',
    change: '+8.2%',
    icon: CurrencyDollarIcon,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'booking',
    description: 'New booking for Indoor Football',
    time: '5 minutes ago',
  },
  {
    id: 2,
    type: 'user',
    description: 'New user registration',
    time: '10 minutes ago',
  },
  {
    id: 3,
    type: 'payment',
    description: 'Payment received for Event Booking',
    time: '15 minutes ago',
  },
  {
    id: 4,
    type: 'facility',
    description: 'Facility status updated',
    time: '20 minutes ago',
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
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
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Recent Activity
          </h3>
          <div className="mt-6 flow-root">
            <ul role="list" className="-my-5 divide-y divide-gray-200">
              {recentActivities.map((activity) => (
                <li key={activity.id} className="py-4">
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
            <a
              href="#"
              className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              View all
            </a>
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
              <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                Add Booking
              </button>
              <button className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500">
                New Event
              </button>
              <button className="rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500">
                Add Facility
              </button>
              <button className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 