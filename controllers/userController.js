const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateJWT = require("../middleware/validate-jwt");
const { models } = require('../models');
const { UserModel } = models
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/register', async (req,res) => {
    let { email, password, username, role, clanId } = req.body.user;
    if(password.length >= 5 && email.includes("@")){
        try{
        const User = await UserModel.create({
            email: email,
            password: bcrypt.hashSync(password, 15),
            username: username,
            role: role,
            clanId: clanId
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
    let { email, password } = req.body.user
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

// Update user info
router.put('/update/:id', validateJWT, async (req, res) => {
    let { email, username, role, clanId } = req.body.user;
    const owner = req.user.id;
    const userRole = req.user.role;
    const targetId = req.params.id;

    let query = {
        where: {
            id: targetId
        }
    };

    let updateUser = {
        email: email,
        username: username,
        role: role,
        clanId: clanId
    };

    if(targetId === owner || userRole === 'admin') {
        const update = await UserModel.update(updateUser, query);
        try {
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json({ error: `${err}` });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized.'})
    }
});

// Show all users. /user/members endpoint. Want to tie this to clan ID for displaying users by clan ID.
router.get("/members", validateJWT, async(req, res)=>{
    let { clanId } = req.user;

    try{
        const userList = await UserModel.findAll({
            where: {
                clanId: clanId
            }
        });
        res.status(200).json(userList);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

// Delete user. This needs to be tied to role based access in client.
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userRole = req.user.role;
    const targetId = req.params.id

    if(userRole === "admin") {
        try {
            const query = {
                where: {
                    id: targetId
                }
            };

        await UserModel.destroy(query);
        res.status(200).json({ message: "User has been removed from the database." });
        } catch (err) {
            res.status(500).json({ error: `${err}` });
        }
    } else {
        res.status(401).json({ message: "Unauthorized."})
    }
});

module.exports = router;