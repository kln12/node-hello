import React, { useState, useEffect } from 'react';
import TimeDisplay from './TimeDisplay';
import { formatInTimeZone } from 'date-fns-tz';

const cities = [
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'India', timezone: 'Asia/Kolkata' } // Added India
];

const WorldClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">World Clock</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <TimeDisplay
            key={city.name}
            city={city.name}
            time={formatInTimeZone(currentTime, city.timezone, 'hh:mm:ss a')} // Changed to 12-hour format
            date={formatInTimeZone(currentTime, city.timezone, 'MMM dd, yyyy')}
            timezone={city.timezone}
          />
        ))}
      </div>
    </div>
  );
};

export default WorldClock;
