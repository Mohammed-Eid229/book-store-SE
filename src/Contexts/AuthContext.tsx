/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/set-state-in-effect */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";


interface User{
    id: string;
    userId?: string;
    sub: string; 
    name?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role: string;
    phoneNumber?: string;
    image?: string;
}

interface AuthContextInterface{
    userData: User | null;
    saveUserData: ()=> void
}

interface AuthContextProviderProps{
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | null>(null)

export default function AuthContextProvider({children}:AuthContextProviderProps){
    const [userData , setUserData] = useState<User|null>(null)

    const saveUserData = ()=>{
        const encodedToken = localStorage.getItem('userToken')
        if(encodedToken){
            const decodedToken = jwtDecode<User>(encodedToken)
            setUserData(decodedToken)
        }
    }

    //refresh
    useEffect(()=>{
        if(localStorage.getItem('userToken')){
            saveUserData()
        }
    },[])

    return(
        <AuthContext.Provider value={{userData , saveUserData}}>{children}</AuthContext.Provider>
    )
}