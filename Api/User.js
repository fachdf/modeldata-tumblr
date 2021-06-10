const express = require('express');
const mongoose = require('mongoose');
const User = require('../DB/User');
const route = express.Router();

route.post('/',async (req,res)=>{
    const{firstName,lastName} = req.body;
    let user = {};
    console.log(firstName)
    user.firstName = firstName;
    console.log(user.firstName)
    user.lastName = lastName;
    let userModel = new User(user);
    await userModel.save();
    res.json(userModel);
})

module.exports = route;