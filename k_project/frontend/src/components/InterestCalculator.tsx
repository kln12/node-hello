import React, { useState } from 'react';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculateInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    
    const simpleInterest = (p * r * t) / 100;
    const totalAmount = p + simpleInterest;
    
    setResult(`Interest: $${simpleInterest.toFixed(2)}, Total Amount: $${totalAmount.toFixed(2)}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Interest Calculator</h2>
      <form onSubmit={calculateInterest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Principal Amount ($)
          </label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal amount"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interest Rate (%)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter interest rate"
            className="w-full p-2 border rounded"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time (Years)
          </label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter time in years"
            className="w-full p-2 border rounded"
            step="0.1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors"
        >
          Calculate Interest
        </button>
      </form>
      {result && (
        <div className="mt-4 text-lg font-semibold">
          <span className="text-indigo-600">{result}</span>
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;