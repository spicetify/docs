import React from 'react';
// import Swiper core and required modules
import { Navigation, Scrollbar, A11y, EffectCoverflow } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';

const data = [
  { cover: require('@site/static/img/homepage-carousel/1.png').default, title: 'Preview 1' },
  { cover: require('@site/static/img/homepage-carousel/2.png').default, title: 'Preview 2' },
  { cover: require('@site/static/img/homepage-carousel/3.png').default, title: 'Preview 3' },
  { cover: require('@site/static/img/homepage-carousel/4.png').default, title: 'Preview 4' },
  { cover: require('@site/static/img/homepage-carousel/5.png').default, title: 'Preview 5' },
  { cover: require('@site/static/img/homepage-carousel/6.png').default, title: 'Preview 6' },
  { cover: require('@site/static/img/homepage-carousel/7.png').default, title: 'Preview 7' },
];

// eslint-disable-next-line react/display-name
export default () => {
  const slides = data.map((item, index) => (
    <SwiperSlide key={index}>
      <img src={item.cover} alt={item.title} />
    </SwiperSlide>
  ));

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Scrollbar, A11y, EffectCoverflow]}
      // spaceBetween={-100}
      spaceBetween={0}
      slidesPerView={3}
      navigation
      // onSwiper={(swiper) => console.log(swiper)}
      centeredSlides={true}
      // onSlideChange={() => console.log('slide change')}
      effect="coverflow"
      coverflowEffect={{
        // rotate: 20,
        // stretch: 25,
        rotate: 0,
        stretch: 0,
        depth: 250,
        modifier: 1,
        slideShadows: false,
      }}
      breakpoints={{
        700: {
          // spaceBetween: -100,
          slidesPerView: 3,
        },
        500: {
          // spaceBetween: -50,
          slidesPerView: 2,
        },
        // 411: {
        //   spaceBetween: -50,
        //   slidesPerView: 2,
        // },
        300: {
          spaceBetween: 0,
          slidesPerView: 1,
        },
      }}
      loop
    >
      {slides}
      {/* <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide> */}
    </Swiper>
  );
};
