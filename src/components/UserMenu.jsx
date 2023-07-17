import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";




export default function UserMenu()
{   

    const {user}=useContext(AuthContext);
    const [anchorEl, setAnchorEl] =useState(null);
const open=Boolean(anchorEl);
const handleClose =()=>
{
    setAnchorEl(null);   
};
const handleClick =(e)=>
{
    setAnchorEl(e.currentTarget);
    

};
const handleLogout=()=>
{ 
  user.auth.signOut();  
}
    
    console.log(user);
    return (
        <>
        <Box sx={{display: 'flex'}} onClick={handleClick}>
        <Typography >{user?.displayName}</Typography>
        <Avatar alt="avt" src={user?.photoURL} sx={{width: '24ps', height:'24px', marginLeft:'5px'}}/>
        </Box>
        <Menu  id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        >
            <MenuItem onClick={handleLogout}>
            Logout
            </MenuItem>
        </Menu>
        </>
    )
}