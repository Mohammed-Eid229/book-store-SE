/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(props:any) {
  const {userData}:any = useContext(AuthContext)

  if(localStorage.getItem('userToken') || userData){
    return props.children       //dashboard
  }else{
    return <Navigate to={'/'}/> //login
  }
}
