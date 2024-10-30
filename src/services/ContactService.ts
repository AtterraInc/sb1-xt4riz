import type { Contact } from '../types';
import Papa from 'papaparse';

export const ContactService = {
  exportContacts: (contacts: Contact[]): string => {
    return Papa.unparse(contacts, {
      header: true,
      columns: ['name', 'phone', 'email', 'company', 'status', 'notes']
    });
  },

  importContacts: async (file: File): Promise<Contact[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          const contacts: Contact[] = results.data.map((row: any) => ({
            id: crypto.randomUUID(),
            name: row.name,
            phone: row.phone,
            email: row.email,
            company: row.company,
            status: 'pending',
            notes: row.notes || '',
            tags: [],
            lastCalled: null
          }));
          resolve(contacts);
        },
        error: (error) => reject(error)
      });
    });
  }
};