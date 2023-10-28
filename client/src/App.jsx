/* eslint-disable react-hooks/exhaustive-deps */
import {   Route, Routes } from "react-router-dom"
import LeftSection from "../components/leftsection/LeftSection"
import RightSection from "../components/rightsection/RightSection"
import "./app.css"
import HomePage from "../pages/HomePage"
import NoPage from "../pages/NoPage"
import Notifications from "../pages/Notifications"
import Profile from "../pages/Profile/Profile"
import AuthPage from "../pages/authpage/AuthPage"
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import TweetDetail from "../pages/tweetDetail/TweetDetail"
import { getNotifications } from "./features/user/userSlice"
import { getUserInfo } from "./features/auth/authSlice"

function App() {

  const dispatch = useDispatch();


  const {logged , authLoading , user} = useSelector(state => state.auth)

  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(getUserInfo()).then((a) => {
        if(a.payload.success == true){
          dispatch(getNotifications())
      }
      })
    }
  },[])
// 
  return (
    <div className="aaa">
      <div className="d-flex aaa">
        <Routes>
          <Route path="/" element={<><LeftSection /><HomePage></HomePage><RightSection/></>}/>
          {/* <Route path="/" element={logged ? <Asd></Asd> : <AuthPage></AuthPage>}/> */}
          <Route path="/tweet/:id" element={<><LeftSection /><TweetDetail></TweetDetail><RightSection/></>}></Route>
          <Route path="/notifications" element={<><LeftSection /><Notifications></Notifications><RightSection/></>}/>
          <Route path="/profile/:userName"  element={<><LeftSection /><Profile></Profile><RightSection/></>}/>
          <Route path="*" element={<NoPage />} />
          <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
        </Routes>




        

        

      </div>


    </div>
  )
}

export default App
