/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../axiosClient"


export const Login = (data:any)=>{
    return axiosClient.post('/users/login',data);
}