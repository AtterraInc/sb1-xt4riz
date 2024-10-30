import React, { useState } from 'react';
import { Save } from 'lucide-react';
import type { Contact } from '../types';

interface CallNotesProps {
  contact: Contact | null;
  onSaveNotes: (notes: string) => void;
}

export function CallNotes({ contact, onSaveNotes }: CallNotesProps) {
  const [notes, setNotes] = useState(contact?.notes || '');

  const handleSave = () => {
    onSaveNotes(notes);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Call Notes</h3>
        <button
          onClick={handleSave}
          className="flex items-center px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </button>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Enter call notes here..."
        className="w-full h-32 p-3 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}