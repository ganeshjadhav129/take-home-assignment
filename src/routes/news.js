const News = require('../controllers/news');

module.exports = function (app) {
  app.post('/create_news', async (req, res, next) => {
    try {
      const news = req.body;

      // Validate input
      if (!news || !news.title || !news.news_description || !news.matchId || !news.tourId || !news.sportId) {
        return res.status(400).json({ error: 'Invalid data. Please provide all required fields.' });
      }

      // Create news
      const result = await News.createNews(news);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/news/match', async (req, res, next) => {
    try {
      const matchId = req.query.matchId;

      // Validate input
      if (!matchId) {
        return res.status(400).json({ error: 'Invalid matchId parameter.' });
      }

      // Get news by matchId
      const result = await News.getNewsByMatchId(matchId);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/news/tour', async (req, res, next) => {
    try {
      const tourId = req.query.tourId;

      // Validate input
      if (!tourId) {
        return res.status(400).json({ error: 'Invalid tourId parameter.' });
      }

      // Get news by tourId
      const result = await News.getNewsByTourId(tourId);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });

  app.get('/news/sport', async (req, res, next) => {
    try {
      const sportId = req.query.sportId;

      // Validate input
      if (!sportId) {
        return res.status(400).json({ error: 'Invalid sportId parameter.' });
      }

      // Get news by sportId
      const result = await News.getNewsBySportId(sportId);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  });
}