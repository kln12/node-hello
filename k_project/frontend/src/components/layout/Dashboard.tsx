import React, { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface DashboardProps {
  children?: React.ReactNode;
  activeTool?: string | null;
  onToolChange?: (tool: string | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ children, activeTool, onToolChange }) => {
  const { logout } = useAuth();
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showDataDropdown, setShowDataDropdown] = useState(false);
  const [showCalculatorSubmenu, setShowCalculatorSubmenu] = useState(false);
  
  const solutionsRef = useRef<HTMLDivElement>(null);
  const dataRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
  };

  const openTool = (tool: string) => {
    if (onToolChange) {
      onToolChange(tool);
    }
    setShowSolutionsDropdown(false);
    setShowDataDropdown(false);
    setShowCalculatorSubmenu(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setShowSolutionsDropdown(false);
        setShowCalculatorSubmenu(false);
      }
      if (dataRef.current && !dataRef.current.contains(event.target as Node)) {
        setShowDataDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-8">
              <h1 className="text-3xl font-semibold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                K_Market
              </h1>
              
              <nav className="flex space-x-6">
                {/* Solutions Dropdown */}
                <div className="relative" ref={solutionsRef}>
                  <button
                    onClick={() => {
                      setShowSolutionsDropdown(!showSolutionsDropdown);
                      setShowDataDropdown(false);
                    }}
                    className="flex items-center space-x-1 text-base font-medium text-gray-700 hover:text-gray-900 py-6"
                  >
                    <span>Solutions</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSolutionsDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showSolutionsDropdown && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-white shadow-lg rounded-b-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => openTool('currency-converter')}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Currency Converter
                      </button>
                      <button
                        onClick={() => openTool('interest-calculator')}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Interest Calculator
                      </button>
                      
                      {/* Calculator Tools with Submenu */}
                      <div 
                        className="relative"
                        onMouseEnter={() => setShowCalculatorSubmenu(true)}
                        onMouseLeave={() => setShowCalculatorSubmenu(false)}
                      >
                        <button
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span>Calculator Tools</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        {showCalculatorSubmenu && (
                          <div 
                            className="absolute left-full top-0 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 ml-1 z-50"
                          >
                            <button
                              onClick={() => openTool('sip-calculator')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              SIP Calculator
                            </button>
                            <button
                              onClick={() => openTool('cagr-calculator')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              CAGR Calculator
                            </button>
                            <button
                              onClick={() => openTool('pe-calculator')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              P/E Calculator
                            </button>
                            <button
                              onClick={() => openTool('risk-calculator')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            >
                              Risk Calculator
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Data Dropdown */}
                <div className="relative" ref={dataRef}>
                  <button
                    onClick={() => {
                      setShowDataDropdown(!showDataDropdown);
                      setShowSolutionsDropdown(false);
                      setShowCalculatorSubmenu(false);
                    }}
                    className="flex items-center space-x-1 text-base font-medium text-gray-700 hover:text-gray-900 py-6"
                  >
                    <span>Data</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showDataDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDataDropdown && (
                    <div className="absolute top-full left-0 mt-0 w-56 bg-white shadow-lg rounded-b-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => openTool('financial-news')}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Financial News
                      </button>
                      <button
                        onClick={() => openTool('currency-trends')}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Currency Trends
                      </button>
                      <button
                        onClick={() => openTool('notes')}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Notes
                      </button>
                      <button
                        onClick={() => openTool('world-clock')}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        World Clock
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
            
            <div className="flex items-center">
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {children}
      </main>
    </div>
  );
};

export default Dashboard;