// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { Navigation, Scrollbar, A11y, EffectCoverflow, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

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
      modules={[Navigation, Scrollbar, A11y, EffectCoverflow, Autoplay]}
      spaceBetween={-200}
      slidesPerView={3}
      navigation
      loop
      simulateTouch
      centeredSlides
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={centeredSlide() => console.log('slide change')}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      effect="coverflow"
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 250,
        modifier: 1,
        slideShadows: false,
      }}
      breakpoints={{
        700: {
          spaceBetween: -100,
          slidesPerView: 3,
        },
        500: {
          spaceBetween: -100,
          slidesPerView: 2,
        },
        300: {
          spaceBetween: -100,
          slidesPerView: 1,
        },
      }}
    >
      {slides}
    </Swiper>
  );
};
