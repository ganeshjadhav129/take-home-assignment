const Tour = require('../models/tour');
const News = require('../models/news');

const getAllTours = async () => {
    return await Tour.getAllTours();
}

const getMatchesByTourName = async params => {
    const { name } = params;

    if (!name) {
        throw new Error('Missing required parameter: name');
    }

    return await Tour.getMatchesByTourName(params);
}

const getTourSportById = async (tourId) => {
    return await Tour.getTourSportById(tourId);
}

const createNews = async (news) => {
    const sport = await getTourSportById(news.tourId);
    if(sport && sport.length > 0) {
        news.sportId = sport[0].sportId;
    } else {
        throw new Error("Sport Not found!!")
    }
    return await News.createNews(news);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    createNews: createNews
}