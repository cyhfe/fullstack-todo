const jwt = require("jsonwebtoken");
const User = require("../resource/user/user.model");

const secrets = process.env.JWT_SECRETS || "jwt123";

function getToken(bearer) {
  if (!bearer || !bearer.startsWith("Bearer ")) return null;
  const token = bearer.split("Bearer ")[1].trim();
  return token;
}

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

    if (!user.token) {
      const token = newToken(user);
      user.token = token;
      await user.save();
      return res.status(200).json({ token });
    }
    res.status(200).json({ token: user.token });
  } catch (error) {
    res.status(500).send();
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
    user.token = token;
    await user.save();
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send();
  }
}

async function logout(req, res) {
  const token = getToken(req.headers.authorization);
  if (!token) {
    return res.status(401).send();
  }

  let payload;
  let user;

  try {
    payload = await verifyToken(token);
    user = await User.findOne({
      _id: payload.id,
      token,
    }).select("-password");

    if (!user) {
      return res.status(401).send();
    }

    user.token = null
    await user.save();
    res.status(200).json({
      message: "ok",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function protect(req, res, next) {
  const token = getToken(req.headers.authorization);
  if (!token) {
    return res.status(401).send();
  }
  let payload;
  let user;

  try {
    payload = await verifyToken(token);
    user = await User.findOne({
      _id: payload.id,
      token,
    }).select("-password");
  } catch (error) {
    return res.status(500).send();
  }

  if (!user || !payload) {
    return res.status(401).send();
  }

  req.user = user;
  next();
}

module.exports = {
  login,
  signup,
  protect,
  logout,
};
