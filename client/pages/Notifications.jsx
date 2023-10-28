/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import NotifMiddle from "../components/middlesection/NotifMiddle";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications, setSeenAllNotifs } from "../src/features/user/userSlice";
import Notification from "../components/notifications/Notification";
import { getUserInfo } from "../src/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Notifications() {

    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("token")) {
            dispatch(getUserInfo()).then((a) => {
                if (a.payload.success == false) {
                    navigate("/auth")
                }else {

                    dispatch(getNotifications())
                }
            })

        } else {
            navigate("/auth")

        }

    }, [])
    const dispatch = useDispatch();

    const { notifications, notificationAmount } = useSelector(state => state.user)
    useEffect(() => {

        return () => {
            dispatch(setSeenAllNotifs())
        }
    }, [])

    return (
        <div className="col-6 ccc">
            <NotifMiddle></NotifMiddle>
            {notificationAmount > 0 ?
                notifications.map((element) => {
                    return (

                        <Notification key={element._id} notification={element}></Notification>
                    )
                })

                :
                <div className="notification">Görülmemiş Bildirimin Yok</div>

            }

            { }


        </div>);
}

export default Notifications;