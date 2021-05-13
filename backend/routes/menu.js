const { Router } = require("express");
const router = new Router();
const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./assets/data/database.json");
const db = low(adapter);

router.get("/", async (req, res) => {
  const menu = db.get("menu");
  console.log(menu);
  res.json(menu.value());
});
router.get("/toppings", async (req, res) => {
  const toppings = db.get("toppings");
  console.log(toppings);
  res.json(toppings.value());
});
module.exports = router;
