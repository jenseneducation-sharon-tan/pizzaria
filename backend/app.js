const express = require("express");
const cors = require("cors");
const app = express();
const menuRouter = require("./routes/menu");
const ordersRouter = require("./routes/orders");
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin");
const path = require("path");
const PORT = process.env.PORT || 5000;
//const bodyParser = require("body-parser");

// app.use(express.static(path.join(__dirname, ".", "dist")).toString());
// app.get(/.*/, function(req, res) {
//   res.sendFile(path.join(__dirname, ".", "dist", "index.html")).toString();
// });

app.use(express.static(path.join(__dirname, "../dist")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

app.use(cors());
app.use(express.json());
app.use("/menu", menuRouter);
app.use("/orders", ordersRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);
app.use(express.json());
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
