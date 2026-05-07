import { useParams } from 'react-router-dom';
import Book from '../Book/Book';
import NotFound from '../../../../Shared/Components/NotFound/NotFound';
import { Box, Container } from '@mui/material';
import { BooksAPI } from '../../../../../Api';
import { useEffect, useState } from 'react';

export default function BookDetails() {
    const { bookId } = useParams();
    const [book , setBook] = useState(null);

    useEffect(()=>{
      const getBook = async()=>{
        try {
          const response = await BooksAPI.GetBookById(bookId);
          setBook(response?.data);
        } catch (error) {
          console.log(error)
        }
      }
      getBook()
    }, [bookId])
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
