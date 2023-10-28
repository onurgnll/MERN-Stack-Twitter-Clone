const express = require("express");
const { register,getUserInfo, login } = require("../controllers/authController");
const isLogged = require("../middlewares/loginMiddleware");
const router = express.Router();


router.post("/register" , register)

router.post("/login" , login)
router.get("/getUserinfo" ,isLogged, getUserInfo)
module.exports = router