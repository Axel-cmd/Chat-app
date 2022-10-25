import React from "react"
import { ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";
import { Add, AccountCircle } from '@mui/icons-material'
import { authRequest } from "../utils/request";
import { useAuth } from "../contexts/auth.context";

const AddUserItem = ({user, addNewConversation, index}) => {

    const auth = useAuth();

    const handleAddUser = () => {
        authRequest({
            method: 'POST',
            url: '/conversations',
            body: {
                members: [
                    user._id,
                    auth.user._id
                ]
            }
        })
        .then(res => res.json())
        .then(result => {
            addNewConversation(result)
            console.log(result)
        })
    }

    return(
        <ListItem key={index} disablePadding secondaryAction={
            <IconButton edge="end" aria-label="add" onClick={handleAddUser} >
              <Add />
            </IconButton>
          }  >
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircle/>
                </ListItemIcon>
                <ListItemText primary={user.username} style={{width: "50%"}} />
            </ListItemButton>
        </ListItem>
    )
}

export default AddUserItem;