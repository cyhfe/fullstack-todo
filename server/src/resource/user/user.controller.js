const User = require('./user.model')

async function getAllUsers(req, res) {
  const users = await User.find()
  res.json(users)
}

async function createUser(req, res) {
  
}

async function deleteUserById(req, res) {
  
}
async function updateUserById(req, res) {
  
}


// getAllUsers,
// createUser,
// deleteUserById,
// updateUserById,

module.exports = {
  getAllUsers,
  createUser,
  deleteUserById,
  updateUserById
}