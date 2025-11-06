import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay } from 'swiper/modules';
import '../scss/ColumnSlide.scss';
import SwiperSlider from './SwiperSlider';

const slideItems = [
  {
    title: '5BZ042_AF81_F0401_V_OOM',
    imgUrl: './assets/images/static/main/ColumnSlide/5BZ042_AF81_F0401_V_OOM.png',
  },
  {
    title: '5HC369_2CWC_F0IX2',
    imgUrl: './assets/images/static/main/ColumnSlide/5HC369_2CWC_F0IX2.png',
  },
  {
    title: '5BC181_2IDK_F0324_V_OOS',
    imgUrl: './assets/images/static/main/ColumnSlide/5BC181_2IDK_F0324_V_OOS.png',
  },
  {
    title: '5IF188_2IEK_F04UL',
    imgUrl: './assets/images/static/main/ColumnSlide/5IF188_2IEK_F04UL.png',
  },
  {
    title: '5BB163_2DU5_F0CMV_V_OOO',
    imgUrl: './assets/images/static/main/ColumnSlide/5BB163_2DU5_F0CMV_V_OOO.png',
  },
  {
    title: '5E389E_Z0G_F0324_F_ZF05',
    imgUrl: './assets/images/static/main/ColumnSlide/5E389E_Z0G_F0324_F_ZF05.png',
  },
  {
    title: '5BA284_2ID5_F0Z0F_V_OOI',
    imgUrl: './assets/images/static/main/ColumnSlide/5BA284_2ID5_F0Z0F_V_OOI.png',
  },
  {
    title: '5BB142_AB7O_F0003_V_OON',
    imgUrl: './assets/images/static/main/ColumnSlide/5BB142_AB7O_F0003_V_OON.png',
  },
];

const ColumnSlide = ({ direction, item }) => {
  return (
    <div className="column-slide">
      <>
        <Swiper
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
          modules={[Autoplay, Mousewheel]}
          className="mySwiper">
          <SwiperSlider item={slideItems} direction="vertical" />
        </Swiper>
      </>
    </div>
  );
};

export default ColumnSlide;
