import React from 'react';
import { Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const SwiperSlider = ({ item, direction }) => {
  console.log(item);
  return (
    <>
      <Swiper
        className="mySwiper"
        direction={direction}
        slidesPerView={2.2}
        spaceBetween={24}
        loop={true}
        mousewheel={true}
        autoplay={{
          delay: 0, // 지연 없이 계속 흐름
          disableOnInteraction: false,
        }}
        speed={3000} // 천천히 부드럽게
        modules={[Autoplay, Mousewheel]}>
        {item.map((el) => {
          return (
            <SwiperSlide>
              <img src={`${el.imgUrl}`} alt="" />
              <div className={el.title ? 'title' : 'hidden'}></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
