import React from 'react';
import { Toolbar, AppBar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from "@mui/icons-material"
import { useAuth } from '../contexts/auth.context';
import {useNavigate} from "react-router-dom"

const Header = () => {

    const auth = useAuth();
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);

    
  
    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = () => {
        auth.logout().then(() => {
            navigate('/login');
        })
    };

    return(
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Application de chat
                </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Deconnexion</MenuItem>
                        </Menu>
                    </div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;