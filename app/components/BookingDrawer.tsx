import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface BookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  facilityId: string;
  facilityName: string;
  pricePerHour: string;
}

const timeSlots = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
  '20:00', '21:00', '22:00'
];

const paymentMethods = [
  { id: 'bkash', name: 'bKash', icon: '💳' },
  { id: 'nagad', name: 'Nagad', icon: '💳' },
  { id: 'stripe', name: 'Credit Card', icon: '💳' }
];

export default function BookingDrawer({ 
  isOpen, 
  onClose, 
  facilityId, 
  facilityName,
  pricePerHour 
}: BookingDrawerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);

  const handleDateSelect = (value: any) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setBookingStep(2);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setBookingStep(3);
  };

  const handlePaymentSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleBookingSubmit = async () => {
    setIsProcessing(true);
    try {
      // Here we'll integrate with your payment gateway
      const bookingData = {
        facilityId,
        date: format(selectedDate, 'yyyy-MM-dd'),
        timeSlot: selectedTimeSlot,
        paymentMethod: selectedPaymentMethod,
        amount: pricePerHour.replace('From $', '')
      };

      // Make API call to your backend
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error('Booking failed');

      // Show success message and close drawer
      alert('Booking confirmed successfully!');
      onClose();
    } catch (error) {
      alert('Failed to process booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween' }}
          className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50"
        >
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Book {facilityName}</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto">
              {bookingStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Select Date</h3>
                  <Calendar
                    onChange={handleDateSelect}
                    value={selectedDate}
                    minDate={new Date()}
                    className="w-full"
                  />
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Select Time Slot</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-2 rounded ${
                          selectedTimeSlot === time
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Select Payment Method</h3>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentSelect(method.id)}
                        className={`w-full p-4 rounded flex items-center space-x-3 ${
                          selectedPaymentMethod === method.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <span>{method.icon}</span>
                        <span>{method.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Amount:</span>
                <span>{pricePerHour}</span>
              </div>
              
              <button
                onClick={handleBookingSubmit}
                disabled={!selectedDate || !selectedTimeSlot || !selectedPaymentMethod || isProcessing}
                className={`w-full py-3 rounded-lg font-semibold ${
                  !selectedDate || !selectedTimeSlot || !selectedPaymentMethod || isProcessing
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isProcessing ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 