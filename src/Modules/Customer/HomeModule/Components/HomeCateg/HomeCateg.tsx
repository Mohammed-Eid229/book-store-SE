import { Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import '../../../../../../node_modules/swiper/swiper-bundle.css';

import categimg1 from '../../../../../assets/Images/category1.jpg'
import categimg2 from '../../../../../assets/Images/category2.jpg'
import categimg3 from '../../../../../assets/Images/category3.jpg'

const categData = [
  {id:1, title:'Higher Education', image:categimg1},
  {id:2, title:'Management Books', image:categimg2},
  {id:3, title:'Engineering Books', image:categimg3},
  {id:4, title:'Science Fiction', image:categimg1},
  {id:5, title:'Computer Science', image:categimg2},
  {id:6, title:'History Books', image:categimg3}
]

export default function HomeCateg() {
  return (
    <>
      <Box sx={{ py: 2 }}>
      <Container>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="flex-end" 
          sx={{ mb: 4 }}
        >
          <Box>
            <Stack direction='row' justifyContent='start' alignItems='center' spacing={1}>
              <Box sx={{width:'30px' , height:'2px' , backgroundColor:'#ED553B'}}></Box>
              <Typography variant="caption" color="#ED553B" fontWeight='bold'>Categories</Typography>
            </Stack>
            <Typography variant="h5" fontWeight='bold' color="#393280">Explore our Top Categories</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton 
              className="prev-btn"
              sx={{ 
                border: '1px solid #ED553B', 
                color: '#ED553B',
                '&.swiper-button-disabled': { opacity: 0.5, borderColor: '#ccc' } 
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <IconButton 
              className="next-btn" 
              sx={{ 
                border: '1px solid #ED553B', 
                backgroundColor: 'transparent',
                color: '#ED553B',
                '&.swiper-button-disabled': { opacity: 0.5, borderColor: '#ccc' }
              }}
            >
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
        <Box>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            observer={true} 
            observeParents={true}
            navigation={{
              prevEl: '.prev-btn',
              nextEl: '.next-btn',
              disabledClass: 'swiper-button-disabled'
            }}
            breakpoints={{
              600: { slidesPerView: 2, spaceBetween: 20 },
              900: { slidesPerView: 3, spaceBetween: 30 },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            {categData.map((categ) => (
              <SwiperSlide key={categ.id}>
                <Stack direction='column' spacing={2} textAlign='center'>
                  <img 
                    src={categ.image} 
                    alt={categ.title} 
                    style={{ borderRadius: '10px', width: '100%', display: 'block' }} 
                  />
                  <Typography variant="h6" color="#393280">{categ.title}</Typography>
                </Stack>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box textAlign='center' my={4}>
          <Button variant='outlined' 
            sx={{color:'#393280' , borderColor: '#393280',px:3, py:1.5 , fontWeight:'normal'}} 
            endIcon={<ArrowForwardIcon />}>
              view more
          </Button>
        </Box>
      </Container>
    </Box>
    </>
  )
}
