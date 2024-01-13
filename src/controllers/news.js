const News = require('../models/news');

const createNews = async (news) => {
    return await News.createNews(news);
}

const getNewsByMatchId = async (matchId) => {
    return await News.getNewsByMatchId(matchId);
}

const getNewsByTourId = async (tourId) => {
    return await News.getNewsByTourId(tourId);
}

const getNewsBySportId = async (sportId) => {
    return await News.getNewsBySportId(sportId);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId : getNewsByMatchId,
    getNewsByTourId : getNewsByTourId,
    getNewsBySportId : getNewsBySportId,
}