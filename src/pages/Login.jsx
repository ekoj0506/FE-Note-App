import React, { useContext } from "react";
import {Typography,Button} from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from "@firebase/auth";
import { async } from "@firebase/util";
import { AuthContext } from "../context/AuthProvider";

import { graphQLrequest } from "../utils/request";
import { Navigate} from "react-router-dom";

export default function Login()
{  
    const {user}=useContext(AuthContext);
    const auth =getAuth();

    const handleLoginWithGoogle=async()=>{
        const provider =new GoogleAuthProvider();
        const {user:{uid, displayName}} = await signInWithPopup(auth, provider);


     const {data}=   await graphQLrequest({query: `mutation Register($uid: String!, $name: String!)
        { register(uid: $uid, name: $name) {
          uid
          name
          
        }
    }`, variables:{uid: uid, name: displayName}});
  console.log('data',{data});
          
       
        
    };
    if (localStorage.getItem('accessToken')){ 
        
           console.log('to home');
        return(<Navigate to='/'/>);

      
    
         }
    
    return(
    <>

    <Typography variant="h5" sx={{marginBottom: '10px'}}>Note ND</Typography>
    <Button variant='outlined' onClick={handleLoginWithGoogle}>
            Login with Google
    </Button>
    </>
    )
}