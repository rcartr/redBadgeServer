const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { models } = require('../models');
const { UserModel } = models
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req,res) => {
    let { email, password, username } = req.body.user;
    if(password.length >= 5 && email.includes("@")){
        try{
        const User = await UserModel.create({
            email: email,
            password: bcrypt.hashSync(password, 15),
            username: username,
        });

        let token = jwt.sign({id: User.id}, process.env.JWT_SECRET, {expiresIn: "1d"})
        res.status(201).json({
            message: "User Successfully registered",
            email: email,
            sessionToken: token
        })} catch(err) {
            if (err instanceof UniqueConstraintError){
                res.status(409).json({
                    message: "Error invalid Email"
                });
            } else { console.log(err)
                res.status(500).json({
                    message: "User registration failed"
                });
            };
        };
    } else { 
        res.status(400).json({
            message: "Password or email noncomplient, please try again."
        });
    };
});

router.post('/login', async (req,res) => {
    let {email, password} = req.body.user
    try {
        let loginUser = await UserModel.findOne({
            where: {
                email: email
            },
        });
        if(loginUser){
            let passwordComparison = await bcrypt.compare(password, loginUser.password)
            if(passwordComparison){
                let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn:"1d"})
                res.status(200).json({
                    message: "User logged in!",
                    sessionToken: token
                });
            } else {
                res.status(401).json({
                    message: 'Incorrect email or password'
                });
            };
        } else{
            res.status(401).json({
                message: 'Incorrect email or password'
            });
        };
    }catch (err){
        console.log(err)
        res.status(500)({
            message: "Failed to log in user"
        });
    };
});

module.exports = router;