const jwt = require("jsonwebtoken");
const User = require("../resource/user/user.model");

const secrets = process.env.JWT_SECRETS || "jwt123";

function newToken(user) {
  return jwt.sign({ id: user.id }, secrets);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secrets, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
}

async function login(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "缺少用户名或密码",
    });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return res.status(404).json({
        message: "该用户名不存在",
      });

    const match = await user.checkPassword(req.body.password);
    if (!match)
      return res.status(401).json({
        message: "密码错误",
      });

    const token = newToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function signup(req, res) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      message: "缺少用户名或密码",
    });
  }

  const user = await User.findOne({ username: req.body.username });
  if (user)
    return res.status(400).json({
      message: "该用户名已存在",
    });

  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  login,
  signup,
};
