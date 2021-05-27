const { Router } = require("express");
const router = new Router();
const fs = require("fs");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("./assets/data/database.json");
const db = low(adapter);

router.post("/createPizza", (req, res) => {
  const pizzaInfo = req.body;
  const menu = db.get("menu");
  menu.push(pizzaInfo).write();
  res.send(menu.value());
});

router.post("/createTopping", (req, res) => {
  const topping = req.body;
  const toppings = db.get("toppings");
  toppings.push(topping).write();
  res.send(toppings.value());
});

router.post("/removePizza", (req, res) => {
  const pizzaInfo = req.body;
  const menu = db.get("menu");
  menu.remove({ id: pizzaInfo.id }).write();
  res.send(menu.value());
});
router.post("/removeTopping", (req, res) => {
  const topping = req.body;
  const toppings = db.get("toppings");
  toppings.remove({ id: topping.id }).write();
  res.send(toppings.value());
});
router.post("/updatePizza", (req, res) => {
  const pizzaInfo = req.body;
  const menu = db.get("menu");
  menu
    .find({ id: pizzaInfo.id })
    .assign({ ...pizzaInfo })
    .write();
  res.send(menu.value());
});
router.post("/updateTopping", (req, res) => {
  const topping = req.body;
  const toppings = db.get("toppings");
  toppings
    .find({ id: topping.id })
    .assign({ ...topping })
    .write();
  res.send(toppings.value());
});
router.post("/logIn", (req, res) => {
  const admin = req.body;
  const users = db.get("adminUsers");
  const existingUser = users.find({ username: admin.username }).value();
  if (existingUser) {
    if (existingUser.password === admin.password) {
      res.send(existingUser);
    } else {
      res.send({ error: "Ojojoj!!! Fel lösenord!" });
    }
  } else {
    res.send({ error: "Hoppsan! Användaren finns inte!" });
  }
});
module.exports = router;
