import React, { useState } from 'react';

const currencies = [
  'USD', 'EUR', 'GBP', 'JPY', 'KRW', 'AUD', 'CAD', 'CNY',
  'BRL', 'RUB', 'ZAR', 'MXN', 'INR'
];

const conversionRates: { [key: string]: number } = {
  USD: 1.00,
  EUR: 0.85,
  GBP: 0.73,
  JPY: 110.15,
  KRW: 1150.50,
  AUD: 1.30,
  CAD: 1.25,
  CNY: 6.45,
  BRL: 5.20,
  RUB: 75.50,
  ZAR: 14.50,
  MXN: 20.00,
  INR: 75.00
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const convertedAmount = (parseFloat(amount) * conversionRates[toCurrency]) / conversionRates[fromCurrency];
      setResult(`${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Currency Converter</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors"
        >
          Convert
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

export default CurrencyConverter;
