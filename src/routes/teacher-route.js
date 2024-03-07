const express= require("express");
const router = express.Router();
const TeacherControllers = require('../controllers/teacher-controllers')

router.get('/class', TeacherControllers.getClass)
router.get('/subject', TeacherControllers.getSubject)
router.get('/term', TeacherControllers.getTerm)
router.get('/user/:id', TeacherControllers.getUserByClass)
// router.get('/login', TeacherControllers.teacherlogin)

router.post('/term', TeacherControllers.createTerm)

module.exports = router