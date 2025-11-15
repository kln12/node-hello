import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Calculator from './components/Calculator';
import CurrencyConverter from './components/CurrencyConverter';
import InterestCalculator from './components/InterestCalculator';
import WorldClock from './components/worldclock/WorldClock';
import NotesManager from './components/notes/NotesManager';
import MoneyGraph from './components/money-graph/MoneyGraph';
import LoginPage from './pages/LoginPage';
import Dashboard from './components/layout/Dashboard';
import { useAuth } from './hooks/useAuth';

// Import new calculators
import SIPCalculator from './components/calculators/SIPCalculator';
import CAGRCalculator from './components/calculators/CAGRCalculator';
import PECalculator from './components/calculators/PECalculator';
import RiskCalculator from './components/calculators/RiskCalculator';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
    </Routes>
  );
}

function DashboardPage() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const closeTool = () => {
    setActiveTool(null);
  };

  return (
    <Dashboard activeTool={activeTool} onToolChange={setActiveTool}>
      {/* Default Dashboard View */}
      {!activeTool && (
        <div className="text-center py-20">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">Welcome to K_Market</h2>
          <p className="text-gray-600 text-lg">Select a tool from the menu above to get started</p>
        </div>
      )}

      {/* Currency Converter Tool */}
      {activeTool === 'currency-converter' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Currency Converter</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <CurrencyConverter />
          </div>
        </div>
      )}

      {/* Interest Calculator Tool */}
      {activeTool === 'interest-calculator' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Interest Calculator</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <InterestCalculator />
          </div>
        </div>
      )}

      {/* SIP Calculator */}
      {activeTool === 'sip-calculator' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">SIP Calculator</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <SIPCalculator />
          </div>
        </div>
      )}

      {/* CAGR Calculator */}
      {activeTool === 'cagr-calculator' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">CAGR Calculator</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <CAGRCalculator />
          </div>
        </div>
      )}

      {/* P/E Calculator */}
      {activeTool === 'pe-calculator' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">P/E Ratio Calculator</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <PECalculator />
          </div>
        </div>
      )}

      {/* Risk Calculator */}
      {activeTool === 'risk-calculator' && (
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Risk Calculator</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <RiskCalculator />
          </div>
        </div>
      )}

      {/* Currency Trends */}
      {activeTool === 'currency-trends' && (
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">📈 Currency Trends</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <MoneyGraph />
          </div>
        </div>
      )}

      {/* Notes */}
      {activeTool === 'notes' && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Notes</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <NotesManager />
          </div>
        </div>
      )}

      {/* World Clock */}
      {activeTool === 'world-clock' && (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">World Clock</h2>
              <button onClick={closeTool} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <WorldClock />
          </div>
        </div>
      )}
    </Dashboard>
  );
}

export default App;