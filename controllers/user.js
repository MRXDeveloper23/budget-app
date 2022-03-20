const Users = require("../models/users");

async function createUser(req, res) {
  try {
    console.log(req.body);
    await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    res
      .status(200)
      .json({ message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
}

async function getUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      username: username,
      password: password,
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(200).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ message: `Error: ${err}` });
  }
}

module.exports = {
  createUser,
  getUser,
};
