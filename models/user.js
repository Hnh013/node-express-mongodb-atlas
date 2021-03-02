const mongoose  = require('mongoose');

var itemSchema = mongoose.Schema({
	item_desc : String,
});


var listSchema = mongoose.Schema({
	name : String,
	status : Boolean,
	items : [itemSchema],
},
{ timestamps : true }
);

listSchema.index( {updatedAt: 1}, {expireAfterSeconds: 30});
//2592000 = 30day

var User = mongoose.model('User', {
    username : { type : String },
    email : { type : String },
    password : { type : String },
    lists : [listSchema],
    	
});

module.exports = { User };