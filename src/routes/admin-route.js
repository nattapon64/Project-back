const express= require("express");
const router = express.Router();
const AdminControllers = require("../controllers/admin-controllers");
const upload = require("../middlewares/upload");


router.get('/user', AdminControllers.getUser)
router.get('/subject', AdminControllers.getSubject)
router.get('/selectClass', AdminControllers.selectClass)

router.post('/user', upload.array("image", 1), AdminControllers.createUser)
router.post('/subject', AdminControllers.createSubject)
// router.post('/login', AdminControllers.adminlogin)

router.patch('/update/:userID', AdminControllers.updetaUser)

router.delete('/user/:userID', AdminControllers.deleteUser)
router.delete('/subject/:subjectID', AdminControllers.deleteSubject)

module.exports = router