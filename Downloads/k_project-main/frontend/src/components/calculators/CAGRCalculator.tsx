import React, { useState } from 'react';

const CAGRCalculator = () => {
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [duration, setDuration] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateCAGR = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);
    const years = parseFloat(duration);

    if (initial && final && years) {
      const cagr = (Math.pow(final / initial, 1 / years) - 1) * 100;
      setResult(cagr);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Initial Investment (₹)</label>
        <input
          type="number"
          value={initialValue}
          onChange={(e) => setInitialValue(e.target.value)}
          placeholder="100000"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Final Value (₹)</label>
        <input
          type="number"
          value={finalValue}
          onChange={(e) => setFinalValue(e.target.value)}
          placeholder="200000"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Years)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <button
        onClick={calculateCAGR}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Calculate CAGR
      </button>

      {result !== null && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Results:</h3>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Compound Annual Growth Rate</p>
            <p className="text-3xl font-bold text-blue-600">{result.toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CAGRCalculator;