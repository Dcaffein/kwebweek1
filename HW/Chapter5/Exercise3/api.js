const { runQuery } = require('../database');

const getFare = async(uid) => {
    const sql=
    `SELECT users.name,Sum(Round(fare_rate * distance * 0.001,-2)) as fare
    FROM tickets
    INNER JOIN trains ON train=trains.id
    INNER JOIN types ON type=types.id
    INNER JOIN users ON user = users.id
    WHERE user=?`;
    const result = await runQuery(sql,[uid]);
    return result;
}

const isSoldout = async(tid) => {
    const sql=
    `SELECT max_seats,Count(tickets.id) as occupied
    FROM tickets
    INNER JOIN trains ON train=trains.id
    INNER JOIN types ON type=types.id
    WHERE trains.id = ?`;
    const result = await runQuery(sql,[tid]);
    return result;
}

module.exports = {getFare,isSoldout};