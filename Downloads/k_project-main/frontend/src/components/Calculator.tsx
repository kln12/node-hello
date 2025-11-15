import React, { useState } from 'react';

const Calculator = () => {
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operand1: parseFloat(operand1),
          operand2: parseFloat(operand2),
          operation,
        }),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error('Calculation error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
          placeholder="Operand 1"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          value={operand2}
          onChange={(e) => setOperand2(e.target.value)}
          placeholder="Operand 2"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
        </select>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition-colors"
        >
          Calculate
        </button>
      </form>
      {result !== null && (
        <div className="mt-4 text-lg font-semibold">
          Result: <span className="text-indigo-600">{result}</span>
        </div>
      )}
    </div>
  );
};

export default Calculator;