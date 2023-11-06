const { runQuery } = require('../database');

const problem1 = async(c1,c2) => {
    const sql = 
        `SELECT c3,c5
        FROM crud
        WHERE c1= ? AND c2= ?
        `;
    const result = await runQuery(sql, [c1, c2]);
    return result;
}

const problem2 = async(c1,c2) => {
    const sql=
    `SELECT *
    FROM crud
    WHERE c1> ? OR c2< ?
    `;
    const result = await runQuery(sql, [c1, c2]);
    return result;
}

const problem3 = async(c1,c2,c3,c5) => {
    const sql=
    `INSERT INTO crud (c1, c2, c3, c5) VALUES ( ?, ?, ?, ?)`;

    const result = await runQuery(sql,[c1, c2, c3, c5]);
    return result;
}

const problem4 = async(id,c1,c2,c3,c5) => {
    const sql =
    `INSERT INTO crud (id,c1,c2,c3,c5) VALUES (?,?,?,?,?)`;
    const result = await runQuery(sql,[id,c1,c2,c3,c5]);
    return result;
}

const problem5 = async(id) => {
    const sql=
    `SELECT * FROM crud
    WHERE id>100`;
    const result = await runQuery(sql,[id])
    return result;
}

const problem6 = async(smaller_c1,greater_c1 ,c2) => {
    const sql =
    `UPDATE crud
    SET c3='col0',c5=0
    WHERE c1>? AND c1<? AND c2=?`;
    const result = await runQuery(sql,[smaller_c1,greater_c1,c2]);
    return result;
}

const problem7 = async(smaller_c1,greater_c1 ,c2) => {
    const sql =
    `SELECT * FROM crud
    WHERE c1>? AND c1<? AND c2=?`;
    const result = await runQuery(sql,[smaller_c1,greater_c1,c2]);
    return result;
}

const problem8 = async(c5) => {
    const sql=
    `DELETE FROM crud
    WHERE c5=0`;
    const result = await runQuery(sql,[c5]);
    return result;
}

const problem9 = async(c5) => {
    const sql=
    `SELECT * FROM crud WHERE c5=0`;
    const result = await runQuery(sql,[c5]);
    return result;
}

(async ()=>{
    const result1 = await problem1(11,2);
    const result2 = await problem2(18,2);
    const result3 = await problem3(7,4,'col101',0);
    const result4 = await problem4(103,3,3,'col103',1);
    const result5 = await problem5(100);
    const result6 = await problem6(4,9,1);
    const result7 = await problem7(4,9,1);
    const result8 = await problem8(0);
    const result9 = await problem9(0);
})();