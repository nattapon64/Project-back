const express= require("express");
const router = express.Router();
const TeacherControllers = require('../controllers/teacher-controllers')

router.get('/class', TeacherControllers.getClass)
router.get('/subject', TeacherControllers.getSubject)
router.get('/term', TeacherControllers.getTerm)
router.get('/term/:userID', TeacherControllers.getGradeByUID)
router.get('/user',TeacherControllers.getUser)
router.get('/user/:id', TeacherControllers.getUserByClass)
router.get('/getUSer/:id', TeacherControllers.getUserByID)
router.get('/searchUser*', TeacherControllers.searchUser)
// router.get('/login', TeacherControllers.teacherlogin)

router.post('/term', TeacherControllers.createTerm)

router.patch('/updategrade/:trID', TeacherControllers.updateGrade)

module.exports = router