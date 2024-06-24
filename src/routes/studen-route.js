const express= require("express");
const router = express.Router();
const StudentControllers = require("../controllers/student-controllers");

router.get('/getStudent', StudentControllers.getStudent)
router.get('/getTermSTD', StudentControllers.getTermSTD)


module.exports = router