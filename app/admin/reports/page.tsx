"use client";

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  DocumentChartBarIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

interface Report {
  id: number;
  type: string;
  title: string;
  dateRange: {
    start: string;
    end: string;
  };
  data: any;
  createdAt: string;
  status: string;
}

const reportTypes = [
  { id: 'bookings', name: 'Bookings Report', icon: CalendarIcon },
  { id: 'facilities', name: 'Facilities Analysis', icon: BuildingOfficeIcon },
];

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('bookings');
  const [formData, setFormData] = useState({
    type: 'bookings',
    title: '',
    dateRange: {
      start: '',
      end: '',
    },
  });

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/reports');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReports(data);
    } catch (error: any) {
      setError(error);
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchReports();
      setIsModalOpen(false);
      setFormData({
        type: 'bookings',
        title: '',
        dateRange: {
          start: '',
          end: '',
        },
      });
      toast.success('Report generated successfully');
    } catch (error: any) {
      console.error('Error generating report:', error);
      toast.error(error.message || 'Failed to generate report');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this report?')) return;

    try {
      const response = await fetch(`/api/admin/reports?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      await fetchReports();
      toast.success('Report deleted successfully');
    } catch (error: any) {
      console.error('Error deleting report:', error);
      toast.error(error.message || 'Failed to delete report');
    }
  };

  const filteredReports = reports.filter(
    (report) => selectedType === 'all' || report.type === selectedType
  );

  if (loading) {
    return <div className="text-center">Loading reports...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">Error loading reports: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Reports
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            View and generate reports
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className="block rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="all">All Reports</option>
          {reportTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredReports.map((report) => {
          const ReportIcon = report.type === 'bookings' ? DocumentChartBarIcon : ChartBarIcon;
          return (
            <div
              key={report.id}
              className="relative flex flex-col overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
            >
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ReportIcon className="h-6 w-6 text-gray-400" />
                    <h3 className="ml-2 text-lg font-medium text-gray-900 truncate">
                      {report.title}
                    </h3>
                  </div>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      report.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {report.status}
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    {report.dateRange.start} to {report.dateRange.end}
                  </div>
                  {report.type === 'bookings' && (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <DocumentChartBarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        Total Bookings: {report.data?.totalBookings}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <CurrencyDollarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        Revenue: ${report.data?.totalRevenue}
                      </div>
                    </div>
                  )}
                  {report.type === 'facilities' && (
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <BuildingOfficeIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        Hours Booked: {report.data?.totalHoursBooked}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <ChartBarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        Utilization: {report.data?.utilizationRate}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                    Report Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    {reportTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Report Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
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
                      value={formData.dateRange.start}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateRange: { ...formData.dateRange, start: e.target.value },
                        })
                      }
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
                      value={formData.dateRange.end}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dateRange: { ...formData.dateRange, end: e.target.value },
                        })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      required
                    />
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    Generate Report
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