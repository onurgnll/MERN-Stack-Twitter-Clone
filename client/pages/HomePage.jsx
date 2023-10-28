/* eslint-disable react-hooks/exhaustive-deps */
import YaziAlani from "../components/YaziAlani/YaziAlani";
import MiddleSection from "../components/middlesection/MiddleSection";
import Tweet from "../components/tweet/Tweet";
import "../components/style.css"
import "../components/tweet/tweet.css"
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from 'react-redux'
import EndMsg from "../components/EndMsg";
import { getTweets, reset } from "../src/features/tweet/tweetSlice";
import { getNotifications } from "../src/features/user/userSlice";
import { getUserInfo } from "../src/features/auth/authSlice";
import Retweet from "../components/retweet/Retweet";

function HomePage() {
  // const [items, setItems] = useState([]);


  const {logged,user} = useSelector(state => state.auth)

  // const [sharedTweet, setSharedTweet] = useState([]);

  const { sharedTweet} = useSelector((state) => state.tweetOperations)

  const {tweets,hasMore} = useSelector((state) => state.tweet)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTweets())
    if(localStorage.getItem("token")){
      dispatch(getUserInfo()).then((a) => {
        if(a.payload.success == true){
          dispatch(getNotifications())
      }
      })
    }
    return () => {
      dispatch(reset())
      dispatch(getNotifications())
    }
  },[])


  const [showWhoTweets ,setshowWhoTweets] = useState("Senin İçin");

  
  const next = () => {
    dispatch(getTweets());
  };
  return (
    <InfiniteScroll
      dataLength={tweets.length} //This is important field to render the next data
      next={next}
      hasMore={hasMore}
      loader={<Loader />}
      // min-height="100vh" // Corrected the syntax here
      height="100vh" // Corrected the syntax here
      endMessage={<EndMsg />}
    >

      <div className=" ccc">
        <MiddleSection setshowWhoTweets={setshowWhoTweets} showWhoTweets={showWhoTweets}></MiddleSection>


        {logged ? <YaziAlani></YaziAlani>: <></>}
        


        <div className="container-fluid aaaaaa">
          <div className="row m-2">
            {sharedTweet.length > 0 ?
            
            sharedTweet.map((element) => {
              return (<Tweet key={element._id} tweet={element}></Tweet>)
            }).reverse()
             
            
            : 
            
            <></>}
            {showWhoTweets == "Senin İçin" ? 
            
            tweets?.map((item) => {
              if(item.type == "tweet"){
                return <div key={item._id}><div className="asdasd"><Tweet key={item._id} tweet={item} /> </div> </div>;

              }
              else if(item.type == "retweet"){
                return <div key={item._id}><div className="asdasd"><Retweet key={item._id} retweet={item}></Retweet></div></div>
              }
            })
            
            : 

            tweets?.map((item) => {
              if(user.followed.includes(item.tweetowneruserid)){
                return (<div key={item._id}><div className="asdasd"><Tweet key={item._id} tweet={item} /></div> </div>)
              }
              
              // 
            })
          }
          </div>
        </div>
      </div>
    </InfiniteScroll>

  );
}

export default HomePage;