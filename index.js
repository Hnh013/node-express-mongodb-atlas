const express = require('express');
const bodyParser = require('body-parser');
const ports = process.env.PORT || 3000;
const authController = require('./controllers/authController.js');
const listController = require('./controllers/listController.js');
const itemController = require('./controllers/itemController.js');
const { mongoose } = require('./util/database.js');

var app = express();
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.get('/api', async (req,res) => {
    console.log('test');
});


app.listen(ports, () => console.log(`Server running at Port ${ports}`));

app.use('/item' , itemController);
app.use('/auth' , authController);
app.use('/list' , listController);