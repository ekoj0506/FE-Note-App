import React from "react";

import NoteAddIcon from '@mui/icons-material/NoteAdd';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { addFolder } from "../utils/folderUtils";
import { async } from "@firebase/util";
export default function AddNote()
{
return(
    <IconButton aria-label="delete" >
  <NoteAddIcon/>
</IconButton>

)
} ;