import React from 'react';
import { ContactList } from './components/ContactList';
import { DialerControls } from './components/DialerControls';
import { CallNotes } from './components/CallNotes';
import { Stats } from './components/Stats';
import { AgentPerformance } from './components/Dashboard/AgentPerformance';
import { CallScheduler } from './components/Calendar/CallScheduler';
import { TaskManager } from './components/Tasks/TaskManager';
import { useStore } from './store/useStore';

function App() {
  const {
    contacts,
    selectedContact,
    setSelectedContact,
    isDialerActive,
    isPaused,
    toggleDialer,
    togglePause,
    updateContact,
  } = useStore();

  const handleSkip = () => {
    // Implementation for skipping to next contact
  };

  const handleSaveNotes = (notes: string) => {
    if (selectedContact) {
      updateContact({
        ...selectedContact,
        notes,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Power Dialer</h1>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
              Agent Online
            </span>
          </div>
        </div>

        <Stats
          totalCalls={150}
          completedCalls={120}
          failedCalls={30}
          averageCallTime={180}
        />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <ContactList
              contacts={contacts}
              onSelectContact={setSelectedContact}
              selectedContactId={selectedContact?.id}
            />
          </div>

          <div className="col-span-6 space-y-6">
            <DialerControls
              isActive={isDialerActive}
              isPaused={isPaused}
              onToggleActive={toggleDialer}
              onTogglePause={togglePause}
              onSkip={handleSkip}
            />

            <CallNotes
              contact={selectedContact}
              onSaveNotes={handleSaveNotes}
            />

            <AgentPerformance />
          </div>

          <div className="col-span-3 space-y-6">
            <CallScheduler />
            <TaskManager />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;