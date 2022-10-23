import React from "react";
import { format } from "timeago.js";
import { AccountCircle } from "@mui/icons-material"
import  { IconButton } from "@mui/material";

const Message = ({message, own}) => {

    return(
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {/* <img
                className="messageImg"
                src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                /> */}
                <IconButton
                        className="messageImg"
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="default"
                        sx={{
                            width: '32px',
                            height: '32px'
                        }}      
                    >
                        <AccountCircle />
                    </IconButton>
                
                <p className="messageContent" >
                    {message.content}
                </p>
                
            </div>
            <div className="messageTimeAgo">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message;