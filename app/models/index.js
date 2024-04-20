const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pair_infos = require("./pair_info.model.js")(mongoose);
db.wallet_infos = require("./wallet_info.model.js")(mongoose);

module.exports = db;

