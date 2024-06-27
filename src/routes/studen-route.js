const express= require("express");
const router = express.Router();
const StudentControllers = require("../controllers/student-controllers");
const admin = require("../middlewares/admin");

router.get('/getStudent', admin, StudentControllers.getStudent)
router.get('/getTermSTD', admin, StudentControllers.getTermSTD)
router.get('/getSubjectUser', StudentControllers.getSubjectSTD)

router.patch('/resetPassword/password/:userId', StudentControllers.resetPassword)


module.exports = router