/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import "./tweet.css"
import { Avatar } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from "react-redux";
import { retweetTweet } from "../../src/features/tweetOperations/tweetOperationsSlice";





function Tweet({ tweet }) {

    const tweetcontent = tweet.tweetcontent;
    const navigate = useNavigate();

    const [likeCount, setLikeCount] = useState(tweet.likes);
    const [liked, setLiked] = useState(false)

    const ip = import.meta.env.VITE_IP;
    const fetchLiked = async () => {
        try {
            const config = "bearer " + localStorage.getItem("token");

            const response = await fetch(ip + "/tweet/isLiked/" + tweet._id, {
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
    useEffect(() => {
        if(logged){

            fetchLiked();
        }
    }, []);


    const { logged, user } = useSelector(state => state.auth)


    const like = async () => {
        if (logged) {
            console.log(user);
            try {
                const config = "bearer " + localStorage.getItem("token")
                const response = await fetch(ip + "/tweet/likeTweet/" + tweet._id, {
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
            navigate("/tweet/" + tweet._id, { state: asd })

        }
        else {
            navigate("/auth")

        }

    }

    const dispatch = useDispatch()

    const retweet = () => {
        if (logged) {
            const a = {
                id: tweet._id,
                public: true
            }
            dispatch(retweetTweet(a))

        }
        else {
            navigate("/auth")

        }

    }



    const gotoprofile = () => {
        navigate("/profile/"+tweet.tweetownerid)
    }
    const twdate = new Date(tweet.tweetdate)

    return (

        <div className="tweet col-12">
            <div className="d-flex w-100">
                <div className="cp" onClick={gotoprofile}>

                <Avatar>{tweet.tweetowner[0].toUpperCase()}</Avatar>
                </div>


                <div className="d-flex flex-column aaaaa pl-1">

                    <div className="d-flex justify-content-between w-100">
                        <div className="d-flex" onClick={gotoprofile} >
                            <div className="isim isimprofile cp" >

                                {tweet.tweetowner}

                            </div>
                            <div className="solgun pl-1">

                                @{tweet.tweetownerid}
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
                        {tweetcontent.length > 500 ? (
                            <div className="tweetcontent">
                                {tweetcontent.slice(0, 500)}
                                <a>... Daha Fazla Göster</a>
                            </div>
                        ) : (
                            <div onClick={() => navigate("/tweet/" + tweet._id)} >

                                {
                                    tweetcontent.split(" ").map((element) => {
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
                        {tweet.comments > 999 ? String(tweet.comments).slice(0, -3) + "k" : tweet.comments == null ? 0 : tweet.comments}
                    </div>
                </div>
                <div onClick={retweet} className="d-flex icon">
                    <AutorenewIcon></AutorenewIcon>
                    <div className="sag">

                        {tweet.retweets > 999 ? String(tweet.retweets).slice(0, -3) + "k" : tweet.retweets == null ? 0 : tweet.retweets}
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

    );
}

export default Tweet;