/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./retweet.css"
import "../tweet/tweet.css"
import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import { retweetTweet } from "../../src/features/tweetOperations/tweetOperationsSlice";
function Retweet({ retweet }) {

    const ip = import.meta.env.VITE_IP;
    const tweetcontent = retweet.tweet.tweetcontent;
    const navigate = useNavigate();

    const [likeCount, setLikeCount] = useState();
    const [commentCount, setcommentCount] = useState();
    const [liked, setLiked] = useState(false)
    const [rtlikeCount, rtsetLikeCount] = useState(retweet.likes);
    const [rtliked, rtsetLiked] = useState(false)

    const [retweetCount,setRetweetCount] = useState();

    const [retweetedTweet1 , setRetweetedTweet1] = useState(null);

    const fetchrtLiked = async () => {
        try {
            const config = "bearer " + localStorage.getItem("token");

            const response = await fetch(ip + "/tweet/rtisLiked/" + retweet._id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': config
                }
            });

            if (response.ok) {
                const result = await response.json();
                rtsetLiked(result.found)


            } else {
                console.error('HTTP Error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const fetchLiked = async () => {
        try {
            const config = "bearer " + localStorage.getItem("token");

            const response = await fetch(ip + "/tweet/isLiked/" + retweet.tweet._id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': config
                }
            });

            if (response.ok) {
                const result = await response.json();
                setLiked(result.found)


            } else {
                console.error('HTTP Error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };



    const getrtTweet = async () => {
        try {
            const response = await fetch(ip + "/tweet/details/" + retweet.tweetid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.ok) {
                const result = await response.json();
                setRetweetedTweet1(result.tweet)
                setLikeCount(result.tweet.likes)
                setcommentCount(result.tweet.comments)
                setRetweetCount(result.tweet.retweets)

            } else {
                console.error('HTTP Error:', response.status);
            }
            
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getrtTweet();


        if (logged) {

            fetchLiked();fetchrtLiked();
        }
    }, []);


    const { logged, user } = useSelector(state => state.auth)

    const likert  = async () => {
        if (logged) {
            try {
                const config = "bearer " + localStorage.getItem("token")
                const response = await fetch(ip + "/tweet/likeReTweet/" + retweet._id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': config
                    }
                })

                const result = await response.json();
                if (result.success) {
                    console.log(likeCount);
                    if (!(result.likes > rtlikeCount)) {
                        rtsetLiked(false)
                    } else {
                        rtsetLiked(true)
                    }
                    rtsetLikeCount(result.likes)
                }

            } catch (error) {
                console.log(error);
            }
        }
        else {
            navigate("/auth")

        }


    }

    const like = async () => {
        if (logged) {
            console.log(user);
            try {
                const config = "bearer " + localStorage.getItem("token")
                const response = await fetch(ip + "/tweet/likeTweet/" + retweet.tweet._id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': config
                    },
                    body: JSON.stringify({
                        userid: user._id

                    }),
                })

                const result = await response.json();
                if (result.success) {
                    console.log(likeCount);
                    if (!(result.likes > likeCount)) {
                        setLiked(false)
                    } else {
                        setLiked(true)
                    }
                    setLikeCount(result.likes)
                }

            } catch (error) {
                console.log(error);
            }
        }
        else {
            navigate("/auth")

        }


    }
    const comment = () => {
        if (logged) {
            const asd = true
            navigate("/tweet/" + retweet.tweet._id, { state: asd })

        }
        else {
            navigate("/auth")

        }

    }

    const dispatch = useDispatch()

    const retweeta = () => {
        if (logged) {
            const a = {
                id: retweet.tweet._id,
                public: true
            }
            dispatch(retweetTweet(a)).then((b) => {
                if(b.payload.success){
                    setRetweetCount(retweetCount+1)
                }
            })

        }
        else {
            navigate("/auth")

        }

    }




    const twdate = new Date(retweet.tweet.tweetdate)
    const rtwdate = new Date(retweet.retweetdate)
    { retweet.tweet }
    return (
        <div className="text-light d-flex flex-column">
            <div className="d-flex pt-4">
                <div className="cp" onClick={() => navigate("/profile/" + retweet.retweetownerusername)}>
                    <Avatar>{retweet.retweetownername[0].toUpperCase()}</Avatar>

                </div>
                <div className="d-flex flex-column pl-1 w-25 cp "  onClick={() => navigate("/profile/" + retweet.retweetownerusername)}>
                    <span className="fw-bold isimprofile" >

                        {retweet.retweetownername}
                    </span>
                    <span className="solgun">
                        @{retweet.retweetownerusername}
                    </span>
                </div>
                <div className="d-flex justify-content-between w-100">
                    <span className="fw-bold pl-3">Bir Gönderiyi Retweetledi</span>

                    <div className="d-flex justify-content-end solgun">
                        <div style={{ paddingLeft: "0.5rem" }}>
                            {rtwdate.getHours().toString().padStart(2, '0')}:
                            {rtwdate.getMinutes().toString().padStart(2, '0')}
                        </div>
                        <div style={{ paddingLeft: "0.5rem" }}>
                            {rtwdate.getDate().toString().padStart(2, '0')}/
                            {(rtwdate.getMonth() + 1).toString().padStart(2, '0')}/
                            {rtwdate.getFullYear()}

                        </div>

                    </div>

                </div>
                

            </div>

            <div className="tweet col-12 border p-3 mb-3 rounded asfff">
                <div onClick={() => navigate("/tweet/" + retweet.tweet._id)} className="d-flex w-100 cp">

                    <Avatar className="cp">{retweet?.tweet?.tweetowner[0].toUpperCase()}</Avatar>

                    <div className="d-flex flex-column aaaaa pl-1">

                        <div className="d-flex justify-content-between w-100">
                            <div className="d-flex" >
                                <div className="isim">

                                    {retweet.tweet.tweetowner}

                                </div>
                                <div className="solgun pl-1">

                                    @{retweet.tweet.tweetownerid}
                                </div>
                            </div>
                            <div className="d-flex justify-content-end solgun">
                                <div style={{ paddingLeft: "0.5rem" }}>
                                    {twdate.getHours().toString().padStart(2, '0')}:
                                    {twdate.getMinutes().toString().padStart(2, '0')}
                                </div>
                                <div style={{ paddingLeft: "0.5rem" }}>
                                    {twdate.getDate().toString().padStart(2, '0')}/
                                    {(twdate.getMonth() + 1).toString().padStart(2, '0')}/
                                    {twdate.getFullYear()}

                                </div>

                            </div>

                        </div>
                        <div className="tweetcontent">
                            {tweetcontent?.length > 500 ? (
                                <div className="tweetcontent">
                                    {tweetcontent.slice(0, 500)}
                                    <a>... Daha Fazla Göster</a>
                                </div>
                            ) : (
                                <div>

                                    {
                                        tweetcontent?.split(" ").map((element) => {
                                            return (


                                                <span key={element + Math.random()} className={element.startsWith("#") ? "trendli" : ""}> {element}</span>)
                                        })

                                    }

                                </div>
                            )}
                        </div>

                    </div>

                </div>
                <div className="footersec">
                    <div onClick={comment} className="d-flex icon">
                        <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                        <div className="sag">
                            {commentCount > 999 ? String(commentCount).slice(0, -3) + "k" : commentCount == null ? 0 : commentCount}
                        </div>
                    </div>
                    <div onClick={retweeta} className="d-flex icon">
                        <AutorenewIcon></AutorenewIcon>
                        <div className="sag">

                            {retweetCount > 999 ? String(retweetCount).slice(0, -3) + "k" : retweetCount == null ? 0 : retweetCount}
                        </div>
                    </div>
                    <div onClick={like} className="d-flex icon">

                        {liked ? <FavoriteIcon sx={{ color: "#56A7FD" }}></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}

                        <div className="sag">

                            {likeCount > 999 ? String(likeCount).slice(0, -3) + "k" : likeCount == null ? 0 : likeCount}
                        </div>
                    </div>

                </div>

            </div>
            
            <div className="footersec">
                    <div onClick={comment} className="d-flex icon">
                        <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                        <div className="sag">
                            {retweet?.comments > 999 ? String(retweet?.comments).slice(0, -3) + "k" : retweet?.comments == null ? 0 : retweet?.comments}
                        </div>
                    </div>
                    <div onClick={likert} className="d-flex icon">

                        {rtliked ? <FavoriteIcon sx={{ color: "#56A7FD" }}></FavoriteIcon> : <FavoriteBorderIcon></FavoriteBorderIcon>}

                        <div className="sag">

                            {rtlikeCount > 999 ? String(rtlikeCount).slice(0, -3) + "k" : rtlikeCount == null ? 0 : rtlikeCount}
                        </div>
                    </div>

                </div>
        </div>

    );
}

export default Retweet;