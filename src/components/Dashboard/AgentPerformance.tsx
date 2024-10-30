import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useStore } from '../../store/useStore';

export function AgentPerformance() {
  const agents = useStore((state) => state.agents);

  const data = agents.map((agent) => ({
    name: agent.name,
    totalCalls: agent.totalCalls,
    successfulCalls: agent.successfulCalls,
    averageTime: agent.averageCallTime,
  }));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Agent Performance</h2>
      <div className="h-80">
        <BarChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalCalls" fill="#3B82F6" name="Total Calls" />
          <Bar dataKey="successfulCalls" fill="#10B981" name="Successful Calls" />
        </BarChart>
      </div>
    </div>
  );
}