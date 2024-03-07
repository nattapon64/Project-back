const prisma = require("../configs/prisma")
const bcrypt = require('bcrypt')

exports.getClass = async (req, res , next) => {
    const getClass = await prisma.class.findMany();
    res.json({ getClass });
}
exports.getUserByClass = async (req, res , next) => {
    const{id} = req.params
    const getUser = await prisma.user.findMany({
        where: {
            classCl_id: +id 
        }
    });
    res.json({ getUser });
}

exports.getSubject = async (req, res , next) => {
    const getSubject = await prisma.subject.findMany();
    res.json({ getSubject });
}

exports.getTerm = async (req, res , next) => {
    const getTerm = await prisma.term.findMany();
    res.json({ getTerm });
}
exports.createTerm = async (req, res, next) => {
    try {
        const {datetime, grade, subjectSj_id, userUser_id} = req.body
        const termCreate = await prisma.trem.create({
            data: {
                datetime,
                grade: Number(grade),
                subjectSj_id: Number(subjectSj_id),
                userUser_id: Number(userUser_id)
            }
        })
        res.json({termCreate})
    } catch (err) {
        next(err)
    }
}

exports.teacherlogin = async (req, res, next) => {
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