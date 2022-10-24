import React, {useState} from "react";
import Header from "../components/Header";
import { Box, Drawer, Toolbar } from "@mui/material";
import DrawerContent from "../components/DrawerContent";
import { useAuth } from "../contexts/auth.context";
import Chat from "../components/Chat";

const Home = ( ) => {

    const auth = useAuth();

    const [currentFriend, setCurrentFriend] = useState();
    const [currentConversation, setCurrentConversation] = useState();

    const handleChangeChat = ({conversation, friend}) => {
        // console.log("handleChagn")
        setCurrentConversation(conversation);
        setCurrentFriend(friend)
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Header />
            <Drawer variant="permanent" 
                    sx={{
                        width:300,
                        flexShrink: 0,
                        zIndex: (theme) => theme.zIndex.appBar - 1,
                        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
                    }}>
                <Toolbar />
                <DrawerContent handleChangeChat={handleChangeChat} />
            </Drawer>
            <Box component="main" className="main-content-container" >
                <Toolbar />
                <Chat conversation={currentConversation} friend={currentFriend} />
            </Box>
        </Box>
    )
}

export default Home;