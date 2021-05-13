const express = require("express");
const cors = require("cors");
const app = express();
const menuRouter = require("./routes/menu");
const ordersRouter = require("./routes/orders");
const PORT = 5000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use("/menu", menuRouter);
app.use("/orders", ordersRouter);
app.use(bodyParser.json());
app.listen(5000, () => {
  console.log("Server started on port ", PORT);
});
