const News = require('../models/news');
const Match = require('./match');
const Tour = require('./tour');

const getNewsByMatchId = async (matchId) => {
    return await News.getNewsByMatchId(matchId);
}

const getNewsByTourId = async (tourId) => {
    return await News.getNewsByTourId(tourId);
}

const getNewsBySportId = async (sportId) => {
    return await News.getNewsBySportId(sportId);
}

const createNews = async (news) => {
    if(!news.matchId) {
        return await Tour.createNews(news);
    } else {
        return await Match.createNews(news);
    }
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId : getNewsByMatchId,
    getNewsByTourId : getNewsByTourId,
    getNewsBySportId : getNewsBySportId,
}