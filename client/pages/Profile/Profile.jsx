/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import "./profile.css"
import ProfileUstBolum from "./ProfileUstBolum";
import ProfileAltBolum from "./ProfileAltBolum";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {useParams } from "react-router-dom";
import { getFolloweds, getFollowers, getUserProfile } from "../../src/features/user/userSlice";
import { getRetweets } from "../../src/features/tweet/tweetSlice";
function Profile() {

  const { userName } = useParams();
  const { profileUser  } = useSelector(state => state.user)
  const dispatch = useDispatch()




  useEffect(() => {
    dispatch(getFollowers(userName))
    dispatch(getFolloweds(userName))
    dispatch(getUserProfile(userName))
    dispatch(getRetweets(userName))
  },[userName])

  return (
    <div className="anadiv col-6 text-light">
        <div>

          <ProfileUstBolum userr={profileUser} userName={userName}></ProfileUstBolum>
          <ProfileAltBolum user={profileUser} userName={userName}></ProfileAltBolum>
        </div>


    </div>);
}

export default Profile;