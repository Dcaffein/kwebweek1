const { runQuery } = require('../database');

const problem1 = async() => {
    const sql = 
        `SELECT users.id,name,seat_number
        FROM tickets
        INNER JOIN users ON tickets.user=users.id
        WHERE train=11
        ORDER BY seat_number`;
    const result = await runQuery(sql);
    console.log(result);
    return result;
}

const problem2 = async() => {
    const sql = 
        `SELECT users.id,name,
        Count(train) as trains_count,
        Sum(distance) as total_distance
        FROM tickets
        INNER JOIN trains ON tickets.train=trains.id
        INNER JOIN users ON tickets.user=users.id
        GROUP BY name
        ORDER BY total_distance DESC
        LIMIT 6`;
    const result = await runQuery(sql);
    console.log(result);
    return result;
}

const problem3 = async() => {
    const sql = 
        `SELECT trains.id,
        types.name as type,
        src.name as src_stn,
        dst.name as dst_stn,
        Timediff(arrival,departure) as travel_time
        FROM trains
        INNER JOIN types ON trains.type=types.id
        INNER JOIN stations as src ON trains.source=src.id
        INNER JOIN stations as dst ON trains.destination=dst.id
        ORDER BY travel_time DESC
        LIMIT 6`;
    const result = await runQuery(sql);
    console.log(result);
    return result;
}

const problem4 = async() => {
    const sql = 
        `SELECT types.name as type,
        src.name as src_stn,
        dst.name as dst_stn,
        departure,arrival,
        Round(types.fare_rate * distance * 0.001,-2) as fare
        FROM trains
        INNER JOIN types ON trains.type=types.id
        INNER JOIN stations as src ON trains.source=src.id
        INNER JOIN stations as dst ON trains.destination=dst.id
        ORDER BY departure`;
    const result = await runQuery(sql);
    console.log(result);
    return result;
}

const problem5 = async() => {
    const sql=
    `SELECT trains.id as id,
    types.name as type,
    src.name as src_stn,
    dst.name as dst_stn,
    Count(tickets.id) as ocuupied,
    max_seats as maximum
    FROM tickets
    INNER JOIN trains ON train=trains.id
    INNER JOIN types ON trains.type=types.id
    INNER JOIN stations as src ON trains.source=src.id
    INNER JOIN stations as dst ON trains.destination=dst.id
    GROUP BY train
    ORDER BY trains.id`;
    const result = await runQuery(sql);
    console.log(result);
    return result;
}

const problem6 = async() => {
    const sql=
    `SELECT trains.id as id,
    types.name as type,
    src.name as src_stn,
    dst.name as dst_stn,
    Count(tickets.id) as ocuupied,
    max_seats as maximum
    FROM tickets
    RIGHT OUTER JOIN trains ON train=trains.id
    INNER JOIN types ON trains.type=types.id
    INNER JOIN stations as src ON trains.source=src.id
    INNER JOIN stations as dst ON trains.destination=dst.id
    GROUP BY train
    ORDER BY trains.id`;
    const result = await runQuery(sql);
    console.log(result);
    return result;
}

(async ()=>{
    const result1 = await problem1();
    const result2 = await problem2();
    const result3 = await problem3();
    const result4 = await problem4();
    const result5 = await problem5();
    const result6 = await problem6();
})();