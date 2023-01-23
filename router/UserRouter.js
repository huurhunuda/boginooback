const express = require("express");
const { getUser, createUser, Login } = require("../controllers/UserController");

const userRouter = express.Router();

userRouter.post("/", getUser).post("/signup", createUser).post("/login", Login);
module.exports = userRouter;
