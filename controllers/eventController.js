const router = require('express').Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require('../models');
const { EventModel } = models

router.post('/create', validateJWT, async (req, res) => {
    const { name, date, description } = req.body.clan;
    const { id } = req.user;
    const EventEntry = {
        name,
        date,
        description, 
        owner: id
    }
    try {
        const newEvent = await EventModel.create(EventEntry);
        res.status(200).json(newEvent);
    } catch (err) {
        res.status(500).json({ error: err });
    }

});

//Update
router.put('/update/:eventId', validateJWT, async (req, res) => {
    const { name, date, description } = req.body.clan;
    const userId = req.user.id;
    const clanId = req.params.clanId;

    const query = {
        where: {
            id: clanId,
            owner: userId
        }
    };

    const updateEvent = {
        name: name,
        date: date,
        description: description,
     
    };

    try {
        const update = await EventModel.update(updateEvent, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    try {
        const query = {
            where: {
                id: eventId,
                owner: userId
            }
        };

        await EventModel.destroy(query);
        res.status(200).json({ message: "Event has been deleted!" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


// Get all Events /events endpoint
router.get("/", validateJWT, async(req, res)=>{
    let {id} = req.user;
    try{
        const eventList = await EventModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(eventList);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;