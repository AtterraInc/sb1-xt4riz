import React, { useState } from 'react';
import { CheckSquare, Clock, Plus } from 'lucide-react';
import { useStore } from '../../store/useStore';
import type { Task } from '../../types';

export function TaskManager() {
  const [newTask, setNewTask] = useState('');
  const selectedContact = useStore((state) => state.selectedContact);
  const tasks = useStore((state) => state.tasks);
  const addTask = useStore((state) => state.addTask);

  const handleAddTask = () => {
    if (selectedContact && newTask.trim()) {
      const task: Task = {
        id: crypto.randomUUID(),
        contactId: selectedContact.id,
        title: newTask,
        description: '',
        dueDate: new Date(),
        status: 'pending',
        priority: 'medium',
      };
      addTask(task);
      setNewTask('');
    }
  };

  const contactTasks = tasks.filter(
    (task) => task.contactId === selectedContact?.id
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Follow-up Tasks</h2>

      {selectedContact ? (
        <>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 p-2 border rounded-md"
            />
            <button
              onClick={handleAddTask}
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-2">
            {contactTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
              >
                <div className="flex items-center space-x-3">
                  <CheckSquare className={`h-5 w-5 ${
                    task.status === 'completed' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <span className={task.status === 'completed' ? 'line-through' : ''}>
                    {task.title}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select a contact to manage tasks</p>
      )}
    </div>
  );
}