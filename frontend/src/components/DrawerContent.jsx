import React, { useEffect } from "react";
import { Box, List } from '@mui/material'
import { useAuth } from "../contexts/auth.context";
import { authRequest } from "../utils/request";
import { useState } from "react";
import ConversationItem from "./ConversationItem";

const DrawerContent = () => {

    const auth = useAuth();

    const [conversations, setConversations] = useState([]);

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


    return (
        <Box sx={{overflow: 'auto'}} >
            <h3 style={{textAlign: 'center'}} >Conversations</h3>

            <List>
                {conversations.map((conv, index) => (
                    <ConversationItem key={index} conversation={conv} currentUserId={auth.user._id} index={index} />
                ))}
            </List>

        </Box>
    )
}

export default DrawerContent;