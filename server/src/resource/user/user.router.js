const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUserById,
  updateUserById,
  getUserById,
} = require("./user.controller");
const userRouter = express.Router();

userRouter
  .get("/", getAllUsers)
  .get("/:id", getUserById)
  .post("/", createUser)
  .put("/:id", updateUserById)
  .delete("/:id",deleteUserById);

module.exports = userRouter;
