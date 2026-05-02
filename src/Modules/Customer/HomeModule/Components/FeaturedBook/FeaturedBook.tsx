import { Box,Container,IconButton } from "@mui/material";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import '../../../../../../node_modules/swiper/swiper-bundle.css';


import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



import book1 from '../../../../../assets/Images/book1.jpg';
import book2 from '../../../../../assets/Images/book2.webp';
import book3 from '../../../../../assets/Images/book3.webp';
import book4 from '../../../../../assets/Images/book4.webp';
import book12 from '../../../../../assets/Images/book12.webp';

import Book from "../../../BookModule/Components/Book/Book";

const books = [
    {id:1 , title:'the design of books' , category:'Drama', author:'debbie berne' , price: 38.00, img: book1 , status:'in stock'},
    {id:2 , title:'the lost' , category:'Fantasy', author:'matt zhang' , price: 46.00, img: book2 , status:'in stock'},
    {id:3 , title:'The moon and the stars' , category:'Drama', author:'Jenna Warren' , price: 62.00, img: book3 , status:'in stock'},
    {id:4 , title:'the green solider' , category:'Drama', author:'J. Edward Gore' , price: 50.00, img: book4 , status:'in stock'},
    {id:12 , title:'really good actually' , category:'Drama', author:'monica heisey' , price: 75.00, img: book12 , status:'out of stock'},
]

export default function FeaturedBook() {
  return (
    <>
    <Box className='bookBg' py={3} my={3}>
        <Container sx={{ position: 'relative' }}> 
            <Swiper
                spaceBetween={30}
                centeredSlides={false}
                 loop={true}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={{
                    prevEl: '.prev-btn',
                    nextEl: '.next-btn',
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
                style={{ paddingBottom: '50px' }}
            >
                {books.map((book)=>(
                    <SwiperSlide key={book.id}>
                        <Book book={book} mode="featured"/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <IconButton 
            className="prev-btn" 
            sx={{ 
                position: 'absolute', 
                left: { xs: 0, md: -100 },
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 10,
                border: '1px solid #ED553B', 
                color: '#ED553B', 
                bgcolor: 'white',
                display: { xs: 'none', xl: 'inline-flex' },
            }}
            >
                <ArrowBackIcon />
            </IconButton>

            <IconButton 
            className="next-btn" 
            sx={{ 
                position: 'absolute', 
                right: { xs: 0, md: -100 }, 
                top: '50%', 
                transform: 'translateY(-50%)', 
                zIndex: 10,
                border: '1px solid #ED553B', 
                color: '#ED553B', 
                bgcolor: 'white',
                display: { xs: 'none', xl: 'inline-flex' },
            }}
            >
                <ArrowForwardIcon />
            </IconButton>
        </Container>
    </Box>
      
    </>
  )
}