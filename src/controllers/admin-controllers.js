const db = require("../models/db")
const prisma = require("../configs/prisma")
const bcrypt = require('bcrypt');
const cloudupload = require("../utils/cloudupload");


exports.createUser = async (req, res, next) => {

    try {
        const {username , password, prefix ,frist_name, last_name, email, role, classCl_id} = req.body;
        const hash = await bcrypt.hash(password, 10);

        console.log(req.body)
        const imagePromise = req.files.map((file) => {
            return cloudupload(file.path);
        });

        const imageUrlArray = await Promise.all(imagePromise);

        const userCreate = await prisma.user.create({
            data: {
                username,
                password: hash,
                prefix,
                frist_name,
                last_name,
                email,
                IMG: imageUrlArray[0],
                role: "STUDENT",
                class: {
                    connect: {
                        cl_id: Number(classCl_id),
                    }
                }
            }
        })
        res.json({ userCreate})
    } catch (err) {
        console.log(err)
    }
}

exports.getUser = async (req, res , next) => {
    const user = await prisma.user.findMany();
    res.json({ user });
}

exports.createSubject = async (req, res, next) => {
    try {
        const {sub_code ,subject, cradit} = req.body
        console.log(req.body)
        const subjectCreate = await prisma.subject.create({
            data: {
                sub_code,
                subject,
                credit: Number(cradit),
            }
        })
        res.json({subjectCreate})
    } catch (err) {
        console.log(err)
    }
}

exports.getSubject = async (req, res, next) => {
    const subject = await prisma.subject.findMany();
    res.json({ subject });
}

exports.deleteUser = async (req, res, next) => {
    try {
        const { userID } = req.params;
        console.log(userID)
        const dUser = await prisma.user.delete({
            where: {
                user_id: Number(userID)
            }
        })
        res.json({ resault: dUser})
    } catch(err) {
        console.log(err)
    }
}

exports.deleteSubject = async (req, res, next) => {
    try {
        const { subjectID } = req.params;
        console.log(subjectID)
        const dUser = await prisma.subject.delete({
            where: {
                sj_id: Number(subjectID)
            }
        })
        res.json({ resault: dUser})
    } catch(err) {
        console.log(err)
    }
}

exports.adminlogin = async (req, res, next) => {
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

exports.updetaUser = async (req, res, next) => {
    const { userID } = req.params;
    const {
        username,
        password,
        frist_name,
        last_name,
        email,
        IMG,
        role,
        classCl_id
    } = req.body;
    try {
        const rs = await db.user.update({
            data: {
                username,
                password,
                frist_name,
                last_name,
                email,
                IMG,
                role,
                classCl_id
            },
            where: { user_id: Number(userID)},
        })
        res.json({ message: "UPDATE", resault: rs });
    } catch (err) {
        console.log(err)
    }
}

exports.selectClass = async (req, res, next) => {
    const slClass = await prisma.class.findMany()
    res.json({ slClass, message: "Select Class"})
} 