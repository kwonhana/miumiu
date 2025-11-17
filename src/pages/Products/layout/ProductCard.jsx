import React, { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const ProductCard = ({ product }) => {
  // 각 카드의 버튼을 고유하게 선택하기 위해 ref 사용
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  // detail_images가 배열이면 detail_images 우선 사용
  // 아니면 local_detail_images 사용
  const images = Array.isArray(product?.detail_images)
    ? product.detail_images
    : product?.local_detail_images || [];

  return (
    <>
      <Swiper
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevButtonRef.current;
          swiper.params.navigation.nextEl = nextButtonRef.current;
        }}
        slidesPerView={1}
        modules={[Navigation]}
        className="mySwiper">
        {images.map((image, index) => {
          // detail_images → 객체 배열 (image.url)
          // local_detail_images → 문자열 배열 (파일명)
          const imageSrc = typeof image === 'string' ? `/assets/images/detail/${image}` : image.url;

          return (
            <SwiperSlide key={index}>
              <img src={imageSrc} alt={product.name} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button ref={prevButtonRef} className="my-swiper-button-prev">
        <img src="/assets/images/static/product/btn_arrow_prev.png" alt="prev" />
      </button>
      <button ref={nextButtonRef} className="my-swiper-button-next">
        <img src="/assets/images/static/product/btn_arrow_next.png" alt="next" />
      </button>
    </>
  );
};

export default ProductCard;
