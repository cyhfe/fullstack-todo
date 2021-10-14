const User = require("./user.model");

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function getUserById(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send();
  }
}

async function createUser(req, res) {
  try {
    const doc = await User.create(req.body);
    res.status(201).json({ data: doc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function deleteUserById(req, res) {
  try {
    const doc = await User.create(req.body);
    res.status(201).json({ data: doc });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
}

async function updateUserById(req, res) {}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
