export interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  notes: string;
  lastCalled?: Date;
  nextScheduledCall?: Date;
  tags: string[];
  crmId?: string;
}

export interface CallSession {
  id: string;
  contactId: string;
  agentId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  status: 'active' | 'completed' | 'failed';
  notes: string;
  recordingUrl?: string;
  followUpTasks: Task[];
}

export interface Task {
  id: string;
  contactId: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Agent {
  id: string;
  name: string;
  status: 'available' | 'on-call' | 'break' | 'offline';
  currentCallId?: string;
  totalCalls: number;
  successfulCalls: number;
  averageCallTime: number;
}