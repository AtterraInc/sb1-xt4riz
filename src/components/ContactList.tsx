import React from 'react';
import { Phone, User, Clock, CheckCircle, XCircle } from 'lucide-react';
import type { Contact } from '../types';

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  selectedContactId?: string;
}

export function ContactList({ contacts, onSelectContact, selectedContactId }: ContactListProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Contacts Queue</h2>
      </div>
      <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedContactId === contact.id ? 'bg-blue-50' : ''
            }`}
            onClick={() => onSelectContact(contact)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-sm text-gray-500">{contact.phone}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {contact.status === 'completed' && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {contact.status === 'failed' && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                {contact.lastCalled && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {new Date(contact.lastCalled).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}