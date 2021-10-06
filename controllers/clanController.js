const router = require('express').Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require('../models');
const { ClanModel } = models

// Create clan
router.post('/create', validateJWT, async (req, res) => {
    const { name, description } = req.body.clan;
    const userId = req.user.id;
    const ClanEntry = {
        name,
        description,
        owner: userId
    }
    try {
        const newClan = await ClanModel.create(ClanEntry);
        res.status(200).json(newClan);
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

// Update clan name and info
router.put('/update/:id', validateJWT, async (req, res) => {
    const { name, description, owner } = req.body.clan;
    const userRole = req.user.role;
    const targetId = req.params.id;

    const query = {
        where: {
            id: targetId
        }
    };

    const updateClan = {
        name: name,
        description: description,
        owner: owner
    };

    if(userRole === 'admin' || userRole === 'leader') {
        try {
            const foundClan = await ClanModel.findOne(query);
            if(foundClan){
                await ClanModel.update(updateClan, query)
                res.status(200).json(updateClan)
            } else {
                res.status(400).json({message: 'Cannot update clan'})
            }
            
            // const update = await ClanModel.update(updateClan, query);
            // res.status(200).json(update);
        } catch(err) {
            res.status(500).json({ error: err });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized.'})
    }
});

// Delete clan - adding this for functionality, but not planning direct user access in v1.0
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

        await ClanModel.destroy(query);
        res.status(200).json({ message: 'Clan has been removed from the database.' });
        } catch (err) {
            res.status(500).json({ error: `${err}` });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized.'})
    }
});

// Get clan information for display
router.get("/show", validateJWT, async(req, res)=>{
    let clanId = req.user.clanId;

    try{
        const clanInfo = await ClanModel.findAll({
            where: {
                id: clanId
            }
        });
        res.status(200).json(clanInfo);
    } catch (err) {
        res.status(500).json({ error: `${err}` });
    }
});

module.exports = router;
