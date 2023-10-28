/* eslint-disable react-hooks/exhaustive-deps */
import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import "./tweetdetail.css"
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../src/features/auth/authSlice';


function TweetDetail() {
    // useParams hook'unu kullanarak dinamik "id" parametresini yakalayın

    const ip = import.meta.env.VITE_IP;
    const location = useLocation();
    const { logged, user } = useSelector(state => state.auth)


    const { id } = useParams();
    const [tweet, setTweet] = useState(null);
    const [comments, setComments] = useState([]);


    const [commenting, setCommenting] = useState(false || location.state)


    const [likeCount, setLikeCount] = useState(tweet?.likes);
    const [liked, setLiked] = useState(false)

    const isLiked = async () => {
        try {
            const config = "bearer " + localStorage.getItem("token");

            const response = await fetch(ip + "/tweet/isLiked/" + id, {
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




    const fetchTweetDetails = async () => {
        try {

            const response = await fetch(ip + "/tweet/details/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const responsecomment = await fetch(ip + "/tweet/comments/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const result = await response.json();
                const result2 = await responsecomment.json();

                setComments(result2.comments)
                setTweet(result.tweet)
                setLikeCount(result.tweet.likes)

            } else {
                console.log('HTTP Error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserInfo()).then((a) => {
            if (a.payload.success) {

                isLiked();
            }
        })
        fetchTweetDetails();
    }, []);


    const [commentContent, setCommentContent] = useState(""); // Yazi girisinin içeriğini saklayacak state

    const handleCommentContentChange = (event) => {
        setCommentContent(event.target.value); // Her değişiklikte state'i güncelle
    };



    const [loading, setLoading] = useState(false);
    const like = async () => {
        if (logged) {
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
                console.log(result);
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

    const navigate = useNavigate()
    const comment = () => {
        if (logged) {

            setCommenting(!commenting)
        }
        else {
            navigate("/auth")
        }

    }

    const postComment = async () => {
        try {
            setLoading(true);
            const config = "bearer " + localStorage.getItem("token")

            const response = await fetch(ip + "/tweet/comment/" + tweet._id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': config
                },
                body: JSON.stringify({
                    owner: user.name + " " + user.lastname,
                    ownerid: user.username,
                    content: commentContent
                }),
            })

            const result = await response.json();
            if (result.success) {
                fetchTweetDetails();
                setLoading(false)

            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const retweet = () => {
        if (logged) {

            setCommenting(!commenting)
        }
        else {
            navigate("/auth")
        }

    }


    return (
        <div className='tweeet p-3 col-6'>
            <div className='d-flex flex-column '>

                <div className='d-flex mt-2'>

                    <Avatar className="cp">{tweet?.tweetowner[0]}</Avatar>
                    <div className='d-flex justify-content-between w-100 pl-1'>
                        <div className='d-flex flex-column'>
                            <div className='isim'>

                                {tweet?.tweetowner}
                            </div>
                            <div className='solgun'>

                                @{tweet?.tweetownerid}
                            </div>

                        </div>
                        <div className='d-flex solgun'>
                            <div style={{ paddingLeft: "0.5rem" }}>
                                {new Date(tweet?.tweetdate).getHours().toString().padStart(2, '0')}:
                                {new Date(tweet?.tweetdate).getMinutes().toString().padStart(2, '0')}
                            </div>
                            <div style={{ paddingLeft: "0.5rem" }}>
                                {new Date(tweet?.tweetdate).getDate().toString().padStart(2, '0')}/
                                {(new Date(tweet?.tweetdate).getMonth() + 1).toString().padStart(2, '0')}/
                                {new Date(tweet?.tweetdate).getFullYear()}

                            </div>

                        </div>

                    </div>
                </div>

                <div className='contentt  mt-3'>


                    {
                        tweet?.tweetcontent.split(" ").map((element) => {
                            return (


                                <span key={element + Math.random()} className={element.startsWith("#") ? "trendli" : ""}> {element}</span>)
                        })

                    }

                </div>

                <div className="footersec">
                    <div onClick={comment} className="d-flex icon">
                        <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                        <div className="sag">
                            {tweet?.comments > 999 ? String(tweet?.comments).slice(0, -3) + "k" : tweet?.comments == null ? 0 : tweet?.comments}
                        </div>
                    </div>
                    <div onClick={retweet} className="d-flex icon">
                        <AutorenewIcon></AutorenewIcon>
                        <div className="sag">

                            {tweet?.retweets > 999 ? String(tweet?.retweets).slice(0, -3) + "k" : tweet?.retweets == null ? 0 : tweet?.retweets}
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
            {logged ?
                <div className={commenting ? "d-flex w-100" : "d-none"}>
                    <div className='d-flex pl-3 pt-4 pr-3 w-100'>
                        <div className="type w-100 p-0">
                            <div className="d-flex h-100">
                                <Avatar>{user?.name[0]}</Avatar>

                                <div className="d-flex flex-column justify-content-between abc w-100">
                                    <div>
                                        <textarea
                                            rows={4}
                                            className="textareeaa"
                                            placeholder="Yorumunuzu Girin"
                                            type="text"
                                            value={commentContent} // State'den gelen değeri görüntüle
                                            onChange={handleCommentContentChange} // Değişiklik olduğunda handleTweetContentChange fonksiyonunu çağır
                                        />
                                    </div>
                                    <div>
                                        <button onClick={postComment} disabled={loading} className="publishbutton">{loading ? <div className="spinner-border"></div> : "Paylaş"}{/* Loading durumuna göre düğme metnini değiştirme */}</button>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>

                </div>

                :
                <></>
            }

            <div>
                {comments?.length > 0 ?

                    comments.map((element) => {
                        return (
                            <div key={element._id} className='d-flex pl-3 pt-4 pr-3'>
                                <Avatar>{element.owner[0].toUpperCase()}</Avatar>
                                <div className='d-flex flex-column w-100 pl-1'>
                                    <div className='d-flex justify-content-between'>
                                        <div className='c-isimler d-flex '>
                                            {element.owner}
                                            <div className='solgun pl-1'>
                                                @{element.ownerid}

                                            </div>

                                        </div>


                                        <div className='solgun d-flex'>
                                            <div>
                                                {new Date(element?.commentdate).getDate().toString().padStart(2, '0')}/
                                                {(new Date(element?.commentdate).getMonth() + 1).toString().padStart(2, '0')}/
                                                {new Date(element?.commentdate).getFullYear()}

                                            </div>
                                            <div className='d-flex pl-1'>
                                                {new Date(element?.commentdate).getHours().toString().padStart(2, '0')}:
                                                {new Date(element?.commentdate).getMinutes().toString().padStart(2, '0')}
                                            </div>

                                        </div>

                                    </div>
                                    <div className='text-break'>


                                        {element.content}
                                    </div>

                                </div>



                            </div>

                        )
                    })


                    :


                    ""}


            </div>



        </div>
    );
}

export default TweetDetail;
