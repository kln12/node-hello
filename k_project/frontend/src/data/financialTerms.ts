export interface FinancialTerm {
  name: string;
  definition: string;
  example?: string;
}

export const financialTerms: FinancialTerm[] = [
  {
    name: "Bull Market",
    definition: "A market condition where prices are rising or expected to rise, typically characterized by investor optimism and confidence.",
    example: "The S&P 500 entered a bull market after rising more than 20% from its previous low."
  },
  {
    name: "Bear Market",
    definition: "A market condition where prices are falling or expected to fall, typically characterized by investor pessimism and lack of confidence.",
    example: "The stock market entered a bear market during the 2008 financial crisis."
  },
  {
    name: "Dividend",
    definition: "A portion of a company's earnings paid out to shareholders, usually in cash or additional shares.",
    example: "Apple pays a quarterly dividend of $0.24 per share to its shareholders."
  },
  {
    name: "P/E Ratio",
    definition: "Price-to-Earnings ratio, a metric used to value a company by measuring its current share price relative to its earnings per share.",
    example: "A P/E ratio of 20 means investors are willing to pay $20 for every $1 of company earnings."
  },
  {
    name: "Market Capitalization",
    definition: "The total value of a company's outstanding shares, calculated by multiplying the share price by the number of shares.",
    example: "Apple's market capitalization exceeded $3 trillion in 2024."
  },
  {
    name: "Volatility",
    definition: "A measure of how much and how quickly a security's price changes over time.",
    example: "Cryptocurrency markets are known for their high volatility."
  },
  {
    name: "Blue Chip Stocks",
    definition: "Shares of large, well-established companies with a history of reliable performance and financial stability.",
    example: "Companies like Microsoft, Johnson & Johnson, and Coca-Cola are considered blue chip stocks."
  },
  {
    name: "ETF",
    definition: "Exchange-Traded Fund, a type of investment fund traded on stock exchanges that typically tracks an index, sector, commodity, or asset.",
    example: "The SPDR S&P 500 ETF (SPY) tracks the performance of the S&P 500 index."
  },
  {
    name: "Short Selling",
    definition: "A trading strategy where investors borrow shares and sell them, hoping to buy them back at a lower price and profit from the difference.",
    example: "Traders who anticipated Tesla's stock decline engaged in short selling."
  },
  {
    name: "Liquidity",
    definition: "The ease with which an asset can be bought or sold in the market without causing a significant change in its price.",
    example: "Large-cap stocks typically have high liquidity, making them easy to trade."
  }
];