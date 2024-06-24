const db = require("../models/db")
const prisma = require("../configs/prisma")
const bcrypt = require('bcrypt');

exports.getStudent = async (req, res, next) => {
    const getUser = await prisma.user.findMany({
      include: {
        class: true,
      },
    });
    res.json({ getUser });
  };

exports.getTermSTD = async (req, res, next) => {
    const getTerm = await prisma.term.findMany({
        include: {
            subject: true,
            user: true,
          },
    })
    res.json({ getTerm });
}