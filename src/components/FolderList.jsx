import React, { useState } from "react";
import { Card, CardContent, List, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import AddFolder from"./AddFolder";










export default function FolderList(Folders)
{   
    const {folder}=Folders;
    const {folderId} =useParams();
    const [activeFolder, setActiveFolder] =useState(folderId);

    

    return(
        <>
        <List
        sx={{
            width: '100%',
            bgcolor: '#7D9D9C',
            height: '100%',
            padding: '10px',
            textAlign: 'left',
            overFlowy: 'auto'
        }}
        subheader={
            <Box sx={{display: 'flex', alignItems:'center',justifyContent:'space-between'}}
            >
                <Typography sx={{fontWeight:'bold', color:'white'}}>Folder</Typography>
                <AddFolder/>
            </Box>
            
        }
        >
          
            {folder.map(({id, name})=>{
                return(
                    <Link
                    key={id}
                    to={`folder/${id}`}
                    style={{textDecoration: 'none'}}
                    onClick={()=>{setActiveFolder(id)}}
                    >
                        <Card sx={{mb: '5px',  backgroundColor:id===activeFolder?'rgb(255 211 140)': null }}>
                            <CardContent sx={{'&:last-child:':{pb: '10px'},   padding: '10px'}}>
                                <Typography>{name}</Typography>
                            </CardContent>
                        </Card>
                                            </Link>
                )
            })}
        </List> 
        {/* <popupAddFolder open={popupAdd} closePopup={closePopupAddFolder}/> */}

        

        </>
    )
}