const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  const token = req.body.token;
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (error, user) => {
    if (!error) {
      next();
    }
    res.status(400).send("invalid credentials");
  });
};

module.exports = authentication;
