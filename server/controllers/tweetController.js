const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Page = require("../models/Page");
const Retweet = require("../models/Retweet");
const Trend = require("../models/Trend");
const Tweet = require("../models/Tweet")
const User = require("../models/User")

const page = async (req, res, next) => {

    const pageNumber = req.params.pageNumber;

    try {
        const pages = await Page.find();
        const currentPage = pages[pages.length - pageNumber];

        if (currentPage) {
            const tweetPromises = currentPage.items.map(async (element) => {
                return await Tweet.findById(element) || await Retweet.findById(element);
            });

            const tweets = await Promise.all(tweetPromises);

            res.status(200).json({
                success: true,

                tweets: tweets.reverse()

            }
            )


        } else {

            res.status(404).json({
                success: false,
                message: "Geçersiz Sayfa Numarası"
            })
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};



const retweet = async (req,res,next) => {
    try {
        var page = await Page.findOne({ full: false })
        if (!page) {
            page = await Page.create({
                full: false
            });

        }
        const {id} = req.params
        const tweet = await Tweet.findById(id)

        const user = await User.findById(req.user._id)

        const retweetdate = new Date();


        const retweet = await Retweet.create({
            tweet: tweet,
            tweetid: tweet._id,
            retweetdate,
            retweetowneruserid: user._id,
            retweetownerusername: user.username,
            retweetownername: user.name + " " + user.lastname,
            public: req.body.public == true,
            page: page?.id,
        })



        page.items.push(retweet.id)
        if (page.items.length > 14) {
            page.full = true
            page.addeddate = new Date()
        }
        await page.save()

        tweet.retweets += 1 
        await tweet.save();


        user.retweets.push(retweet._id)
        await user.save();

        res.status(200).json({
            success: true,
            retweet
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
        
    }
    
}


const postTweet = async (req, res, next) => {

    const { tweetcontent, public, tweetowner, tweetownerid } = req.body

    const tweetdate = new Date;

    try {

        var page = await Page.findOne({ full: false })
        if (!page) {
            page = await Page.create({
                full: false
            });

        }



        const user = await User.findOne({username: tweetownerid})

        const tweet = await Tweet.create({
            tweetcontent,
            tweetdate,
            tweetowner,
            tweetownerid,
            public,
            page: page?.id,
            tweetowneruserid: user._id
        })


        const tweetarray = tweetcontent.split(" ")


        tweetarray.forEach(async (element) => {
            if (element.trim().startsWith("#")) {
                const trend = await Trend.findOne({ title: element.trim() })
                if (!trend) {
                    const createdTrend = await Trend.create({ title: element.trim() })
                    createdTrend.tweets.push(tweet._id);
                    await createdTrend.save();
                } else {
                    trend.tweets.push(tweet._id);
                    await trend.save();
                }
            }
        })



        page.items.push(tweet.id)
        if (page.items.length > 14) {
            page.full = true
            page.addeddate = new Date()
        }
        await page.save()



        user.tweets.push(tweet._id)
        await user.save();

        res.status(200).json({
            success: true,
            tweet
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }

}



const commentTweet = async (req, res, next) => {
    try {
        const { id } = req.params

        const commentdate = new Date()
        const { content, owner, ownerid } = req.body

        const comment = await Comment.create({
            content,
            owner,
            ownerid,
            tweetid: id,
            commentdate
        })


        const tweet = await Tweet.findById(id)

        tweet.comments += 1
        tweet.commentsArray.push(comment._id)
        await tweet.save()


        const tweetowner = await User.findById(tweet.tweetowneruserid)

        
        const newNotification = await Notification.create({content: "@" + ownerid + " Tweetinize Yorum Bıraktı", ownerid: tweet.tweetowneruserid,notificationdate: new Date(), ownerusername: tweet.tweetownerid })
        tweetowner.notifications.push(newNotification._id)
        await tweetowner.save();

        res.status(200).json(
            {
                success: true,
                comment

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


const showReTweet= async (req, res, next) => {
    try {
        const id = req.params.id;
        const retweet = await Retweet.findById(id)

        res.status(200).json(
            {
                success: true,
                retweet

            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }


}

const showTweet = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tweet = await Tweet.findById(id)

        res.status(200).json(
            {
                success: true,
                tweet

            }
        )

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }


}

const showComments = async (req, res, next) => {
    try {

        const { id } = req.params

        const comments = await Comment.find({ tweetid: id })

        res.status(200).json(
            {
                success: true,
                comments: comments.reverse()

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

const likereTweet = async (req, res, next) => {
    try {
        let found = false;
        const id = req.params.id;
        const userid = req.user._id

        const tweet = await Retweet.findById(id)


        const tweetowner = await User.findById(tweet.retweetowneruserid)

        const likedUser = await User.findById(userid)


        tweet.likedUsers.forEach((element, index) => {
            if (element == userid) {
                tweet.likes -= 1;
                tweet.likedUsers.splice(index, 1);
                found = true;
            }
        });

        if (!found) {
            
            const newNotification = await Notification.create({content: "@" + likedUser.username + " Tweetinizi Beğendi", ownerid: tweet.retweetowneruserid,notificationdate: new Date(), ownerusername: tweet.retweetownerusername })
            tweetowner.notifications.push(newNotification._id)
            await tweetowner.save();
            tweet.likes += 1;
            tweet.likedUsers.push(userid)
        }


        await tweet.save();



        res.status(200).json(
            {
                success: true,
                likes: tweet.likes

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


const likeTweet = async (req, res, next) => {
    try {
        let found = false;
        const id = req.params.id;
        const userid = req.body.userid

        const tweet = await Tweet.findById(id)


        const tweetowner = await User.findById(tweet.tweetowneruserid)

        const likedUser = await User.findById(userid)


        tweet.likedUsers.forEach((element, index) => {
            if (element == userid) {
                tweet.likes -= 1;
                tweet.likedUsers.splice(index, 1);
                found = true;
            }
        });

        if (!found) {
            
            const newNotification = await Notification.create({content: "@" + likedUser.username + " Tweetinizi Beğendi", ownerid: tweet.tweetowneruserid,notificationdate: new Date(), ownerusername: tweet.tweetownerid })
            tweetowner.notifications.push(newNotification._id)
            await tweetowner.save();
            tweet.likes += 1;
            tweet.likedUsers.push(userid)
        }


        await tweet.save();



        res.status(200).json(
            {
                success: true,
                likes: tweet.likes

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

const rtisLiked = async (req, res, next) => {
    try {
        let found = false;
        const id = req.params.id;
        const userid = req.user._id

        const tweet = await Retweet.findById(id)

        if (tweet) {

            tweet.likedUsers.forEach((element, index) => {
                if (element == userid) {
                    found = true;
                }
            });

            if (!found) {

                return res.status(200).json(
                    {
                        found: false

                    }
                )
            }



            return res.status(200).json(
                {
                    found: true

                }
            )


        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }



}
const isLiked = async (req, res, next) => {
    try {
        let found = false;
        const id = req.params.id;
        const userid = req.user._id

        const tweet = await Tweet.findById(id)

        if (tweet) {

            tweet.likedUsers.forEach((element, index) => {
                if (element == userid) {
                    found = true;
                }
            });

            if (!found) {

                return res.status(200).json(
                    {
                        found: false

                    }
                )
            }



            return res.status(200).json(
                {
                    found: true

                }
            )


        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })

    }



}
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
const trends = async (req, res, next) => {
    try {

        await delay(500);
        const trends = await Trend.find();
        res.status(200).json(
            {
                success: true,
                trends: trends.sort((a, b) => b.tweets.length - a.tweets.length)

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


const getRetweets = async (req, res, next) => {
    try {
        const username = req.params.username

        const retweets = await Retweet.find({retweetownerusername: username})
        res.status(200).json(
            {
                success: true,
                retweets

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

const removeTweet = async (req, res, next) => {
    try {


        const id = req.params.id;

        await Tweet.findByIdAndDelete(id);

        res.status(200).json(
            {
                success: true

            }
        )


    } catch (error) {
        res.status(500).json({
            success: false,
            error
        })
    }
}



module.exports = {
    postTweet,
    showTweet,
    retweet,
    likeTweet,
    commentTweet,
    getRetweets,
    trends,
    showComments,
    showReTweet,
    page,
    rtisLiked,
    likereTweet,
    removeTweet,
    isLiked
}