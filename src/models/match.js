const mysql = require('../lib/mysql');

const getAllMatches = async () => {
    const statement = 'select * from matches;';
    const parameters = [];
    return await mysql.query(statement, parameters);
}

const getMatchTourById = async (matchId) => {
    const statement = 'select m.tourId as tourId from matches m where id = ?;';
    const parameters = [matchId];
    return await mysql.query(statement, parameters);
}

module.exports = {
    getAllMatches: getAllMatches,
    getMatchTourById : getMatchTourById
}