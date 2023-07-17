import React, { useEffect, useState, createContext } from "react";
import {getAuth} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const AuthContext =createContext();
export default function AuthProvider({children})
{
    const [user, setUser] =useState({});
    const auth =getAuth();
    const naviga=useNavigate();
    const [isLoading, setIsLoading]=useState(true);
    useEffect (
        ()=>{
          const unsubcribe = auth.onIdTokenChanged((user)=>{
            console.log(user);
       
            if (user?.uid)
            {
                setUser(user);
                if (user.accessToken!==localStorage.getItem('accessToken'))
                {
                    localStorage.setItem('accessToken', user.accessToken);
                   window.location.reload();
                };
              
                setIsLoading(false);
                return;
            }
             console.log('reset');
            setUser({});
            localStorage.clear();
            setIsLoading(false);
            naviga('/login');
          })
        return ()=>{
            unsubcribe();

        }
        },[auth]
    )
return(

    <AuthContext.Provider value={{user, setUser}}>
        {isLoading? <CircularProgress/>:  children}
    </AuthContext.Provider>
)

}