import axiosClient from "../axiosClient"


export const GetBooks = ()=>{
    return axiosClient.get('/books');
}