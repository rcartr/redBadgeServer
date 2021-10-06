const router = require('express').Router();
let validateJWT = require("../middleware/validate-jwt");
const { models } = require('../models');
const { EventModel } = models

router.post('/create', validateJWT, async (req, res) => {
    const { eventName, eventDate, eventDescription } = req.body.event;
    const { id, username, role, clanId } = req.user
    const EventEntry = {
        eventName,
        eventDate,
        eventDescription, 
        createdBy: username,
        clanId: clanId
    }
    
    try {
            const newEvent = await EventModel.create(EventEntry);
            res.status(200).json(newEvent);
        } catch (err) {
            res.status(500).json({ error: `${err}` });
        }
    


});

//Update
router.put('/update/:id', validateJWT, async (req, res) => {
    const { eventName, eventDate, eventDescription } = req.body.event;
    const { username, role, clanId } = req.user;
    const targetId = req.params.id;

    const query = {
        where: {
            id: targetId,
            clanId: clanId
        }
    };

    const updateEvent = {
        eventName: eventName,
        eventDate: eventDate,
        eventDescription: eventDescription,
        createdBy: username
    };

    if(role === 'admin' || role === 'leader') {

        try {
            const update = await EventModel.update(updateEvent, query);
            res.status(200).json(updateEvent);
        } catch (err) {
            res.status(500).json({ error: err});
        }
    }
});

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userRole = req.user.role;
    const targetId = req.params.id;

    if(userRole === 'admin' || userRole === 'leader') {

        try {
            const query = {
                where: {
                    id: targetId
                }
            };
            
            await EventModel.destroy(query);
            res.status(200).json({ message: "Event has been deleted!" });
        } catch (err) {
            res.status(500).json({ error: `${err}` });
        }
    }
});


// Get all Events /events endpoint
router.get("/show", validateJWT, async(req, res)=>{
    let clanId = req.user.clanId;

    try{
        const eventList = await EventModel.findAll({
            where: {
                clanId: clanId
            }
        });
        res.status(200).json(eventList);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

module.exports = router;