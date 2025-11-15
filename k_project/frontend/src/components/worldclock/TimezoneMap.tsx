import React from 'react';
import { Globe } from 'lucide-react';

const TimezoneMap = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-6 w-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-800">Timezone Map</h2>
      </div>
      <div className="aspect-[16/9] w-full rounded-lg overflow-hidden">
        <iframe
          src="https://embed.timeanddate.com/worldclock/fullscreen.html"
          className="w-full h-full border-0"
          title="World Clock Map"
        ></iframe>
      </div>
    </div>
  );
};

export default TimezoneMap;