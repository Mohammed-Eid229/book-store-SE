import axiosClient from "../axiosClient"


export const GetCategories = ()=>{
    return axiosClient.get('/categories');
}