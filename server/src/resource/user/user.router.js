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
  .post("/", createUser)
  .get("/:id", getUserById)
  .put("/:id", updateUserById)
  .delete("/:id",deleteUserById);

module.exports = userRouter;
