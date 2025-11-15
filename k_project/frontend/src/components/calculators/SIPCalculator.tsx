import React, { useState } from 'react';

const SIPCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [returnRate, setReturnRate] = useState('');
  const [timePeriod, setTimePeriod] = useState('');
  const [result, setResult] = useState<{ totalInvestment: number; estimatedReturns: number; totalValue: number } | null>(null);

  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(returnRate) / 100 / 12; // Monthly rate
    const n = parseFloat(timePeriod) * 12; // Total months

    if (P && r && n) {
      const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const totalInvestment = P * n;
      const estimatedReturns = futureValue - totalInvestment;

      setResult({
        totalInvestment: Math.round(totalInvestment),
        estimatedReturns: Math.round(estimatedReturns),
        totalValue: Math.round(futureValue)
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Investment (₹)</label>
        <input
          type="number"
          value={monthlyInvestment}
          onChange={(e) => setMonthlyInvestment(e.target.value)}
          placeholder="5000"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Expected Return Rate (% per annum)</label>
        <input
          type="number"
          value={returnRate}
          onChange={(e) => setReturnRate(e.target.value)}
          placeholder="12"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Time Period (Years)</label>
        <input
          type="number"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          placeholder="10"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <button
        onClick={calculateSIP}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Calculate SIP
      </button>

      {result && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Results:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Investment:</span>
              <span className="font-semibold">₹{result.totalInvestment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Returns:</span>
              <span className="font-semibold text-green-600">₹{result.estimatedReturns.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="text-gray-900 font-medium">Total Value:</span>
              <span className="font-bold text-blue-600">₹{result.totalValue.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SIPCalculator;