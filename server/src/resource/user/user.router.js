const express = require("express");
const {
  getAllUsers,
  createUser,
  deleteUserById,
  updateUserById,
} = require("./user.controller");
const userRouter = express.Router();

userRouter
  .get("/", getAllUsers)
  .post("/", createUser)
  .put("/:id", updateUserById)
  .delete("/:id",deleteUserById);

module.exports = userRouter;
