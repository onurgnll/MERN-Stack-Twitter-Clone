/* eslint-disable react/prop-types */
import { Avatar } from "@mui/material";
import "./YaziAlani.css"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import { useDispatch, useSelector } from "react-redux";
import { postTweet } from "../../src/features/tweetOperations/tweetOperationsSlice";





function YaziAlani() {
    // { setSharedTweet , sharedTweet}
    
  const {loading } = useSelector((state) => state.tweetOperations)
  const dispatch = useDispatch();


    const [herkes, setHerkes] = React.useState("Herkes")
    // const [loading, setLoading] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseHerkes = () => {
        setAnchorEl(null);
        setHerkes("Herkes")
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseTakipci = () => {
        setAnchorEl(null);
        setHerkes("Takipçiler")
    };


    const [tweetContent, setTweetContent] = React.useState(""); // Yazi girisinin içeriğini saklayacak state

    const handleTweetContentChange = (event) => {
        setTweetContent(event.target.value); // Her değişiklikte state'i güncelle
    };


    const postTweeta = () => {
        dispatch(postTweet({tweetContent,public: (herkes == "Herkes" ? true : false)}))
    }



    const {user} = useSelector(state => state.auth)


    return (
        <div className="type">
            <div className="d-flex h-100">
                <Avatar>{user.name[0].toUpperCase()}</Avatar>

                <div className="d-flex flex-column justify-content-between abc w-100">
                    <div
                        aria-controls={open ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} className="cp changetarget d-flex justify-content-between">{herkes}<KeyboardArrowDownIcon></KeyboardArrowDownIcon>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleCloseHerkes}>Herkes</MenuItem>
                        <MenuItem onClick={handleCloseTakipci}>Takipçiler</MenuItem>
                    </Menu>
                    <div>
                        <textarea
                            rows={4}
                            className="textareeaa"
                            placeholder="Tweetinizi Girin"
                            type="text"
                            value={tweetContent} // State'den gelen değeri görüntüle
                            onChange={handleTweetContentChange} // Değişiklik olduğunda handleTweetContentChange fonksiyonunu çağır
                        />




                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <p className="m-0">
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

                            </div>
                            <div>
                                <button onClick={postTweeta} disabled={loading} className="publishbutton">{loading ? <div className="spinner-border"></div> : "Paylaş"}{/* Loading durumuna göre düğme metnini değiştirme */}</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default YaziAlani;