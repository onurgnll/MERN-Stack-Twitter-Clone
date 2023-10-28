/* eslint-disable react/prop-types */

import { Avatar, Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { blue } from '@mui/material/colors';
import { getFolloweds, getFollowers, getUserProfile } from "../../src/features/user/userSlice";
const emails = ['username@gmail.com', 'user02@gmail.com'];

function ProfileUstBolum({ userr ,userName}) {

  const ip = import.meta.env.VITE_IP;
  const {  followers , followed } = useSelector(state => state.user)
  const { logged, user } = useSelector(state => state.auth)
  const handleListItemClick = (value) => {
    handleClose(value);
  };
  const [openfollowed, setOpenfollowed] = React.useState(false);

  const handleClickOpenfollowed = () => {
    setOpenfollowed(true);
  };

  const handleClosefollowed = (value) => {
    setOpenfollowed(false);
    setSelectedValue(value);
  };
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const userjoined = new Date(userr.joinedDate)

const dispatch = useDispatch();

  const follow = async() => {
    try {
      const config = "bearer " + localStorage.getItem("token")
      const res = await fetch(ip + "/user/follow/" + userr._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': config
        }
      })
      const data = await res.json();
      console.log(data);
      if(data.success){
        dispatch(getFollowers(userName))
        dispatch(getFolloweds(userName))
        dispatch(getUserProfile(userName))

      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const unfollow = async() => {
    try {
      const config = "bearer " + localStorage.getItem("token")
      const res = await fetch(ip + "/user/unfollow/" + userr._id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': config
        }
      })
      const data = await res.json();
      console.log(data);
      if(data.success){
        dispatch(getFollowers(userName))
        dispatch(getFolloweds(userName))
        dispatch(getUserProfile(userName))

      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="ustbolum mt-4 pl-2 pb-3">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <div>

            <Avatar sx={{ width: 96, height: 96, fontSize: 36 }}>{userr?.name ? userr?.name[0]?.toUpperCase() : ""}</Avatar>
          </div>
          <div className="d-flex flex-column fs-5 pl-1 mt-3">
            <span className="fw-bold" >

              {userr.name} {userr.lastname}
            </span>
            <span className="solgun">@{userr.username}</span>
          </div>


        </div>
        <div className="align-self-center">
          {logged
            ?
            user.username == userr.username ? 
            <></>
            // <button className="mr-2 rounded-pill p-2">Profili Düzenle</button> 
            :

              userr?.followers?.includes(user._id) ?
                <button onClick={unfollow} className="mr-2 rounded-pill p-2">Takipten Çık</button> :
                <button onClick={follow} className="mr-2 rounded-pill p-2">Takip Et</button>
            :
            <></>
          }
        </div>
      </div>
      <div className="mt-3 solgun">

        <CalendarMonthIcon></CalendarMonthIcon>
        <span style={{ paddingLeft: "0.5rem" }}>
          {userjoined.getDate().toString().padStart(2, '0')}.
          {(userjoined.getMonth() + 1).toString().padStart(2, '0')}.
          {userjoined.getFullYear()}

        </span>   <span>Tarihinde Katıldı</span>
      </div>
      <div className="mt-3 d-flex">
        <div onClick={handleClickOpenfollowed} className="cp">
          <span className="fw-bold">
            {userr.followed?.length}
          </span>
          <span className="solgun aa">Takip Edilen</span>

        </div>
        <div onClick={handleClickOpen} className="cp">
          <span className="fw-bold a">
            {userr.followers?.length}
          </span>
          <span className="solgun aa">Takipçi</span>

        </div>
      </div>
      <Dialog onClose={handleClosefollowed} open={openfollowed} sx={{
        backgroundColor: "rgba(236, 236, 236, 0.4)", zIndex: "9999999"
      }} >
        <DialogTitle sx={{ color: "white" }}>Takip Edilenler</DialogTitle>
        <List sx={{ pt: 0 }}>
          {followed?.map((element) => (
            <ListItem disableGutters key={element._id}>
              <ListItemButton onClick={() => handleListItemClick(element._id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    {element?.name[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={element.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>

      <Dialog onClose={handleClose} open={open} sx={{
        backgroundColor: "rgba(236, 236, 236, 0.4)", zIndex: "9999999"
      }} >
        <DialogTitle sx={{ color: "white" }}>Takipçiler</DialogTitle>
        <List sx={{ pt: 0 }}>
          {followers?.map((element) => (
            <ListItem disableGutters key={element._id}>
              <ListItemButton onClick={() => handleListItemClick(element._id)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    {element?.name ? element?.name[0].toUpperCase() : ""}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={element.username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>



    </div>

  );
}

export default ProfileUstBolum;