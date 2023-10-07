const express = require('express');

const port = 3000;
const app = express();

const objectToString = (obj) => {
    return Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n');
};

app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.send(objectToString(req.query));
})

app.post('/',(req,res)=>{
    res.send(objectToString(req.body));
})

app.put('/',(req,res)=>{
    res.send(objectToString(req.body));
})

app.delete('/',(req,res)=>{
    res.send(objectToString(req.body));
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));
