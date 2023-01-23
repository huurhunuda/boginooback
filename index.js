const express = require("express");

const cors = require("cors");

const app = express();
const mongoose = require("mongoose");
const urlRouter = require("./router/URLRouter");
const userRouter = require("./router/UserRouter");
app.use(express.json());
app.use(cors());

require("dotenv").config();
const port = process.env.PORT;
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection established");
});

app.use("/", urlRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
