import React from 'react';
import '../../styles/collection/ColumnSlide.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay } from 'swiper/modules';

const ColumnSlide = () => {
  return (
    <div className="column-slide">
      <>
        <Swiper
          direction="vertical"
          slidesPerView={2.2}
          spaceBetween={24}
          loop={true}
          mousewheel={true}
          autoplay={{
            delay: 0, // 지연 없이 계속 흐름
            disableOnInteraction: false,
          }}
          speed={3000} // 천천히 부드럽게
          modules={[Autoplay, Mousewheel]}
          className="mySwiper">
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </>
    </div>
  );
};

export default ColumnSlide;
