const express = require("express");
const { postTweet, showTweet,trends,getRetweets,likereTweet,rtisLiked,showReTweet,showComments, likeTweet, removeTweet, page, isLiked, commentTweet, retweet } = require("../controllers/tweetController");
const isLogged = require("../middlewares/loginMiddleware");

const router = express.Router();

router.get("/details/:id" , showTweet) //!!!!!!!!!!!!!!!!!!!!!!
router.get("/page/:pageNumber" , page)
router.get("/comments/:id" , showComments)
router.get("/trends" , trends)
router.get("/isLiked/:id" ,isLogged, isLiked)
router.get("/rtisLiked/:id" ,isLogged, rtisLiked)
router.get("/getretweets/:username" , getRetweets);


router.post("/", isLogged, postTweet)
router.post("/retweet/:id", isLogged, retweet)
router.post("/retweetdetails/:id", showReTweet)
router.post("/likeTweet/:id" ,isLogged, likeTweet)
router.post("/likereTweet/:id" ,isLogged, likereTweet)
router.post("/comment/:id" ,isLogged, commentTweet)




router.delete("/:id" ,isLogged, removeTweet)

module.exports = router