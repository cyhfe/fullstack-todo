const User = require('./user.model')

async function getAllUsers(req, res) {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
}

async function getUserById(req, res) {
  try {
    const users = await User.find({_id: req.params.id})
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
}

async function createUser(req, res) {
  try {
    const doc = await User.create(req.body)
    res.status(201).json({data: doc})
  } catch (error) {
    console.error(error)
    res.status(400).json({message: error.message})
  }
}

async function deleteUserById(req, res) {
  
}

async function updateUserById(req, res) {
  
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById
}