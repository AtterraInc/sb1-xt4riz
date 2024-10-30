import React from 'react';
import { Phone, PhoneOff, Pause, Play, SkipForward } from 'lucide-react';

interface DialerControlsProps {
  isActive: boolean;
  isPaused: boolean;
  onToggleActive: () => void;
  onTogglePause: () => void;
  onSkip: () => void;
}

export function DialerControls({
  isActive,
  isPaused,
  onToggleActive,
  onTogglePause,
  onSkip,
}: DialerControlsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={onToggleActive}
          className={`p-4 rounded-full ${
            isActive
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-green-100 text-green-600 hover:bg-green-200'
          } transition-colors`}
        >
          {isActive ? (
            <PhoneOff className="h-6 w-6" />
          ) : (
            <Phone className="h-6 w-6" />
          )}
        </button>
        
        <button
          onClick={onTogglePause}
          disabled={!isActive}
          className={`p-4 rounded-full ${
            !isActive
              ? 'bg-gray-100 text-gray-400'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
          } transition-colors`}
        >
          {isPaused ? (
            <Play className="h-6 w-6" />
          ) : (
            <Pause className="h-6 w-6" />
          )}
        </button>
        
        <button
          onClick={onSkip}
          disabled={!isActive}
          className={`p-4 rounded-full ${
            !isActive
              ? 'bg-gray-100 text-gray-400'
              : 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
          } transition-colors`}
        >
          <SkipForward className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}