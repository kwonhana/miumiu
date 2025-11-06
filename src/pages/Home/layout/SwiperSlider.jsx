import React from 'react';
import { Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const SwiperSlider = ({ item, direction, perView, speed, delay, center }) => {
  console.log(item);
  return (
    <>
      <Swiper
        className="mySwiper"
        direction={direction}
        slidesPerView={perView}
        spaceBetween={24}
        loop={true}
        mousewheel={true}
        autoplay={{
          delay: delay, // 지연 없이 계속 흐름
          disableOnInteraction: false,
          // ----- reverseDirection: true,
        }}
        speed={speed} // 천천히 부드럽게
        centeredSlides={center}
        modules={[Autoplay, Mousewheel]}>
        {item.map((el) => {
          return (
            <SwiperSlide>
              <img src={`${el.imgUrl}`} alt={`${el.alt}`} />
              <div className={el.title ? 'title' : 'hidden'}></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
