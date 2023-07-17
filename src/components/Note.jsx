import React, { useEffect, useMemo, useState } from "react";
import {ContentState, EditorState, convertFromHTML, convertFromRaw, convertToRaw} from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import DraftToHTML from 'draftjs-to-html';
import { useLoaderData } from "react-router";
import { debounce } from "@mui/material";
import { useLocation } from "react-router";
import { useSubmit } from "react-router-dom";
export default function Note() {

     const {data:{note} }= useLoaderData();
    
     console.log('daaaaaaaaaaaaaaa', note);
    const [editorState, setEditorState] =useState(()=>{
        return EditorState.createEmpty();
    });
    const [rawHTML, setRawHTML]=useState(note.content);
    useEffect(
        ()=>{setRawHTML(note.content)
        },[note.content]
    )
    useEffect(()=>{
        const blocksFromHTML=convertFromHTML(note.content);
        const state=ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
        

    },[note.id]);
    const submit=useSubmit();
    const location=useLocation();
    const deboun= useMemo(
        ()=>{
            return debounce((rawHTML, note, location)=>{
                if (rawHTML===note.content) return;
            
                    
                  submit({...note, content: rawHTML},{method:'post', action: location.pathname });
   
            },1000)
        },[]
    );
    useEffect(()=>{
        deboun(rawHTML, note, location)
    },[rawHTML, location.pathname]);

    const handleOnChange=(e)=>{
        
        setEditorState(e);
        setRawHTML(DraftToHTML(convertToRaw(e.getCurrentContent())));
        console.log(e);
    };
    return(
    <Editor
    editorState={editorState}
    placeholder="write something"
    onEditorStateChange={handleOnChange}
    
    />
    )
}