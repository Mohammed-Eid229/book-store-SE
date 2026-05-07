import axiosClient from "../axiosClient"


export const GetFavourites = (id:number)=>{
    return axiosClient.get(`/favourites/user/${id}`);
}