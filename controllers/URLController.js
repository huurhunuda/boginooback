const URL = require("../models/URLModel");
exports.getUrl = async (req, res) => {
  const list = await URL.find();
  res.status(200).json({ ...list });
};
exports.createUrl = async (req, res) => {
  console.log(req.body);
  await URL.create({
    originalURL: req.body.originalURL,
    shortenedURL: req.body.shortenedURL,
    user: req.body.user,
  });
  res.status(200).json({ message: "Create" });
};
exports.getUrlByOne = async (req, res) => {
  const { id } = req.params;
  try {
    console.log(id);
    const data = await URL.findOne({
      shortenedURL: id,
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.statusCode).json({ message: error });
  }
};
exports.getUrlByEmail = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  try {
    const data = await URL.find({
      user: email,
    });
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
exports.Navigate = async (req, res) => {
  const { short } = req.params;
  try {
    const data = await URL.findOne({
      shortenedURL: short,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
