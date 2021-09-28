const db = require('../db')

const UserModel = require('./users');
const ClanModel = require('./clans');
const EventModel = require('./events');

// db association - disabled this below because it added "userId" to the clan table, but I want the clanId to be added onto each user in the users table to point to which clan each user belongs to.
// UserModel.hasOne(ClanModel);
// ClanModel.belongsTo(UserModel);

// db association - so each user has a corresponding clan ID
ClanModel.hasMany(UserModel);
UserModel.belongsTo(ClanModel);
// db association - every event will have a clan ID
ClanModel.hasMany(EventModel);
EventModel.belongsTo(ClanModel);

module.exports = {
    dbConnection: db,
    models: {UserModel, ClanModel, EventModel}
};