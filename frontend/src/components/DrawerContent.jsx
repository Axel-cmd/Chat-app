import React, { useEffect } from "react";
import { Box, List } from '@mui/material'
import { useAuth } from "../contexts/auth.context";
import { authRequest } from "../utils/request";
import { useState } from "react";
import ConversationItem from "./ConversationItem";
import AddUserItem from "./AddUserItem";

const DrawerContent = ({ handleChangeChat }) => {

    const auth = useAuth();

    const [conversations, setConversations] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);

    const addNewConversation = (conversation) => {
        setConversations((prev) => [...prev, conversation]);
    }

    useEffect(() => {

        authRequest({
            url: '/conversations',
            method: 'GET',
        })
        .then(res => res.json())
        .then(result => {
            setConversations(result);
        })

    }, [])

    useEffect(() => {
        authRequest({
            method: 'GET',
            url: '/users'
        })
        .then(res => res.json())
        .then(result => {
            const others = result.filter( r => !conversations.some( conv => conv.members.includes(r._id)) && r._id !== auth.user._id
                // !auth.user.friends.includes(r._id) && r._id !== auth.user._id
            
            )
            setOtherUsers(others)
            // console.log(others)
        })
    }, [auth, conversations])

    return (
        <Box sx={{overflow: 'auto'}} >
            <h3 style={{textAlign: 'center'}} >Conversations</h3>

            <List>
                {conversations.map((conv, index) => (
                    <ConversationItem key={index} conversation={conv} currentUserId={auth.user._id} index={index} handleChangeChat={handleChangeChat} />
                ))}
            </List>

            <h3 style={{textAlign: 'center'}} >Other users</h3>
            <List>
                {otherUsers.map((otherUser, index) => (
                    <AddUserItem key={index} index={index} user={otherUser} addNewConversation={addNewConversation} />
                ))}
            </List>

        </Box>
    )
}

export default DrawerContent;