/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "../axiosClient"


export const GetBooks = ()=>{
    return axiosClient.get('/books');
}

export const GetBookById = (id:any)=>{
    return axiosClient.get(`/books/${id}`);
}

export const GetBooksByCategory = (category:string)=>{
    return axiosClient.get(`/books/category/${category}`);
}