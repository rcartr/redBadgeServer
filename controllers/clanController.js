const router = require('express').Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require('../models');
const { ClanModel } = models

// Create clan
router.post('/create', validateJWT, async (req, res) => {
    const { name, description } = req.body.clan;
    const { id } = req.user;
    const ClanEntry = {
        name,
        description, 
        owner: id
    }
    try {
        const newClan = await ClanModel.create(ClanEntry);
        res.status(200).json(newClan);
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

// Update clan name and info
router.put('/update/:clanId', validateJWT, async (req, res) => {
    const { name, description } = req.body.clan;
    const userId = req.user.id;
    const clanId = req.params.clanId;

    const query = {
        where: {
            id: clanId,
            owner: userId
        }
    };

    const updateClan = {
        name: name,
        description: description,
     
    };

    try {
        const update = await ClanModel.update(updateClan, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

// Delete clan - adding this for functionality, but not planning direct access in v1.0
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const clanId = req.params.id;

    try {
        const query = {
            where: {
                id: clanId,
                owner: userId
            }
        };

        await ClanModel.destroy(query);
        res.status(200).json({ message: "Clan has been deleted!" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;