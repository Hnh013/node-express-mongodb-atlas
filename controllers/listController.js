const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

///////////////////////////////////////////////////////////////////////////// FETCH LISTS //////////////////////////

router.get('/fetch/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    User.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retrieving Employee' + JSON.stringify(err, undefined, 2)); }
    }).select({ 'lists' : 1 , 'username': 1}); 
});




////////////////////////////////////////////////////////////////////////////// CREATE LIST ///////////////////////////
router.post('/add/:id', (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var list = { name : req.body.name, status : req.body.status};

    User.findByIdAndUpdate(req.params.id, { "$push" : { "lists" : list }}, { new : true }, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Updating User' + JSON.stringify(err, undefined, 2)); }
    });
});    


////////////////////////////////////////////////////////////////////////////// DELETE LIST //////////////////////////
router.post('/remove/:id', (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var list = { name : req.body.name, status : req.body.status};

    User.findByIdAndUpdate(req.params.id, { "$pull" : { "lists" : list }}, { new : true }, (err,doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Updating User' + JSON.stringify(err, undefined, 2)); }
    });
}); 

//////////////////////////////////////////////////////////////////////////// CHANGE LIST NAME (name,listname)

router.put('/edit' , (req,res) => {
       User.updateOne( { 'username' : req.body.username , 'lists.name' : req.body.old } , { $set : {'lists.$.name' : req.body.new } } , (err,doc) => { 
    if (!err) { res.send(doc); }
    else { console.log(err); } 
});
});

/////////////////////////////////////////////////////////////////////////// CHANGE STATUS (name,listname)

router.put('/softdel' , (req,res) => {
    User.updateOne( { 'username' : req.body.username , 'lists.name' : req.body.old } , { $set : {'lists.$.status' : 0 } } , (err,doc) => { 
 if (!err) { res.send(doc); }
 else { console.log(err); } 
});
});


module.exports = router;