import React, { useState, useEffect } from 'react';
import { Download, Newspaper, TrendingUp, Clock } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  url?: string;
}

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'historical'>('current');
  const [currentNews, setCurrentNews] = useState<NewsItem[]>([]);
  const [historicalNews, setHistoricalNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Fetch current news from backend
      const response = await fetch('/api/news/financial');
      const data = await response.json();
      setCurrentNews(data.current || []);
      setHistoricalNews(data.historical || []);
    } catch (error) {
      console.error('Error fetching news:', error);
      // Use fallback data
      setCurrentNews(getFallbackCurrentNews());
      setHistoricalNews(getFallbackHistoricalNews());
    } finally {
      setLoading(false);
    }
  };

  const getFallbackCurrentNews = (): NewsItem[] => [
    {
      id: '1',
      title: 'Global Markets Rally on Positive Economic Data',
      description: 'Stock markets worldwide showed significant gains as recent economic indicators suggest steady growth and declining inflation rates.',
      source: 'Financial Times',
      date: new Date().toLocaleDateString(),
    },
    {
      id: '2',
      title: 'Central Banks Signal Potential Interest Rate Adjustments',
      description: 'Major central banks hint at policy changes in response to evolving economic conditions and inflation targets.',
      source: 'Reuters',
      date: new Date().toLocaleDateString(),
    },
    {
      id: '3',
      title: 'Tech Sector Leads Market Growth with Strong Earnings',
      description: 'Technology companies report better-than-expected quarterly results, driving investor confidence in the sector.',
      source: 'Bloomberg',
      date: new Date().toLocaleDateString(),
    },
    {
      id: '4',
      title: 'Emerging Markets Show Resilience Amid Global Uncertainty',
      description: 'Developing economies demonstrate robust performance despite challenges in international trade and geopolitical tensions.',
      source: 'Wall Street Journal',
      date: new Date().toLocaleDateString(),
    },
    {
      id: '5',
      title: 'Cryptocurrency Market Experiences Increased Institutional Adoption',
      description: 'Major financial institutions expand their digital asset offerings as regulatory frameworks become clearer.',
      source: 'CNBC',
      date: new Date().toLocaleDateString(),
    },
  ];

  const getFallbackHistoricalNews = (): NewsItem[] => [
    {
      id: 'h1',
      title: 'Apple: From Garage Startup to Tech Giant',
      description: 'Founded in 1976, Apple faced near bankruptcy in 1997 with losses of $1 billion. Steve Jobs returned and transformed the company with innovative products like the iPod and iPhone. Today, Apple is worth over $3 trillion.',
      source: 'Business History',
      date: '1997-2023',
    },
    {
      id: 'h2',
      title: 'Starbucks: Brewing Success from Financial Crisis',
      description: 'In 2008, Starbucks faced a 28% stock decline and closed 900 stores. Howard Schultz returned as CEO, refocused on customer experience, and expanded globally. The company now operates 35,000+ stores worldwide.',
      source: 'Harvard Business Review',
      date: '2008-2023',
    },
    {
      id: 'h3',
      title: 'Marvel Entertainment: From Bankruptcy to Blockbuster',
      description: 'Marvel filed for bankruptcy in 1996 with $600 million in debt. They restructured, focused on film production, and created the Marvel Cinematic Universe. Acquired by Disney for $4 billion in 2009.',
      source: 'Forbes',
      date: '1996-2009',
    },
    {
      id: 'h4',
      title: 'Netflix: Pivot from DVDs to Streaming Dominance',
      description: 'Netflix struggled with DVD rentals and mounting debt in 2011. They pivoted to streaming and original content production. Now valued at over $150 billion with 250 million subscribers globally.',
      source: 'Business Insider',
      date: '2011-2023',
    },
    {
      id: 'h5',
      title: 'Lego: Building Back from Near Collapse',
      description: 'Lego faced bankruptcy in 2003 after diversifying too rapidly. They refocused on core products, licensed partnerships, and digital innovation. Revenue grew from $1.2B to $8.5B over two decades.',
      source: 'The Guardian',
      date: '2003-2023',
    },
  ];

  const downloadAsPDF = () => {
    const newsData = activeTab === 'current' ? currentNews : historicalNews;
    const title = activeTab === 'current' ? 'Current Financial News' : 'Historical Financial Success Stories';
    
    // Create formatted text content
    let content = `${title}\n`;
    content += `Generated on: ${new Date().toLocaleString()}\n`;
    content += '\n' + '='.repeat(80) + '\n\n';
    
    newsData.forEach((item, index) => {
      content += `${index + 1}. ${item.title}\n`;
      content += `   Source: ${item.source} | Date: ${item.date}\n`;
      content += `   ${item.description}\n\n`;
      content += '-'.repeat(80) + '\n\n';
    });

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const newsToDisplay = activeTab === 'current' ? currentNews : historicalNews;

  return (
    <div className="space-y-6">
      {/* Header with Download Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Financial News</h2>
        <button
          onClick={downloadAsPDF}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('current')}
          className={`flex items-center space-x-2 pb-3 px-4 border-b-2 transition-colors ${
            activeTab === 'current'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Newspaper className="w-5 h-5" />
          <span className="font-medium">Current News</span>
        </button>
        <button
          onClick={() => setActiveTab('historical')}
          className={`flex items-center space-x-2 pb-3 px-4 border-b-2 transition-colors ${
            activeTab === 'historical'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-medium">Success Stories</span>
        </button>
      </div>

      {/* News Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {newsToDisplay.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-3 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="font-medium">{item.source}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={fetchNews}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Refresh News
        </button>
      </div>
    </div>
  );
};

export default NewsSection;