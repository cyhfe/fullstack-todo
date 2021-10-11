const User = require('./user.model')

async function getAllUsers(req, res) {
  const users = await User.find()
  res.json(users)
}

async function createUser(req, res) {
  const newUser = req.body
  await User.create(req.body)
}

async function deleteUserById(req, res) {
  
}
async function updateUserById(req, res) {
  
}

module.exports = {
  getAllUsers,
  createUser,
  deleteUserById,
  updateUserById
}