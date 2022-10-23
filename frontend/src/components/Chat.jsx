import React, { useEffect } from "react";
import { useState } from "react";
import { authRequest } from "../utils/request";
import BottomChat from "./BottomChat";
import { Grid, Stack } from '@mui/material'

const Chat = ({conversation, friend}) => {
    
    const [messages, setMessages] = useState([]);

    // récupérer les messages
    useEffect(() => {
        if(conversation){
            authRequest({
                url: `/messages/${conversation._id}`,
                method: "GET"
            })
            .then(res => res.json())
            .then( result => {
                console.log(result);
                if(result.messages){
                    console.log(result.messages[0].content)
                    setMessages(result.messages)
                }
            })
        }
    }, [conversation])


    if(!conversation || !friend){
        return <p className="no-chat-selected" >Pas de chat sélectionné</p>
    }

    return(
        <Grid container className="chat-container">
            <Grid item xs={12} className="messages-container" >
                {messages.map( (message, index) => (
                    <div key={index}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </Grid>
            <Grid item xs={12} className="bottom-container">
                <BottomChat />
            </Grid>
        </Grid>
    )
}

export default Chat;