import React from 'react';
import { Clock } from 'lucide-react';

interface TimeDisplayProps {
  city: string;
  time: string;
  date: string;
  timezone: string;
}

const TimeDisplay = ({ city, time, date, timezone }: TimeDisplayProps) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm">
      <Clock className="h-6 w-6 text-indigo-500" />
      <div>
        <h3 className="font-semibold text-gray-800">{city}</h3>
        <p className="text-2xl font-bold text-indigo-600">{time}</p>
        <p className="text-sm text-gray-500">{date}</p>
        <p className="text-xs text-gray-400">{timezone}</p>
      </div>
    </div>
  );
};

export default TimeDisplay;