import { useState } from "react";
import { useEffect } from "react";
import { authRequest } from "../utils/request";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle } from '@mui/icons-material'

const ConversationItem = ({ conversation, currentUserId, index }) => {


    const [user, setUser] = useState()

    useEffect(() => {
        
        // console.log(conversation)
        const friendId = conversation.members.find( m => m !== currentUserId)
        console.log(currentUserId)

        if(friendId) {
            authRequest({
                url: `/users/${friendId}`,
                method: 'GET'
            })
            .then(res => res.json())
            .then(result => {
                setUser(result[0])
                console.log(result)
            })

        }
    }, [conversation, currentUserId])

    return(
        <ListItem key={index} disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircle/>
                </ListItemIcon>
                <ListItemText primary={user ? user.username : ""} />
            </ListItemButton>
        </ListItem>
    )
}

export default ConversationItem;