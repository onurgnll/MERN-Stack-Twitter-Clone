import "../style.css"
import "./LeftSection.css"
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import PollIcon from '@mui/icons-material/Poll';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import PublicIcon from '@mui/icons-material/Public';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../src/features/auth/authSlice";
import { postTweet } from "../../src/features/tweetOperations/tweetOperationsSlice";
function LeftSection() {
    const [open, setOpen] = React.useState(false);

    const { logged } = useSelector(state => state.auth)
    const navigate = useNavigate()
    const handleClickOpen = () => {

        if (logged) {

            setOpen(true);
        }
        else {
            navigate("/auth")
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    const { user } = useSelector(state => state.auth)
    const [herkes, setHerkes] = React.useState("Herkes")



    const [anchorEla, setAnchorEla] = React.useState(null);
    const opena = Boolean(anchorEla);
    const handleClicka = (event) => {
        setAnchorEla(event.currentTarget);
    };
    const handleCloseHerkes = () => {
        setAnchorEla(null);
        setHerkes("Herkes")
    };
    const handleClosea = () => {
        setAnchorEla(null);
    };
    const handleCloseTakipci = () => {
        setAnchorEla(null);
        setHerkes("Takipçiler")
    };






    const dispatch = useDispatch();


    const [anchorEluser, setAnchorEluser] = React.useState(null);
    const openuser = Boolean(anchorEluser);
    const handleClickuser = (event) => {
        setAnchorEluser(event.currentTarget);
    };
    const handleCloseuser = () => {
        setAnchorEluser(null);
    };
    const handleCloseuserlogout = () => {
        dispatch(logout())
        navigate("/")
        setAnchorEluser(null);
    };




    const postTweeta = () => {

        dispatch(postTweet({ tweetContent, public: (herkes == "Herkes" ? true : false) })).then(() => {

            handleClose()
        })
    }


    const [tweetContent, setTweetContent] = React.useState(""); // Yazi girisinin içeriğini saklayacak state

    const handleTweetContentChange = (event) => {
        setTweetContent(event.target.value); // Her değişiklikte state'i güncelle
    };



    const { notificationAmount } = useSelector(state => state.user)


    return (
        <div className="pagecomponent1 col-3">
            <div className="d-flex flex-column justify-content-between h-100">
                <div className="d-flex flex-column leftbar">
                    <Link to={"/"} className="bbbbb"><HomeIcon style={{ fontSize: 36 }} /> Anasayfa</Link>

                    {logged ?
                        <div className="d-flex flex-column">
                            <Link to={"/notifications"} className="bbbbb d-flex"><NotificationsIcon style={{ fontSize: 36 }} />{notificationAmount > 0 ? <div className="w-100"><span>Bildirimler</span>    <span className=" fs-6 badge rounded-pill text-bg-info">{notificationAmount}</span></div> : <span>Bildirimler</span>}</Link>

                            <Link to={"/profile/" + user.username} className="bbbbb"><AccountBoxIcon style={{ fontSize: 36 }} /> Profil</Link>
                            <button onClick={handleClickOpen} className="tweetbutton w-75 p-2">Tweet</button>
                        </div>
                        :
                        <></>}



                </div>
                {logged ?

                    <div onClick={handleClickuser} className="leftbar d-flex mb-4 aaaa ">
                        <Avatar className="anannn"> {user?.name?.charAt(0)}</Avatar>
                        <div className="d-flex flex-column">
                            <div className="name">
                                {user?.name} {user?.lastname}
                            </div>
                            <div className="username">
                                @{user?.username}
                            </div>
                        </div>
                    </div>


                    :

                    <div onClick={() => navigate("/auth")} className="leftbar d-flex mb-4 aaaa ">
                        <div className="name border rounded-pill p-2 px-5">

                            Giriş Yap
                        </div>
                    </div>

                }
                <Menu
                    anchorEl={anchorEluser}
                    open={openuser}
                    onClose={handleCloseuser}
                    className="aaaaa"

                    anchorOrigin={{ horizontal: 50, vertical: -70 }}
                >
                    <MenuItem sx={{
                        border: "1px solid white", // Sınırlar
                        bgcolor: "black", // Arka plan rengi
                        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)", // Gölge
                        color: "white", // Yazı rengi
                    }} onClick={handleCloseuserlogout}>@{user?.username} Hesabından Çık</MenuItem>
                </Menu>



            </div>

            <Menu
                anchorEl={anchorEla}
                open={opena}
                onClose={handleClosea}
            >
                <MenuItem onClick={handleCloseHerkes}>Herkes</MenuItem>
                <MenuItem onClick={handleCloseTakipci}>Takipçiler</MenuItem>
            </Menu>
            <Dialog sx={{
                backgroundColor: "rgba(236, 236, 236, 0.4)", zIndex: "9999999"
            }} open={open} onClose={handleClose}>
                <div className="d-flex flex-column p-3 dialogg">
                    <div className="d-flex ustt">

                        <Avatar>{user?.name?.charAt(0)}</Avatar>
                        <div className="ustsag">
                            <div
                                onClick={handleClicka} className="cp changetarget d-flex justify-content-between">{herkes}<KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                            </div>
                            <textarea
                                value={tweetContent} // State'den gelen değeri görüntüle
                                onChange={handleTweetContentChange} className="texx" placeholder="Tweetinizi Girin"></textarea>

                        </div>
                    </div>
                    <p>
                        {herkes === "Herkes" ? (
                            <>
                                <PublicIcon /> Herkes Yanıt Verebilir
                            </>
                        ) : (
                            <>
                                <PeopleIcon /> Yalnızca Takipçilerin Yanıt Verebilir
                            </>
                        )}
                    </p>
                    <div className="d-flex justify-content-between altt">
                        <div>
                            <ImageIcon className="cp"></ImageIcon>
                            <PollIcon className="cp"></PollIcon>

                        </div>
                        <div>
                            <button onClick={postTweeta} className="publishbutton">Yayınla</button>
                        </div>
                    </div>

                </div>
            </Dialog>

        </div >
    );
}

export default LeftSection;