

const Notification = require("../models/Notification");
const Tweet = require("../models/Tweet");
const User = require("../models/User")
const unfollow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        const followinguser = await User.findById(id);

        user.followed = user.followed.filter((element) => element.toString() !== followinguser._id.toString());
        followinguser.followers = followinguser.followers.filter((element) => element.toString() !== user._id.toString());

        await followinguser.save();
        await user.save();

        console.log(user);
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    }
}

const follow = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user._id);
        const followinguser = await User.findById(id);

        // Kontrol ekleme
        if (!user.followed.includes(followinguser._id)) {
            user.followed.push(followinguser._id);
        }
        if (!followinguser.followers.includes(user._id)) {
            followinguser.followers.push(user._id);
        }

        await followinguser.save();
        await user.save();

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error,
        });
    }
}

const showFollowed = async (req, res, next) => {

    try {
        const username = req.params.username
        let followed = [];
        const user = await User.find({ username: username });
        for (const element of user[0].followed) {
            const follower = await User.findById(element)
            followed.push(follower)
        }


        res.status(200).json(
            {
                success: true,
                followed

            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }

}
const showFollowers = async (req, res, next) => {

    try {
        const username = req.params.username

        let followers = [];

        const user = await User.find({ username: username });

        for (const element of user[0].followers) {
            const follower = await User.findById(element)
            followers.push(follower)
        }


        res.status(200).json(
            {
                success: true,
                followers

            }
        )

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }

}

const showFollowedTweets = async (req, res, next) => {
    try {
        let followedTweets = [];


        const user = await User.findById(req.body.userid);


        if (user.followed) {
            for (const element of user.followed) {
                let followeduser = await User.findById(element);
                if (followeduser.tweets) {
                    for (const tweetId of followeduser.tweets) {
                        let followeduserstweet = await Tweet.findById(tweetId);
                        followedTweets.push(followeduserstweet);
                    }
                }
            }
        }




        res.status(200).json({
            success: true,
            followedTweets: followedTweets.sort((b, a) => new Date(a.tweetdate) - new Date(b.tweetdate))
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};

const ownNotifications = async (req, res, next) => {
    try {


        const notifications = await Notification.find({ ownerid: req.user._id, seen: false })


        res.status(200).json({
            success: true,
            notifications: notifications.reverse()
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }

}


const setSeenAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.find({ ownerid: req.user._id, seen: false })

        if (notifications) {
            for (const notification of notifications) {
                notification.seen = true; // Eğer bu alanı "false" yapmak istiyorsanız "false" kullanın
                await notification.save(); // Her bir bildirimi kaydedin
            }

            return res.status(200).json({
                success: true
            });



        }

        res.status(200).json({
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })

    }
}


const details = async (req, res, next) => {

    try {

        const username = req.params.username

        const user = await User.find({ username: username });



        res.status(200).json(
            {
                success: true,
                user: user[0]

            }
        )



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }


}
const getTweets = async (req, res, next) => {

    try {
        const username = req.params.username
        const tweets = await Tweet.find({ tweetownerid: username });


        res.status(200).json(
            {
                success: true,
                tweets: tweets.reverse()

            }
        )



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }


}
const showLikedTweets = async (req, res, next) => {

    try {

        const username = req.params.username

        const user = await User.findOne({username: username})
        console.log(user);
        const tweets = await Tweet.find({ likedUsers: user._id })

        console.log(tweets);



        res.status(200).json(
            {
                success: true,
                tweets: tweets.reverse()

            }
        )



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }


}

const getLikedTweets = async (req, res, next) => {

    try {

        const id = req.user._id

        const tweets = await Tweet.find({ likedUsers: id })

        console.log(tweets);



        res.status(200).json(
            {
                success: true,
                tweets: tweets.reverse()

            }
        )



    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error
        })
    }


}

module.exports = {
    follow,
    showFollowers,
    showFollowed,
    unfollow,
    ownNotifications,
    details,
    getLikedTweets,
    showLikedTweets,
    showFollowedTweets,
    getTweets,
    setSeenAllNotifications
}