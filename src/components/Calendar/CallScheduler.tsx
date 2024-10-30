import React from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Bell } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function CallScheduler() {
  const selectedContact = useStore((state) => state.selectedContact);
  const updateContact = useStore((state) => state.updateContact);

  const handleScheduleCall = (date: Date) => {
    if (selectedContact) {
      updateContact({
        ...selectedContact,
        nextScheduledCall: date,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Schedule Call</h2>
        <Calendar className="h-6 w-6 text-blue-500" />
      </div>

      {selectedContact ? (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5 text-gray-400" />
            <input
              type="datetime-local"
              className="flex-1 p-2 border rounded-md"
              onChange={(e) => handleScheduleCall(new Date(e.target.value))}
              value={selectedContact.nextScheduledCall?.toISOString().slice(0, 16) || ''}
            />
          </div>

          <div className="flex items-center space-x-4">
            <Bell className="h-5 w-5 text-gray-400" />
            <select className="flex-1 p-2 border rounded-md">
              <option value="15">15 minutes before</option>
              <option value="30">30 minutes before</option>
              <option value="60">1 hour before</option>
            </select>
          </div>

          {selectedContact.nextScheduledCall && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-600">
                Next call scheduled for:{' '}
                <span className="font-semibold">
                  {format(selectedContact.nextScheduledCall, 'PPpp')}
                </span>
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Select a contact to schedule a call</p>
      )}
    </div>
  );
}