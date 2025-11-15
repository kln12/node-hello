import express from 'express';

const router = express.Router();

router.get('/financial', async (req, res) => {
  try {
    // For now, return static data
    // Later you can integrate with News API, Alpha Vantage, etc.
    const newsData = {
      current: [
        {
          id: '1',
          title: 'Global Markets Rally on Positive Economic Data',
          description: 'Stock markets worldwide showed significant gains as recent economic indicators suggest steady growth and declining inflation rates.',
          source: 'Financial Times',
          date: new Date().toLocaleDateString(),
        },
        // Add more news items...
      ],
      historical: [
        {
          id: 'h1',
          title: 'Apple: From Garage Startup to Tech Giant',
          description: 'Founded in 1976, Apple faced near bankruptcy in 1997 with losses of $1 billion. Steve Jobs returned and transformed the company with innovative products.',
          source: 'Business History',
          date: '1997-2023',
        },
        // Add more historical items...
      ]
    };

    res.json(newsData);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

export default router;