import React, { useState } from 'react';

const PECalculator = () => {
  const [stockPrice, setStockPrice] = useState('');
  const [earningsPerShare, setEarningsPerShare] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculatePE = () => {
    const price = parseFloat(stockPrice);
    const eps = parseFloat(earningsPerShare);

    if (price && eps) {
      const peRatio = price / eps;
      setResult(peRatio);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock Price (₹)</label>
        <input
          type="number"
          value={stockPrice}
          onChange={(e) => setStockPrice(e.target.value)}
          placeholder="1500"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Earnings Per Share (₹)</label>
        <input
          type="number"
          value={earningsPerShare}
          onChange={(e) => setEarningsPerShare(e.target.value)}
          placeholder="75"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>
      <button
        onClick={calculatePE}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Calculate P/E Ratio
      </button>

      {result !== null && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">Results:</h3>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Price-to-Earnings Ratio</p>
            <p className="text-3xl font-bold text-blue-600">{result.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-2">
              {result < 15 ? 'Potentially Undervalued' : result > 25 ? 'Potentially Overvalued' : 'Fairly Valued'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PECalculator;