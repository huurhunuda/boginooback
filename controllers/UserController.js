const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.getUser = async (req, res) => {
  console.log(req.headers.token);
  if (!req.headers.token) {
    res.status(404).json({
      message: "Dahin nevterne uu",
    });
    return;
  }
  const token = req.headers.token;
  try {
    const data = jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
    console.log(data);
    res.status(200).json({
      ...data,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
};
exports.createUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(req.body.password, salt);
  try {
    const a = await User.create({
      email: req.body.email,
      password: hashed,
    });
    res.status(200).json({ message: "Created" });
  } catch (error) {
    res.status(404).json(error);
  }
};
exports.Login = async (req, res) => {
  console.log("Login");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign(
        {
          email: user.email,
        },
        process.env.ACCESS_TOKEN_KEY
      );
      res.status(200).json({ email: user.email, match: match, token: token });
    } else {
      res.status(400).json({ message: "failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
