import React from 'react';
import '../scss/NewItemMain.scss';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import ColumnSlide from './ColumnSlide';

const newItemTitle = [
  { item: '보 플래드 백', no: '5BB173_2DU5_F0Z0F_V_OWM' },
  { item: '트릭 가죽 키링', no: '5TL516_2E6Y_F0032' },
  { item: '시어링 트래퍼 햇', no: '5HC386_2CSR_F0040' },
  { item: '시어링 패치워크 스톨', no: 'MPY055_181P_F0038_S_OOO' },
];

const NewItemMain = () => {
  return (
    <section className="newItem">
      <div className="fw-collection">
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper">
          {newItemTitle.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="new-container">
                <p>
                  <img src={`/assets/images/detail/${product.no}.jpg`} alt={product.item} />
                </p>
                <div className="gradient-wrap">
                  <span>WHAT'S NEW</span>
                  <h2>{product.item}</h2>
                  <Link className="link">구매하기</Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ColumnSlide />
    </section>
  );
};

export default NewItemMain;
