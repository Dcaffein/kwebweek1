const {getFare,isSoldout} = require('./api');

const express = require('express');
const port = 3000;
const app = express();

app.get('/fare', async (req, res) => {
    try {
        const uid = req.query.uid;
        const [{name, fare}] = await getFare(uid);
        res.send(`Total fare for ${name} is ${fare} KRW.`);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.get('/fare/status', async (req,res)=>{
    try {
        const tid = req.query.tid;
        const [{max_seats, occupied}] = await isSoldout(tid);
        res.send(`Train ${tid} is ${occupied == max_seats ? "sold out" : "not sold out"}`);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));