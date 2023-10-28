/* eslint-disable react/prop-types */
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

import "./notification.css"
function Notification({ notification }) {

    const date = new Date(notification.notificationdate)
    return (
        <div className='notification'>

            {notification.content.includes("Yorum") ?
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <CommentIcon sx={{ color: "#1D9BF0" }}></CommentIcon>
                        <div className='notifcontent'>

                        {notification.content}
                        </div>

                    </div>
                    <div className="d-flex justify-content-end solgun">
                        <div style={{ paddingLeft: "0.5rem" }}>
                            {date.getHours().toString().padStart(2, '0')}:
                            {date.getMinutes().toString().padStart(2, '0')}
                        </div>
                        <div style={{ paddingLeft: "0.5rem" }}>
                            {date.getDate().toString().padStart(2, '0')}/
                            {(date.getMonth() + 1).toString().padStart(2, '0')}/
                            {date.getFullYear()}

                        </div>

                    </div>

                </div>
                :
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <ThumbUpIcon sx={{ color: "#F91880" }}></ThumbUpIcon>
                        <div className='notifcontent'>
                            {notification.content}
                        </div>

                    </div>
                    <div className="d-flex justify-content-end solgun">
                        <div style={{ paddingLeft: "0.5rem" }}>
                            {date.getHours().toString().padStart(2, '0')}:
                            {date.getMinutes().toString().padStart(2, '0')}
                        </div>
                        <div style={{ paddingLeft: "0.5rem" }}>
                            {date.getDate().toString().padStart(2, '0')}/
                            {(date.getMonth() + 1).toString().padStart(2, '0')}/
                            {date.getFullYear()}

                        </div>

                    </div>

                </div>

            }
        </div>
    );
}

export default Notification;