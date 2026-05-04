import BreadCrumbs from "../../../../Shared/Components/BreadCrumbs/BreadCrumbs";
import { Box, Grid } from "@mui/material";

import book2 from '../../../../../assets/Images/book2.webp';
import book3 from '../../../../../assets/Images/book3.webp';
import book4 from '../../../../../assets/Images/book4.webp';
import book7 from '../../../../../assets/Images/book7.png';
import book8 from '../../../../../assets/Images/book8.jpg';
import book10 from '../../../../../assets/Images/book10.jpg';
import book11 from '../../../../../assets/Images/book11.jpg';
import book15 from '../../../../../assets/Images/book15.webp';
import BooksToolbar from "../../../BookModule/Components/BooksToolbar/BooksToolbar";
import BooksList from "../../../BookModule/Components/BooksList/BooksList";
import BooksPagination from "../../../BookModule/Components/BooksPagination/BooksPagination";
import { useBooks } from "../../../../../Hooks/useBooks";



export default function WhisList() {

  const FavBooks = [
    {id:2 , title:'the lost' , category:'Fantasy', author:'matt zhang' , price: 46.00, img: book2 , status:'in stock'},
    {id:3 , title:'The moon and the stars' , category:'Drama', author:'Jenna Warren' , price: 62.00, img: book3 , status:'in stock'},
    {id:4 , title:'the green solider' , category:'Drama', author:'J. Edward Gore' , price: 50.00, img: book4 , status:'in stock'},
    {id:7 , title:'your simple book cover' , category:'Fantasy', author:'ken adams' , price: 55.00, img: book7 , status:'out of stock'},
    {id:8 , title:'book name' , author:'author name' , category:'Children', price: 55.00, img: book8 , status:'in stock'},
    {id:10 , title:'all the light we cannot see' , category:'Drama', author:'Antony Doerr' , price: 55.00, img: book10 , status:'in stock'},
    {id:11 , title:'beyond the ocean door' , category:'Drama', author:'amisha sathi' , price: 55.00, img: book11 , status:'in stock'},

    {id:15 , title:'the story of a lonely boy' , category:'Drama', author:'korina' , price: 58.50, img: book15 , status:'in stock'}, 
  ]

    const books = useBooks(FavBooks , "favoritesBooksSettings");

  return (
    <>
      <Box>
        <BreadCrumbs/>
      </Box>
      <Box p={3}>
        <Grid container spacing={4}>
          <Grid size={{xs:12 , md:10}} mx='auto'>
            <BooksToolbar {...books} />
            <BooksList {...books} />
            <BooksPagination {...books} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
