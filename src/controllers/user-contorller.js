const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db");
const prisma = require("../configs/prisma")

exports.register = async (req, res, next) => {
  const { username, password, confirmPassword } = req.body;
  try {
    console.log(req.body);
    if (!(username && password && confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (confirmPassword !== password) {
      throw new Error("confirm password not match");
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    const data = {
      username,
      password: hashedPassword,
    };

    const rs = await db.user.create({ data });
    console.log(rs);

    res.json({ msg: "Register successful" });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // validation
    if (!(username.trim() && password.trim())) {
      throw new Error("username or password must not blank");
    }
    // find username in db.user
    const user = await db.user.findFirstOrThrow({ where: { username } });
    // check password
    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid login");
    }
    // issue jwt token
    const payload = { id: user.user_id };
    console.log(payload.id)
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.getme = (req, res, next) => {
  try {
    res.json(req.user);
    console.log(req.user)
  } catch (error) {
    next(error);
  }
};

exports.getTerm = async (req, res , next) => {
  const getTerm = await prisma.term.findMany();
  res.json({ getTerm });
}
