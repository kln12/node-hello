export const generateHistoricalData = (currency: string) => {
  const years = 10;
  const dataPoints = years * 12; // Monthly data points
  const baseValue = getCurrencyBaseValue(currency);
  
  const labels: string[] = [];
  const values: number[] = [];
  
  for (let i = 0; i < dataPoints; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (dataPoints - i));
    labels.push(date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' }));
    
    // Generate realistic-looking exchange rate data with trends and fluctuations
    const trend = Math.sin(i / 12) * 0.1; // Long-term cyclical trend
    const volatility = Math.random() * 0.05 - 0.025; // Random short-term volatility
    const value = baseValue * (1 + trend + volatility);
    values.push(Number(value.toFixed(4)));
  }
  
  return { labels, values };
};

const getCurrencyBaseValue = (currency: string): number => {
  // Approximate base exchange rates against USD
  const rates: Record<string, number> = {
    USD: 1.0,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.0,
    AUD: 1.35,
  };
  return rates[currency] || 1.0;
};