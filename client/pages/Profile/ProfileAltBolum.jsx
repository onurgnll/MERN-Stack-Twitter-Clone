/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AltBolumSelections from "./AltBolumSelections";
import Tweet from "../../components/tweet/Tweet";
import Retweet from "../../components/retweet/Retweet";

function ProfileAltBolum({ userName}) {
    const [tweets, setTweets] = useState();
    const [likedtweets, setLikedtweets] = useState();

    console.log(userName);

    const ip = import.meta.env.VITE_IP;
    useEffect(() => {
        getUserTweets()
        getLikedTweets()
    },[userName])

    const getUserTweets = async() => {
        const response = await fetch(ip + "/user/tweets/" + userName, {
            method: "GET", // or 'PUT'
            headers: {
              "Content-Type": "application/json"
            }
          });
        const result = await response.json();

        setTweets(result.tweets)
    }

    const getLikedTweets = async() => {

        const response = await fetch(ip + "/user/showLikedTweets/"+ userName, {
            method: "GET", // or 'PUT'
            headers: {
              "Content-Type": "application/json"
            }
          });
        const result = await response.json();
        setLikedtweets(result.tweets)
    }

    const [showWhat ,setshowWhat] = useState("Tweetler");
    const { retweets} = useSelector(state => state.tweet)
    return (

        <div className="altbolum">
            <AltBolumSelections setshowWhat={setshowWhat} showWhat={showWhat}></AltBolumSelections>


            {showWhat == "Tweetler" ? 
            tweets?.map((element) => {
                return (<div key={element._id} className="mx-5 border-bottom"><Tweet key={element._id} tweet={element}></Tweet></div>)
            })
            
            :
            showWhat == "Beğenilenler" ? 
            
            likedtweets?.map((element) => {
                return (<div className="px-4 border-bottom" key={element._id}><Tweet tweet={element}></Tweet></div>)
            })
            
            
            : 
            <div>
                {retweets?.map((element) => {
                    return (<div key={element._id} className="mx-5 border-bottom"><Retweet key={element._id} retweet={element}></Retweet></div>)
                })}

            </div>

            
            }

        </div>

    );
}

export default ProfileAltBolum;