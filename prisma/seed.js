const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const addMajor = [
  { lsg_name: "คณิตศาสตร์" },
  { lsg_name: "วิทยาศาสตร์และเทคโนโลยี" },
  { lsg_name: "ภาษาไทย" },
  { lsg_name: "ภาษาต่างประเทศ" },
  { lsg_name: "สังคมศึกษา ศาสนาและวัฒนธรรม" },
  { lsg_name: "สุขศึกษา พลศึกษา" },
  { lsg_name: "ศิลปศึกษา" },
  { lsg_name: "การงานอาชีพ" },
  { lsg_name: "กิจกรรมพัฒนาผู้เรียน" },
  { lsg_name: "งานแนะแนว" },
];

const addClass = [
  {classroom: "ไม่มีห้อง"},
  {classroom: "ม.1/1"},
  {classroom: "ม.1/2"},
  {classroom: "ม.2/1"},
  {classroom: "ม.2/2"},
  {classroom: "ม.3/1"},
  {classroom: "ม.3/2"},
];

const addSubject = [
  { subject: "สุขศึกษา", sub_code: "พ21102", credit: 1 },
  { subject: "คณิตศาสตร์", sub_code: "ค21102", credit: 3 },
  { subject: "ทัศนศิลป์", sub_code: "ศ21102", credit: 1 },
  { subject: "ภาษาไทย", sub_code: "ท21102", credit: 2 },
  { subject: "หุ่นยนต์", sub_code: "ว21202", credit: 3 },
  { subject: "สัมคมศึกษา", sub_code: "ส21102", credit: 1 },
  { subject: "ประวัติศาสตร์", sub_code: "ส21104", credit: 1 },
  { subject: "เวทคณิต", sub_code: "ค21102", credit: 1 },
  { subject: "ภาษาอังกฤษ", sub_code: "อ21102", credit: 2 },
  { subject: "วิทยาศาสตร์-01", sub_code: "ว21102", credit: 3 },
  { subject: "ดนตรี", sub_code: "ศ21104", credit: 1 },
  {
    subject: "ออกแบบและเทคโนโลยี",
    subject: "ว21104",
    credit: 3
  },
  { subject: "การงานอาชีพ", sub_code: "ง21102", credit: 1 },
  { subject: "แนะแนว", sub_code: "-", credit: 1 },
  { subject: "ลูกเสือ", sub_code: "-", credit: 1 },
  { subject: "ชุมนุม", sub_code: "-", credit: 1 },
  { subject: "วิทยาศาสตร์-02", sub_code: "ว21102", credit: 3 },
  {
    subject: "ภาษาไทยเพื่อการสื่อสาร",
    sub_code: "ท21202",
    credit: 2
  },
  {
    subject: "พื้นฐานนาฏศิลป์ไทย",
    sub_code: "ศ21204",
    credit: 1
  },
  { subject: "บาสเกตบอล", sub_code: "พ21104", credit: 1 },
];


const majorAdd = async () => {
  try {
    await prisma.Lsg.createMany({
      data: addMajor,
    });
  } catch (err) {
    console.log(err);
  }
};

const subjectAdd = async () => {
  try {
    await prisma.subject.createMany({
      data: addSubject,
    });
  } catch (err) {
    console.log(err);
  }
};

const subClassAdd = async () => {
  try {
    await prisma.class.createMany({
      data: addClass,
    });
  } catch (err) {
    console.log(err);
  }
};

majorAdd();
subjectAdd();
subClassAdd();
