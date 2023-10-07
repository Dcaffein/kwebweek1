const express = require('express');
const port = 3000;
const app = express();

const factorial = (n) => {
    if(n==0){
        return 1;
    }
    return n*factorial(n-1)
}

app.get('/factorial',(req,res)=>{
    const number = req.query.number;
    if(isNaN(number)||number<0){
        res.send('not a vaild number value')
    }
    res.redirect(`/factorial/${number}`)
})

app.get(`/factorial/:number`,(req,res)=>{
    const number = req.params.number;    
    res.send(`${number}! = ${factorial(number)}`);
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));
