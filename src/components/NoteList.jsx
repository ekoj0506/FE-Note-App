import { Card, CardContent, Grid, List, Typography } from "@mui/material";
import { Box, padding } from "@mui/system";
import React, { useState } from "react";
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import IconButton from '@mui/material/IconButton';
import { Link, Outlet, useLoaderData, useParams, useSubmit } from "react-router-dom";
import AddNote from "./AddNote";


export default function NoteList(children)
{   
    const {noteId, folderId} =useParams();
     
    const [activeNoteId, setActiveNoteId] =useState(noteId);
    const {data:{folder}} =useLoaderData();

   const submit=useSubmit();
    const handleAddNewNote=()=>
    {  
        console.log('asdsd');
      submit({content: "",folderId: folderId},{method:'post', action: `/folder/${folderId}`});
    };
    return(
        <Grid container height='100%'>
        <Grid item xs={4} sx={{width:'100%', maxWidth: 360, bgcolor: '#F0EBEW3', overflowy: 'auto', padding: '10px', textAlign: 'left'}}>
            <List
            subheader={<Box sx={{display: 'flex', alignItems:'center',justifyContent:'space-between'}}>
                <Typography sx={{fontWeight:'Bold'}}>Notes</Typography>
                <IconButton aria-label="delete" onClick={handleAddNewNote}>
  <NoteAddIcon/>
</IconButton>
              
            </Box>}
            >
                {
                            folder.notes.map((note)=>{
                                return(
                              
                <Link 
                style={{textDecoration:'none'}} 
                key={note.id}
                onClick={()=>{setActiveNoteId(note.id)}}
                to={`note/${note.id}`}
               
                >
                    <Card sx={{mb:'5px',  backgroundColor:note.id===activeNoteId?'rgb(255 211 140)': null }}>
                        <CardContent sx={{'&:last-child': {pb:'10px'}, padding:'10px'}}>
                           <div style={{fontSize: 14, fontWeight: 'bold'}} 
                           dangerouslySetInnerHTML={{__html: `${note.content.substring(0,30)||'empty' }`,}}/>
                       
                        </CardContent>
                    </Card>
                </Link>
            )})}
            </List>
        </Grid>
        <Grid item xs={8}>
            <Outlet/>
        </Grid>
        </Grid>
    )
}