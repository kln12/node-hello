import React, { useState } from 'react';

const RiskCalculator = () => {
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [riskLevel, setRiskLevel] = useState('medium');
  const [timeHorizon, setTimeHorizon] = useState('');
  const [result, setResult] = useState<any>(null);

  const calculateRisk = () => {
    const amount = parseFloat(investmentAmount);
    const years = parseFloat(timeHorizon);

    if (amount && years) {
      let expectedReturn = 0;
      let volatility = 0;

      switch (riskLevel) {
        case 'low':
          expectedReturn = 6;
          volatility = 5;
          break;
        case 'medium':
          expectedReturn = 12;
          volatility = 15;
          break;
        case 'high':
          expectedReturn = 18;
          volatility = 25;
          break;
      }

      const futureValue = amount * Math.pow(1 + expectedReturn / 100, years);
      const potentialLoss = amount * (volatility / 100);

      setResult({
        expectedReturn,
        volatility,
        futureValue: Math.round(futureValue),
        potentialLoss: Math.round(potentialLoss),
        riskLevel
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Investment Amount (₹)</label>
        <input
          type="number"
          value={investmentAmount}
          onChange={(e) => setInvestmentAmount(e.target.value)}
          placeholder="100000"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
        <select
          value={riskLevel}
          onChange={(e) => setRiskLevel(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="low">Low Risk (Conservative)</option>
          <option value="medium">Medium Risk (Moderate)</option>
          <option value="high">High Risk (Aggressive)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Time Horizon (Years)</label>
        <input
          type="number"
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(e.target.value)}
          placeholder="5"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <button
        onClick={calculateRisk}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Calculate Risk
      </button>

      {result && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Risk Assessment:</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Profile:</span>
              <span className="font-semibold capitalize">{result.riskLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Return:</span>
              <span className="font-semibold text-green-600">{result.expectedReturn}% p.a.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Volatility:</span>
              <span className="font-semibold text-orange-600">{result.volatility}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Potential Future Value:</span>
              <span className="font-semibold text-blue-600">₹{result.futureValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Potential Annual Loss:</span>
              <span className="font-semibold text-red-600">₹{result.potentialLoss.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskCalculator;