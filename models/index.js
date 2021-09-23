const db = require('../db')

const UserModel = require('./users');
const ClanModel = require('./clans');
const EventModel = require('./events');

// user-clan db associations
UserModel.hasOne(ClanModel);
ClanModel.belongsTo(UserModel);
// clan-events db associations
ClanModel.hasMany(EventModel);
EventModel.belongsTo(ClanModel);

module.exports = {
    dbConnection: db,
    models: {UserModel, ClanModel, EventModel}
};