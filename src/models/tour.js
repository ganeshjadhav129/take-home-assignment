const mysql = require('../lib/mysql');

const getAllTours = async () => {
    const statement = 'select * from tours;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchesByTourName = async params => {
    const statement = 'select * from matches left join tours on matches.tourId = tours.id where tours.name = ?';
    const parameters = [ params.name ];
    return await mysql.query(statement, parameters);
}

const getTourSportById = async (tourId) => {
    const statement = 'select m.sportId as sportId from tours m where id = ?;';
    const parameters = [tourId];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllTours: getAllTours,
    getMatchesByTourName: getMatchesByTourName,
    getTourSportById : getTourSportById
}