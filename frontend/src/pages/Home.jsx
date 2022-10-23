import React from "react";
import Header from "../components/Header";
import { Box, Drawer, Toolbar } from "@mui/material";
import DrawerContent from "../components/DrawerContent";
import { useAuth } from "../contexts/auth.context";

const Home = ( ) => {

    const auth = useAuth();

    return (
        <Box sx={{display: 'flex'}}>
            <Header />
            <Drawer variant="permanent" 
                    sx={{
                        width:400,
                        flexShrink: 0,
                        zIndex: (theme) => theme.zIndex.appBar - 1,
                        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
                    }}>
                <Toolbar />
                <DrawerContent />
            </Drawer>
            <h1>content</h1>
        </Box>
    )
}

export default Home;