import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Box, Button, Typography, Container, Grid, Stack, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../../../../../node_modules/swiper/swiper-bundle.css';

import homeSlider from '../../../../../assets/Images/home-slider1.png';


const slidesData = [
  { id: 1, title: "first slide"},
  { id: 2, title: "second slide"},
  { id: 3, title: "third slide"},
  { id: 4, title: "fourth slide"}
];
export default function HomeSlider() {
  return (
    <Box sx={{ width: '100%' }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{ delay: 3000 }}
        loop={true}
        autoHeight={true}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.home-prev',
          nextEl: '.home-next',
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
        style={{ width: '100%' }}
      >
        {slidesData.map((slide)=>(
            <SwiperSlide key={slide.id}>
              <Box 
                className='homeSlider' 
                sx={{ 
                  width: '100%', 
                  py: { xs: 4, md: 8 }, 
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 'auto', 
                  height: '100%' 
                }}
              >
                <Container maxWidth="lg"> 
                  <Grid container spacing={4} alignItems="center" sx={{ height: 'auto' }}>
                    <Grid size={{ xs: 12, md: 6 }} order={{xs:2 , md:1}} color='#393280' spacing={4}>
                      <Stack spacing={3} sx={{ textAlign: { xs: 'center', md: 'left' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
                        <Typography variant='h3' textTransform='capitalize' fontWeight='bold'>ipsum dolor si</Typography>
                        <Typography variant='body1'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu feugiat amet, libero ipsum enim pharetra hac. Urna commodo, lacus ut magna velit eleifend. Amet, quis urna, a eu.</Typography>
                        <Button variant='outlined' 
                          sx={{color:'#393280' , borderColor: '#393280', px:3, py:1.5 , my:4 ,fontWeight:'normal'}} 
                          endIcon={<ArrowForwardIcon />}>
                            read more
                        </Button>
                      </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }} order={{xs:1 , md:2}} justifyContent='center'display='flex' alignItems='center'>
                      <Box
                        component="img"
                        src={homeSlider}
                        alt="sliderimg"
                        sx={{
                          width: { xs: '80%', md: '70%' },
                          height: 'auto',
                          display: 'block' 
                        }}
                      />
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </SwiperSlide>
        ))}
      </Swiper>
      <IconButton 
        className="home-prev" 
        sx={{ 
          position: 'absolute', left: 20, top: '60%', transform: 'translateY(-50%)', zIndex: 10,
          border: '1px solid #ED553B', color: '#ED553B', bgcolor: 'rgba(255,255,255,0.5)',
          '&:hover': { bgcolor: '#fff' },
          display: { xs: 'inline-flex', md:'none', lg: 'inline-flex' },
        }}

      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton 
        className="home-next" 
        sx={{ 
          position: 'absolute', right: 20, top: '60%', transform: 'translateY(-50%)', zIndex: 10,
          border: '1px solid #ED553B', color: '#ED553B', bgcolor: 'rgba(255,255,255,0.5)',
          '&:hover': { bgcolor: '#fff' },
          display: { xs: 'inline-flex', md:'none', lg: 'inline-flex' },
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Box>
  );
}