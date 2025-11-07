import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Autoplay, Pagination } from 'swiper/modules';
import '../scss/ColumnSlide.scss';

const slideItems = [
  {
    title: '5BZ042_AF81_F0401_V_OOM',
    imgUrl: './assets/images/static/main/ColumnSlide/5BZ042_AF81_F0401_V_OOM.png',
    alt: '코듀로이 백팩',
  },
  {
    title: '5HC369_2CWC_F0IX2',
    imgUrl: './assets/images/static/main/ColumnSlide/5HC369_2CWC_F0IX2.png',
    alt: '코튼 베이스볼 캡',
  },
  {
    title: '5BC181_2IDK_F0324_V_OOS',
    imgUrl: './assets/images/static/main/ColumnSlide/5BC181_2IDK_F0324_V_OOS.png',
    alt: '아방뛰르 시어링 백',
  },
  {
    title: '5IF188_2IEK_F04UL',
    imgUrl: './assets/images/static/main/ColumnSlide/5IF188_2IEK_F04UL.png',
    alt: '스웨이드 헤어 바렛',
  },
  {
    title: '5BB163_2DU5_F0CMV_V_OOO',
    imgUrl: './assets/images/static/main/ColumnSlide/5BB163_2DU5_F0CMV_V_OOO.png',
    alt: '보 타탄 탑 핸들 백',
  },
  {
    title: '5E389E_Z0G_F0324_F_ZF05',
    imgUrl: './assets/images/static/main/ColumnSlide/5E389E_Z0G_F0324_F_ZF05.png',
    alt: '스웨이드와 시어링 스니커즈',
  },
  {
    title: '5BA284_2ID5_F0Z0F_V_OOI',
    imgUrl: './assets/images/static/main/ColumnSlide/5BA284_2ID5_F0Z0F_V_OOI.png',
    alt: '아이비 플래드 및 시어링 백',
  },
  {
    title: '5BB142_AB7O_F0003_V_OON',
    imgUrl: './assets/images/static/main/ColumnSlide/5BB142_AB7O_F0003_V_OON.png',
    alt: '아르카디 마테라쎄 스웨이드 백',
  },
];

const ColumnSlide = () => {
  return (
    <div className="column-slide">
      <>
        <Swiper
          slidesPerView={2.2}
          direction="vertical"
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Mousewheel, Autoplay, Pagination]}
          className="mySwiper">
          {slideItems.map((el) => {
            return (
              <SwiperSlide>
                <img src={el.imgUrl} alt={el.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    </div>
  );
};

export default ColumnSlide;
