const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');


////////////////////////////////////////////////////////////// FETCH ITEMS ///////////////////////////////////
router.get('/fetch/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving User' + JSON.stringify(err, undefined, 2)); }
    }).select({ 'lists.name' : req.body.list}); 
});





////////////////////////////////////////////////////// ADD ITEM TO LIST ///////////// ( name,listname,item description )
router.post('/add' , (req,res) => {

    var item  = { item_desc : req.body.item_desc } 
    User.updateOne( { 'username' : req.body.username , 'lists.name' : req.body.list } , { $push : {'lists.$.items' : item } } , (err,doc) => { 
 if (!err) { res.send(doc); }
 else { console.log(err); } 
});
});


////////////////////////////////////////////////////// REMOVE ITEM FROM LIST ///////////// ( name,listname,item description )
router.post('/remove' , (req,res) => {

    var item  = { item_desc : req.body.item_desc } 
    User.updateOne( { 'username' : req.body.username , 'lists.name' : req.body.list } , { $pull : {'lists.$.items' : item } } , (err,doc) => { 
 if (!err) { res.send(doc); }
 else { console.log(err); } 
});
});


////////// UPDATE ITEM INSIDE A LIST INSIDE A OBJECT // MATCH USING name , listname // ARRAY INDEX USING item_desc

router.put('/edit' , (req,res) => {
    //if (!ObjectId.isValid(req.params.id))
      //  return res.status(400).send(`No record with given id : ${req.params.id}`);
    User.updateOne( { 'username': req.body.username , 'lists.name' : req.body.list } , 
    	                { $set : { "lists.$.items.$[element].item_desc" : req.body.new }},
    	                { arrayFilters : [{ 'element.item_desc' :  req.body.old }] }, 
    	                (err,doc) => { 
    if (!err) { res.send(doc) }
    else { console.log(err); } 
});
});
    
/////////////////// EUREKA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


module.exports = router;