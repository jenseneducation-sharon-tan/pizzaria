const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("backend/assets/data/database.json");
const db = low(adapter);

module.exports = db;
