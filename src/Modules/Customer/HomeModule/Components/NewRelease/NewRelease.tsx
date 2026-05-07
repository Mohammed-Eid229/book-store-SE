import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import '../../../../../../node_modules/swiper/swiper-bundle.css';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import BookCard from "../../../BookModule/Components/BooksCard/BooksCard";
import { useFetch } from "../../../../../Hooks/useFetch";
import { BooksAPI } from "../../../../../Api";

interface Book {
  id: number;
  title: string;
  category: string;
  author: string;
  price: number;
  image: string;
  status: string;
}

// import book1 from '../../../../../assets/Images/book1.jpg';
// import book2 from '../../../../../assets/Images/book2.webp';
// import book3 from '../../../../../assets/Images/book3.webp';
// import book4 from '../../../../../assets/Images/book4.webp';
// import book5 from '../../../../../assets/Images/book5.png';
// import book6 from '../../../../../assets/Images/book6.png';
// import book7 from '../../../../../assets/Images/book7.png';
// import book8 from '../../../../../assets/Images/book8.jpg';
// import book9 from '../../../../../assets/Images/book9.webp';
// import book10 from '../../../../../assets/Images/book10.jpg';


// const books = [
//     {id:1 , title:'the design of books' , category:'Drama', author:'debbie berne' , price: 38.00, img: book1 , status:'in stock'},
//     {id:2 , title:'the lost' , category:'Fantasy', author:'matt zhang' , price: 46.00, img: book2 , status:'in stock'},
//     {id:3 , title:'The moon and the stars' , category:'Drama', author:'Jenna Warren' , price: 62.00, img: book3 , status:'in stock'},
//     {id:4 , title:'the green solider' , category:'Drama', author:'J. Edward Gore' , price: 50.00, img: book4 , status:'in stock'},
//     {id:5 , title:'the hypocrite world' , category:'Drama', author:'sophia hill' , price: 35.00, img: book5 , status:'out of stock'},
//     {id:6 , title:'my book cover' , category:'Drama', author:'author' , price: 41.00, img: book6 , status:'in stock'},
//     {id:7 , title:'your simple book cover' , category:'Fantasy', author:'ken adams' , price: 55.00, img: book7 , status:'out of stock'},
//     {id:8 , title:'book name' , author:'author name' , category:'Children', price: 55.00, img: book8 , status:'in stock'},
//     {id:9 , title:'harry potter and the champer of secrets' ,category:'Fantasy', author:'J.K.Rowling' , price: 70.00, img: book9 , status:'in stock'},
//     {id:10 , title:'all the light we cannot see' , category:'Drama', author:'Antony Doerr' , price: 55.00, img: book10 , status:'in stock'},
    
// ]


export default function NewRelease() {
    const navigate = useNavigate();
    const { data: books, loading } = useFetch<Book[]>(
          () => BooksAPI.GetBooks()
        );
  return (
    <>
      <Box sx={{ backgroundColor: "#FCECEC", overflowX: "hidden" }}>
            <Stack py={8} textAlign="center">
            <Typography variant="overline" color="#7A7A7A">
                some quality items
            </Typography>

            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
                <Box flex={1} height="1px" bgcolor="#E0E0E0" />
                <Typography variant="h3" fontWeight="bold" color="#393280" textTransform='capitalize'>
                new release books
                </Typography>
                <Box flex={1} height="1px" bgcolor="#E0E0E0" />
            </Box>
            </Stack>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress size="3rem" aria-label="Loading…" />
                </Box>
            ) : (
                <Swiper
                slidesPerView= {1}
                spaceBetween={20}
                breakpoints={{
                    600: { slidesPerView: 2 },
                    900: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                }}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
                >
                {books?.map((book) => (
                    <SwiperSlide key={book.id}>
                        <BookCard book={book} view={'grid'} />
                    </SwiperSlide>
                ))}
                    <Box flex={1} height="1px" bgcolor="#E0E0E0" mt={4} mb={6}/>
                </Swiper>
            )}
            <Box p={1} display='flex' justifyContent='flex-end'>
                    <Button 
                        endIcon={<ArrowForwardIcon />} 
                        sx={{color:"#ED553B",fontWeight:'bold'}}
                        onClick={()=>navigate('/dashboard/books')}
                    >
                        View All Products
                    </Button>
            </Box>
        </Box>
    </>
  );
}
