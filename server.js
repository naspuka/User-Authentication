const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const user = require('./routes/user.routes')
const app = express();

const PORT = 5000;

mongoose.connect('mongodb://localhost/jwtauth', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/check', (req,res)=>{
    res.json({
        "JWT":'Welcome to the JWT authentication'
    });
});

app.use('/user', user);






app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
});


