import { useState, useEffect } from 'react';
import { generateHistoricalData } from '../utils/mockData';

export const useCurrencyData = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real application, this would be an API call
        const historicalData = generateHistoricalData(selectedCurrency);
        
        setData({
          labels: historicalData.labels,
          datasets: [
            {
              label: `${selectedCurrency} Exchange Rate`,
              data: historicalData.values,
              fill: true,
              borderColor: 'rgb(99, 102, 241)',
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              tension: 0.4,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch currency data');
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCurrency]);

  return { data, loading, error, selectedCurrency, setSelectedCurrency };
};