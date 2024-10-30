import React from 'react';
import { PhoneCall, Clock, CheckCircle, XCircle } from 'lucide-react';

interface StatsProps {
  totalCalls: number;
  completedCalls: number;
  failedCalls: number;
  averageCallTime: number;
}

export function Stats({
  totalCalls,
  completedCalls,
  failedCalls,
  averageCallTime,
}: StatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {[
        {
          label: 'Total Calls',
          value: totalCalls,
          icon: PhoneCall,
          color: 'blue',
        },
        {
          label: 'Completed',
          value: completedCalls,
          icon: CheckCircle,
          color: 'green',
        },
        {
          label: 'Failed',
          value: failedCalls,
          icon: XCircle,
          color: 'red',
        },
        {
          label: 'Avg. Call Time',
          value: `${averageCallTime}s`,
          icon: Clock,
          color: 'purple',
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow p-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold mt-1">{stat.value}</p>
            </div>
            <stat.icon
              className={`h-8 w-8 text-${stat.color}-500`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}