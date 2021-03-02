const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const { User } = require('../models/user');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Secret Key';


//////////////////////////////////////////////////////////////////////////// SIGNUP ROUTE ///////////////////////////
router.post('/signup', async (req,res) => {
    const username = req.body.username;
    const email = req.body.email;
    const plainTextPassword  = req.body.password;
    const lists = req.body.lists;
    
    if(!username || typeof username !== 'string') {
    	return res.json({ status : 'error' , message : 'Invalid name'});
    }

    if(!plainTextPassword || typeof plainTextPassword !== 'string') {
    	return res.json({ status : 'error' , message : 'Invalid Password'});
    }

    if(plainTextPassword.length < 6) {
    	return res.json({ status : 'error' , message : 'Password too small'});
    }

    const password = await bcryptjs.hash(plainTextPassword, 10);
     
    try {
    	const response = await User.create({ username,email,password,lists });
        console.log('User created successfully');
    }

    catch (error) {
    	if (error.code === 11000) {
    	    return res.json({ status : 'error' , message : 'username already in use' });	
    	}
    	throw error;
    }

	res.json({ status : 'ok' });
});

////////////////////////////////////////////////////////////////////////// LOGIN ROUTE //////////////////////////
router.post('/login', async (req,res) => {

	const { email , password } = req.body

	const user = await User.findOne({ email }).lean();

	if(!user) {
		return res.json({ status : 'error' , error : 'Invalid email/Password' });
	}

	if(await bcryptjs.compare(password , user.password)) {

		const token = jwt.sign({ id: user._id , email : user.email },
			JWT_SECRET);
        
        return res.json({ id : user._id , data : token });
	}

	res.json({ status : 'error' , data : 'Invalid email/Password' });

});

module.exports = router;



