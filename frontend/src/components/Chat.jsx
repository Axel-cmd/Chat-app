import React, { useEffect } from "react";
import { useState } from "react";
import { authRequest } from "../utils/request";
import BottomChat from "./BottomChat";
import { Grid } from '@mui/material'
import Message from "./Message";
import io from 'socket.io-client';
import { useRef } from "react";
import { useAuth } from "../contexts/auth.context";

const Chat = ({conversation, friend}) => {
    
    const auth = useAuth();
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    
    const scrollRef = useRef();
    const socket = useRef();

    const updateMessages = (message) => {
        setMessages([...messages, message])
    }

    const sendMessageOnSocket = (newMessage) => {
        console.log("send socket")
        socket.current.emit("sendMessage", {
            senderId: auth.user._id,
            receiverId: friend._id,
            text: newMessage
        })
    }

    useEffect(() => {
        socket.current = io("ws://localhost:4200");

        socket.current.on("getMessage", data => {
            console.log('receive')
            setArrivalMessage({
                author: data.senderId,
                content: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        socket.current.emit("addUser", auth.user._id);

    }, [auth])


    useEffect(() => {
        if(arrivalMessage && friend._id === arrivalMessage.author) {
            setMessages((prev) => [...prev, arrivalMessage])
        }
    }, [arrivalMessage, friend])

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
                    // console.log(messages)
                }else{
                    setMessages([])
                }
            })
        }
    }, [conversation])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior : 'smooth'})
    }, [messages])

    if(!conversation || !friend){
        return <p className="no-chat-selected" >Pas de chat sélectionné</p>
    }

    return(
        <Grid container className="chat-container">
            <Grid item xs={12} className="messages-container" >
                {messages.map( (message, index) => (
                    <div ref={scrollRef}>
                        <Message key={index} message={message} own={message.author !== friend._id} />
                    </div>
                ))}
            </Grid>
            <Grid item xs={12} className="bottom-container">
                <BottomChat conversationId={conversation._id} updateMessages={updateMessages} sendMessageOnSocket={sendMessageOnSocket} />
            </Grid>
        </Grid>
    )
}

export default Chat;