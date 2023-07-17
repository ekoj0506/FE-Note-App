import { element } from "prop-types";
import { createBrowserRouter,Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ErrolPage from "../pages/ErrolPage";
import AuthProvider from "../context/AuthProvider";
import NoteList from "../components/NoteList";
import ProtectedRouter from "./protectedRouter";
import path from "path";
import Note from "../components/Note";
import { async } from "@firebase/util";
import { notesLoader} from "../utils/notesUtils";
import { folderLoader } from "../utils/folderUtils";
import { addNewNote, noteLoader, saveNote } from "../utils/noteUtils";
import { useSubmit } from "react-router-dom";
const AuthLayout = () => {
   return( <AuthProvider>  <Outlet/> </AuthProvider>)
}


export default createBrowserRouter(
    [   
        {
        element:<AuthLayout/>,
        errorElement: <ErrolPage/>,
        children: [
       
            {
                element: <Login/>,
                 path: '/login',
        },
        
        {element: <ProtectedRouter/>,
        children: 
        [
     {
    
        element: <Home/>,
         path: '/',
         loader: folderLoader,
        
         children:
         [
            {element: <NoteList/>,
        path: `/folder/:folderId`,
        action: addNewNote,
        loader: notesLoader
        , 
         children:
         [
            {
                
            element: <Note/>,
           
            path: `note/:noteId`,
            loader: noteLoader,
            action: saveNote,
            
  
         },
         ]
          },
         ]
     
    },
]},   
            
        
    ],
},
    ]
)