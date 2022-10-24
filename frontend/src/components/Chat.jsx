import React, { useEffect } from "react";
import { useState } from "react";
import { authRequest } from "../utils/request";
import BottomChat from "./BottomChat";
import { Grid } from '@mui/material'
import Message from "./Message";

const Chat = ({conversation, friend}) => {
    
    const [messages, setMessages] = useState([]);

    const updateMessages = (message) => {
        setMessages([...messages, message])
    }

    // récupérer les messages
    useEffect(() => {
        if(conversation){
            authRequest({
                url: `/messages/${conversation._id}`,
                method: "GET"
            })
            .then(res => res.json())
            .then( result => {

                if(result){
                    setMessages(result)
                    console.log(messages)
                }else{
                    setMessages([])
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
                    
                    <Message key={index} message={message} own={message.author !== friend._id} />
                ))}
            </Grid>
            <Grid item xs={12} className="bottom-container">
                <BottomChat conversationId={conversation._id} updateMessages={updateMessages} />
            </Grid>
        </Grid>
    )
}

export default Chat;