const Match = require('../models/match');
const News = require('../models/news');

const getAllMatches = async () => {
    return await Match.getAllMatches();
}

const getMatchTourById = async (matchId) => {
    return await Match.getMatchTourById(matchId);
}

const createNews = async (news) => {
    const tour = await getMatchTourById(news.matchId);
    if(tour && tour.length > 0) {
        news.tourId = tour[0].tourId;
    } else {
        throw new Error("Tour not found!");
    }
    return await News.createNews(news);
}

module.exports = {
    getAllMatches: getAllMatches,
    createNews : createNews
}