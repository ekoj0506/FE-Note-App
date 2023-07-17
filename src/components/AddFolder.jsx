import React, { useEffect } from "react";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
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
import { useSearchParams, useNavigate } from "react-router-dom";





export default function AddFolder() {

    const [searchParam, setSearchParam]=useSearchParams();
    const [popupAdd, setPopupAdd] = useState(false);
    const [newFolderName, setNewFolderName]=useState('');
    const popupName=searchParam.get('popup');
    const openPopupAddFolder = () => {
        setSearchParam({popup:'add-Folder'})
    };
    const navigate=useNavigate();
    const closePopupAddFolder = () => {
       navigate(-1);
    };
    const handleNewFolderName=(e)=>{

       setNewFolderName(e.target.value);
       
    };
    const handleAddNewFolder=async()=>{
        const {addNewFolder} =await addFolder({name: newFolderName});
   
        closePopupAddFolder();

    };
  useEffect(()=>{
   if (popupName==='add-Folder'){
   setPopupAdd(true);
   return;}
   setPopupAdd(false);
  },[popupName]);
   
    return (
        <>

            <IconButton aria-label="delete" onClick={openPopupAddFolder}>
                <CreateNewFolderIcon />
            </IconButton>



            <Dialog open={popupAdd} onClose={closePopupAddFolder}
            maxWidth={"sm"} 
            fullWidth={true}>
                <DialogTitle>Add new folder</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Enter folder name"
                        type="email"
                        fullWidth
                        variant="standard"
                        autoComplete="off"
                        value={newFolderName}
                        onChange={handleNewFolderName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closePopupAddFolder}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )

};
