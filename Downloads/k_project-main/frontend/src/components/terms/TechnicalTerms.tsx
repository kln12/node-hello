import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { financialTerms } from '../../data/financialTerms';

const FinancialTerms = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTerm, setExpandedTerm] = useState<string | null>(null);

  const filteredTerms = financialTerms.filter(term =>
    term.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Book className="h-6 w-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-800">Financial Terms</h2>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {filteredTerms.map((term) => (
          <div
            key={term.name}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedTerm(expandedTerm === term.name ? null : term.name)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <span className="font-medium text-gray-900">{term.name}</span>
              {expandedTerm === term.name ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </button>
            {expandedTerm === term.name && (
              <div className="px-4 py-3 bg-white">
                <p className="text-gray-600">{term.definition}</p>
                {term.example && (
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Example:</strong> {term.example}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialTerms;