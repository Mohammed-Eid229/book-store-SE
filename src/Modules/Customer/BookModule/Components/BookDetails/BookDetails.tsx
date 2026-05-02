
import book1 from '../../../../../assets/Images/book1.jpg';
import book2 from '../../../../../assets/Images/book2.webp';
import book3 from '../../../../../assets/Images/book3.webp';
import book4 from '../../../../../assets/Images/book4.webp';
import book5 from '../../../../../assets/Images/book5.png';
import book6 from '../../../../../assets/Images/book6.png';
import book7 from '../../../../../assets/Images/book7.png';
import book8 from '../../../../../assets/Images/book8.jpg';
import book9 from '../../../../../assets/Images/book9.webp';
import book10 from '../../../../../assets/Images/book10.jpg';
import book11 from '../../../../../assets/Images/book11.jpg';
import book12 from '../../../../../assets/Images/book12.webp';
import book13 from '../../../../../assets/Images/book13.jpg';
import book14 from '../../../../../assets/Images/book14.webp';
import book15 from '../../../../../assets/Images/book15.webp';
import { useParams } from 'react-router-dom';
import Book from '../Book/Book';
import NotFound from '../../../../Shared/Components/NotFound/NotFound';
import { Box, Container } from '@mui/material';

const allBooks = [
    {id:1 , title:'the design of books' , category:'Drama', author:'debbie berne' , price: 38.00, img: book1 , status:'in stock'},
    {id:2 , title:'the lost' , category:'Fantasy', author:'matt zhang' , price: 46.00, img: book2 , status:'in stock'},
    {id:3 , title:'The moon and the stars' , category:'Drama', author:'Jenna Warren' , price: 62.00, img: book3 , status:'in stock'},
    {id:4 , title:'the green solider' , category:'Drama', author:'J. Edward Gore' , price: 50.00, img: book4 , status:'in stock'},
    {id:5 , title:'the hypocrite world' , category:'Drama', author:'sophia hill' , price: 35.00, img: book5 , status:'out of stock'},
    {id:6 , title:'my book cover' , category:'Drama', author:'author' , price: 41.00, img: book6 , status:'in stock'},
    {id:7 , title:'your simple book cover' , category:'Fantasy', author:'ken adams' , price: 55.00, img: book7 , status:'out of stock'},
    {id:8 , title:'book name' , author:'author name' , category:'Children', price: 55.00, img: book8 , status:'in stock'},
    {id:9 , title:'harry potter and the champer of secrets' ,category:'Fantasy', author:'J.K.Rowling' , price: 70.00, img: book9 , status:'in stock'},
    {id:10 , title:'all the light we cannot see' , category:'Drama', author:'Antony Doerr' , price: 55.00, img: book10 , status:'in stock'},
    {id:11 , title:'beyond the ocean door' , category:'Drama', author:'amisha sathi' , price: 55.00, img: book11 , status:'in stock'},
    {id:12 , title:'really good actually' , category:'Drama', author:'monica heisey' , price: 75.00, img: book12 , status:'out of stock'},
    {id:13 , title:'lady bird' , category:'Children', author:'author name' , price: 40.00, img: book13 , status:'in stock'},
    {id:14 , title:'dark becomes her' , category:'Fantasy', author:'author name' , price: 67.00, img: book14 , status:'in stock'},
    {id:15 , title:'the story of a lonely boy' , category:'Drama', author:'korina' , price: 58.50, img: book15 , status:'in stock'}, 
  ]

export default function BookDetails() {
    const { bookId } = useParams();

    const book = allBooks.find(
    (b) => b.id === Number(bookId)
  );

  if(!book) return <NotFound/>

  return (
    <>
      <Box py={3}>
        <Container>
            <Book book={book} mode="details"/>
        </Container>
      </Box>
    </>
  )
}
