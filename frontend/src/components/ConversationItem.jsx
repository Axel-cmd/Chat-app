import { useState } from "react";
import { useEffect } from "react";
import { authRequest } from "../utils/request";
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AccountCircle } from '@mui/icons-material'

const ConversationItem = ({ conversation, currentUserId, index, handleChangeChat }) => {


    const [friend, setFriend] = useState()


    const handleClickItem = () => {
        handleChangeChat({
            conversation,
            friend
        })
    }

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
                setFriend(result[0])
                console.log(result)
            })

        }
    }, [conversation, currentUserId])

    return(
        <ListItem key={index} disablePadding onClick={handleClickItem}>
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircle/>
                </ListItemIcon>
                <ListItemText primary={friend ? friend.username : ""} />
            </ListItemButton>
        </ListItem>
    )
}

export default ConversationItem;