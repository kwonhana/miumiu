import React from 'react';
import LineBanner from '../../component/layout/LineBanner';
import NewItemMain from '../../component/collection/NewItemMain';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import '../../styles/pages/home.scss';
import ColumnSlide from '../../component/collection/ColumnSlide';
import CousLe from '../../component/layout/CousLe';

const Home = () => {
  const newItemTitle = [
    { item: '보 플래드 백', no: '5BB173_2DU5_F0Z0F_V_OWM' },
    { item: '트릭 가죽 키링', no: '5TL516_2E6Y_F0032' },
    { item: '시어링 트래퍼 햇', no: '5HC386_2CSR_F0040' },
    { item: '시어링 패치워크 스톨', no: 'MPY055_181P_F0038_S_OOO' },
  ];

  return (
    <main className="main">
      <div className="inner">
        <section className="newItem">
          <div className="fw-collection">
            <Swiper
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination]}
              className="mySwiper">
              {newItemTitle.map((product, index) => (
                <SwiperSlide key={index}>
                  <NewItemMain item={product.item} no={product.no} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <ColumnSlide />
        </section>
        <CousLe />
      </div>
      {/* <LineBanner /> */}
    </main>
  );
};

export default Home;
