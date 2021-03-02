const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://<uername>:<password>@sandbox.quaod.mongodb.net/<db name>?retryWrites=true&w=majority', 
{useUnifiedTopology : true , useNewUrlParser : true },
(err) => {
    if (!err)
    console.log('MongoDB connection succeeded');
    else
    console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));

});

module.exports = mongoose;
