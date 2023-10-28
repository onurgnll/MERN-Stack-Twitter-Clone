const express = require("express");
const { follow, showFollowers,details,unfollow,showLikedTweets, showFollowed,setSeenAllNotifications, showFollowedTweets, ownNotifications, getTweets, getLikedTweets } = require("../controllers/userController");
const isLogged = require("../middlewares/loginMiddleware");

const router = express.Router();


router.post("/follow/:id" ,isLogged, follow)
router.post("/unfollow/:id" ,isLogged, unfollow)
router.get("/followers/:username" , showFollowers)
router.get("/followed/:username" , showFollowed)
router.get("/showfollowedtweets" ,isLogged, showFollowedTweets)

router.get("/getLikedTweets" ,isLogged, getLikedTweets) //
router.get("/showLikedTweets/:username" , showLikedTweets) //
router.get("/tweets/:username" , getTweets) //
router.get("/details/:username", details) //
router.get("/ownNotifications/" ,isLogged, ownNotifications)
router.post("/setSeenAllNotifications/" ,isLogged, setSeenAllNotifications)

module.exports = router