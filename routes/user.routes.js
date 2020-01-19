// we need to sign the user up for our app and we also need to hash our password (because we cannot save plain text)

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();



router.post('/signup', (req, res) =>{
    bcrypt.hash(req.body.password, 10, (err, hashedPassword)=>{
        if(err){
            return res.status(500).json({error: 'error has occured'});
        }
            const user= new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        user.save().then(result=>{
            console.log(result);
            res.status(200).json({success:'new user has been created'});
        }).catch(error=>{
            res.status(500).json({error:err});
        });
    });
});


router.post('/signin', (req, res)=>{
    User.findOne({email: req.body.email}).exec().then(user=>{
        bcrypt.compare(req.body.password, user.password, (result)=>{
            if(result){
                return res.status(200).json({success: "signed in successfully"});
            }
            if (jwt){
                const JWtoken = jwt.sign({
                    email: user.email,
                    _id: user._id
                }, 
                   'secret',
                   {expiresIn: '2h'});
                return res.status(200).json({
                    success: "your time expires in 2 hours",
                    token: JWtoken});
            }
            return res.status(401).json({failed: "Unauthorized Access"});
        });
    })
    .catch(err=>{
        res.status(500).json({error: error});
    });;
});

module.exports = router;