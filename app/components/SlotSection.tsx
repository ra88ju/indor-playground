import React from "react";

// Types - Define these here or import from a shared types file if you have one
type Slot = { time: string; status: string };
type Facility = { title: string; icon: string; image: string; slots: Slot[] };

export default function SlotSection({
    modalOpen,
    setModalOpen,
    selectedFacility,
    handleBookSlot,
    successMsg,
}: { // Add types for props
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Use proper SetStateAction type
    selectedFacility: Facility | null;
    handleBookSlot: (facilityTitle: string, slotTime: string) => void; // handleBookSlot type
    successMsg: string | null; // successMsg type
}) {

  return (
    /* Modal for viewing and booking slots */
    <>
      {modalOpen && selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="absolute inset-0" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl p-8 w-full max-w-md z-10 animate-fade-in-up">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3 text-gray-800 border-b pb-4">
              <span className="text-3xl">{selectedFacility.icon}</span>
              {selectedFacility.title} - Game Times
            </h2>
            {successMsg && (
              <div className="mb-6 text-green-700 text-center font-semibold bg-green-100 rounded-lg p-3 border border-green-300 animate-fade-in text-lg shadow-md">
                {successMsg}
              </div>
            )}
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {selectedFacility.slots.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No slots available.</div>
              ) : (
                selectedFacility.slots.map((slot: Slot) => (
                  <div key={slot.time} className={`flex items-center justify-between border rounded-lg px-6 py-4 transition-colors duration-200 shadow-sm
                    ${slot.status === "booked" ? "bg-gray-100 text-gray-600 border-gray-300" : "bg-white text-gray-900 border-blue-400 hover:bg-blue-50"}
                  `}>
                    <span className="font-semibold text-lg">{slot.time}</span>
                    {slot.status === "free" ? (
                      <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-sm shadow"
                        onClick={() => handleBookSlot(selectedFacility.title, slot.time)}
                      >
                        Book
                      </button>
                    ) : (
                      <span className="text-gray-600 font-semibold text-sm">Booked</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 