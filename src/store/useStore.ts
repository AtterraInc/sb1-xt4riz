import { create } from 'zustand';
import type { Contact, CallSession, Task, Agent } from '../types';

interface Store {
  contacts: Contact[];
  callSessions: CallSession[];
  tasks: Task[];
  agents: Agent[];
  currentAgent: Agent | null;
  selectedContact: Contact | null;
  isDialerActive: boolean;
  isPaused: boolean;
  
  setSelectedContact: (contact: Contact | null) => void;
  toggleDialer: () => void;
  togglePause: () => void;
  addCallSession: (session: CallSession) => void;
  updateContact: (contact: Contact) => void;
  addTask: (task: Task) => void;
  updateAgentStatus: (agentId: string, status: Agent['status']) => void;
}

const initialContacts: Contact[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+1 (555) 123-4567',
    email: 'john@example.com',
    company: 'Tech Corp',
    status: 'pending',
    notes: '',
    tags: ['priority', 'tech'],
    lastCalled: new Date(Date.now() - 86400000),
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1 (555) 234-5678',
    email: 'sarah@example.com',
    company: 'Marketing Inc',
    status: 'completed',
    notes: 'Follow up next week',
    tags: ['marketing'],
    lastCalled: new Date(),
  },
  {
    id: '3',
    name: 'Michael Brown',
    phone: '+1 (555) 345-6789',
    email: 'michael@example.com',
    company: 'Sales Co',
    status: 'failed',
    notes: 'Try again tomorrow',
    tags: ['sales'],
    lastCalled: new Date(Date.now() - 172800000),
  },
];

const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Alex Turner',
    status: 'available',
    totalCalls: 150,
    successfulCalls: 120,
    averageCallTime: 180,
  },
  {
    id: '2',
    name: 'Emma Wilson',
    status: 'on-call',
    totalCalls: 200,
    successfulCalls: 160,
    averageCallTime: 210,
  },
];

const initialTasks: Task[] = [
  {
    id: '1',
    contactId: '1',
    title: 'Schedule demo',
    description: 'Product demonstration for new features',
    dueDate: new Date(Date.now() + 86400000),
    status: 'pending',
    priority: 'high',
  },
  {
    id: '2',
    contactId: '2',
    title: 'Send proposal',
    description: 'Marketing campaign proposal',
    dueDate: new Date(Date.now() + 172800000),
    status: 'completed',
    priority: 'medium',
  },
];

export const useStore = create<Store>((set) => ({
  contacts: initialContacts,
  callSessions: [],
  tasks: initialTasks,
  agents: initialAgents,
  currentAgent: initialAgents[0],
  selectedContact: null,
  isDialerActive: false,
  isPaused: false,

  setSelectedContact: (contact) => set({ selectedContact: contact }),
  toggleDialer: () => set((state) => ({ isDialerActive: !state.isDialerActive })),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  addCallSession: (session) => 
    set((state) => ({ callSessions: [...state.callSessions, session] })),
  updateContact: (contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) => 
        c.id === contact.id ? contact : c
      ),
    })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateAgentStatus: (agentId, status) =>
    set((state) => ({
      agents: state.agents.map((agent) =>
        agent.id === agentId ? { ...agent, status } : agent
      ),
    })),
}));