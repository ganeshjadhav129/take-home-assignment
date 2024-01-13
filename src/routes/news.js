const News = require('../controllers/news');

module.exports = function (app) {

  app.route('/news/create').post(async (req, res, next) => {
    try {
      let matchId = req.query.matchId, tourId = req.query.tourId, news = req.body, errorMsg = "", result;

      if (!matchId && !tourId) {
        return res.status(400).json({ error: 'Missing required parameter: matchId or tourId' });
      }

      // Validate input
      if (!news) return res.status(400).json({ error: 'Missing All required fields!' });
      if (!news.title) errorMsg = errorMsg + " title";
      if (!news.news_description) errorMsg = errorMsg + " news_description";
      if (errorMsg != "") return res.status(400).json({ error: "Invalid data. Please provide all required fields: " + errorMsg });

      news = {
        ...news,
        "tourId": !tourId ? null : Number(tourId),
        "matchId": !matchId ? null : Number(matchId),
        "sportId": null
      };

      result = await News.createNews(news);
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