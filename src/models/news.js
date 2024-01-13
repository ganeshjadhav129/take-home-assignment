const mysql = require('../lib/mysql');

const createNews = async (news) => {
    const statement = 'insert ignore into mydb.news (title, news_description, matchId, tourId, sportId) VALUES (?, ?, ?, ?, ?);';
    const parameters =  [news.title, news.news_description, news.matchId, news.tourId, news.sportId];
    return await mysql.query(statement, parameters);
}

const getNewsByMatchId = async (matchId) => {
    const statement = 'select * from news where news.matchId = ?;';
    const parameters =  [matchId];
    return await mysql.query(statement, parameters);
}

const getNewsByTourId = async (tourId) => {
    const statement = 'select * from news where news.tourId = ?;';
    const parameters =  [tourId];
    return await mysql.query(statement, parameters);
}

const getNewsBySportId = async (sportId) => {
    const statement = 'select * from news where news.sportId = ?;';
    const parameters =  [sportId];
    return await mysql.query(statement, parameters);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId : getNewsByMatchId,
    getNewsByTourId : getNewsByTourId,
    getNewsBySportId : getNewsBySportId,
}