const db = require("../models/db");
const prisma = require("../configs/prisma");
const bcrypt = require("bcrypt");
const createError = require("../utils/createError");

exports.getStudent = async (req, res, next) => {
  try {
    const userId = req.user;
    // console.log(userId.user_id)
    const user = await prisma.user.findUnique({
      where: { user_id: userId.user_id },
      include: {
        class: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ userId });
  } catch (error) {
    next(error);
  }
};

exports.getTermSTD = async (req, res, next) => {
  const user = req.user;
  const yearNow = new Date().toLocaleDateString('th-TH').split('/')[2]
  console.log(yearNow)
  try {
    const getTerm = await prisma.term.findMany({
      where: {
        userUser_id: Number(user.user_id),
      //npm   AND: {
      //  datetime: yearNow
      // }
      },

      include: {
        subject: true,
        user: true,
      },
      orderBy: {
        datetime: 'asc'
      }
    });

    if(getTerm.length === 0){
      return createError(400, "user not found!")
    }

    res.json({ getTerm });
  } catch (err) {
    next(err);
  }
};

exports.getSubjectSTD = async (req, res, next) => {
  const getSubject = await prisma.subject.findMany();
  res.json({ getSubject });
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { userId } = req.params;

    console.log(req.body);
    // console.log(req.params)
    const { password, newPassword, retypeNewPass } = req.body;

    if (!password || !newPassword || !retypeNewPass) {
      return createError(400, "กรุณากรอกข้อมูลให้ครบ");
    }

    const checkUser = await prisma.user.findFirst({
      where: {
        user_id: Number(userId),
      },
    });

    if (!checkUser) {
      return createError(400, "ไม่พบผู้ใช้");
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);

    if (!checkPassword) {
      return createError(
        400,
        "รหัสผ่านไม่ถูกต้อง กรุณาโปรดเช็ครหัสผ่านอีกครั้ง"
      );
    }

    if (newPassword !== retypeNewPass) {
      return createError(400, "รหัสผ่านไม่ตรง");
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    const changePassword = await prisma.user.update({
      where: {
        user_id: Number(userId),
      },
      data: {
        password: hashPassword,
      },
    });

    res.json({
      result: "success",
      user: changePassword,
      updateAt: new Date().toLocaleDateString("th-TH"),
    });
  } catch (error) {
    next(error);
  }
};
