require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require("./db");

app.use(require('./middleware/headers'));

app.use(Express.json());

const controllers = require("./controllers");

app.use("/user", controllers.userController);
app.use("/clans", controllers.clanController);
app.use("/events", controllers.eventController);


dbConnection
    .authenticate()
    .then(() => dbConnection.sync())
    // from modules, dbConnection.sync({force: true}) will drop all tables in pgAdmin and resync them. This is necessary after you make a change to a model, and need to sync any new table headers to the database.
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}.`);
    });
    
