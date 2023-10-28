const express = require("express");
const authRouter = require("./authRouter");
const userRouter = require("./userRouter");
const tweetRouter = require("./tweetRouter");


const router = express.Router();



router.use("/auth", authRouter)
router.use("/tweet", tweetRouter)
router.use("/user", userRouter)


module.exports = router