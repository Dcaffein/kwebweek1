const express = require('express');
const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('login.pug')
});

app.post('/login',(req,res)=>{
    const {username,password,introduction} = req.body;
    res.send(`
        username : ${username} <br>
        password : ${password} <br>
        introduction : ${introduction}
    `)
})

app.listen(port, () => console.log(`Server listening on port ${port}!`));