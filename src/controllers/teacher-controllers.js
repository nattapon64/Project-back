const prisma = require("../configs/prisma");
const bcrypt = require("bcrypt");

exports.getClass = async (req, res, next) => {
  const getClass = await prisma.class.findMany();
  res.json({ getClass });
};
exports.getUser = async (req, res, next) => {
  const getUser = await prisma.user.findMany({
    include: {
      class: true,
    },
  });
  res.json({ getUser });
};

exports.getUserByClass = async (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  const getUser = await prisma.user.findMany({
    where: {
      classCl_id: +id,
    },
  });
  res.json({ getUser });
};

exports.getUserByID = async (req, res, next) => {
  const { id } = req.params;

  console.log(id);

  const getUser = await prisma.user.findMany({
    where: {
      user_id: +id,
    },
  });
  res.json({ getUser });
};

exports.getSubject = async (req, res, next) => {
  const getSubject = await prisma.subject.findMany();
  res.json({ getSubject });
};

exports.getTerm = async (req, res, next) => {
  const getTerm = await prisma.term.findMany();
  console.log(getTerm)
  res.json({ getTerm });
};
exports.createTerm = async (req, res, next) => {
  try {
    const { datetime, grade, subjectSj_id, userUser_id } = req.body;

    console.log(req.body);
    // console.log(year)
    const termCreate = await prisma.term.create({
      data: {
        datetime: String(datetime),
        grade,
        subjectSj_id: Number(subjectSj_id),
        userUser_id: Number(userUser_id),
      },
    });
    res.json({ termCreate });
  } catch (err) {
    next(err);
  }
};

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
    console.log(payload.id);
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log(token);
    res.json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.getTerm = async (req, res, next) => {
  const getTerm = await prisma.term.findMany();
  res.json({ getTerm });
};

exports.searchUser = async (req, res, next) => {
  try {
    const searchUserID = req.query.search || "";

    console.log(searchUserID);

    const search = decodeURIComponent(searchUserID);

    const getsearchUser = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                username: {
                  contains: search,
                },
              },
            ],
          },
        ],
      },
    });

    res.json({ getsearchUser });
  } catch (err) {
    next(err);
  }
};

exports.updateGrade = async (req, res, next) => {
  const { trID } = req.params;
  const { datetime, grade, subjectSj_id, userUser_id } = req.body;
  try {
    const rs = await prisma.term.update({
      data: {
        datetime,
        grade,
        subjectSj_id,
        userUser_id,
      },
      where: { tr_id: Number(trID)},
    });
    res.json({ message: "UPDATE", resault: rs})
  } catch (err) {
    next(err);
  }
};

exports.getGradeByUID = async (req, res, next) => {

    const { userID } = req.params;

    try {
        const gradeUID = await prisma.term.findFirst({
            where: {
                user: {
                    user_id: Number(userID)
                }
            }     
        })
        res.json({ gradeUID })
    }catch(err){
        next(err)
        console.log(err)
    }
}
