import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import ClubLayout from "./ClubLayout";
import "swiper/css";

const CulbSlider = () => {
  const clubCard = [
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper1.png",
      alt: "slider1",
      menu: "스페셜 프로젝트",
      title: "Miu Miu Upcycled by Catherine Martin",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper2.png",
      alt: "slider2",
      menu: "스페셜 프로젝트",
      title: "New Balance X Miu Miu with Coco Gauff ",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper3.png",
      alt: "slider3",
      menu: "스페셜 프로젝트",
      title: "MIU MIU Atheneum",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper4.png",
      alt: "slider4",
      menu: "스페셜 프로젝트",
      title: "30 Blizzards.",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper5.png",
      alt: "slider5",
      menu: "스페셜 프로젝트",
      title: "Miu Miu Spring/Summer 2026",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper6.png",
      alt: "slider6",
      menu: "향수",
      title: "Miutine",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper7.png",
      alt: "slider7",
      menu: "스페셜 프로젝트",
      title: "Miu Miu New Bond Street re-opening",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper8.png",
      alt: "slider8",
      menu: "우먼수 테일",
      title: "#30 프래그먼츠 포 비너스",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper9.png",
      alt: "slider9",
      menu: "캠페인",
      title: "미우미우 가을 겨울",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper10.png",
      alt: "slider10",
      menu: "캠페인",
      title: "미우미우 2025 레더굿 캠페인",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper11.png",
      alt: "slider11",
      menu: "캠페인",
      title: "Miu Miu L’Été 2025 Campaign",
    },
    {
      src: "/assets/images/static/main_club_Swiper/club_swiper12.png",
      alt: "slider12",
      menu: "스페셜 프로젝트",
      title: "Miu Miu Tales & Tellers",
    },
  ];
  return (
    <div className="slides">
      <Swiper
        direction="vertical"
        slidesPerView={2.2}
        spaceBetween={30}
        loop={true}
        mousewheel={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        speed={3000}
        modules={[Autoplay, Mousewheel]}
        className="mySwiper"
      >
        {clubCard.map((item) => (
          <SwiperSlide key={item.alt}>
            {/* <Link> */}
            <ClubLayout sendItem={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

{
  /* <div className="slider-card">
          <Swiper>
            {clubCard.map((slide, id) => (
              <SwiperSlide key={id}>
                <img src={slide.src} alt={slide.alt} />
              </SwiperSlide>
            ))}
          </Swiper>
          {clubCard.map((text) => (
            <div className="text" key={text.alt}>
              <p>{text.menu}</p>
              <p>{text.title}</p>
            </div>
          ))}
      </div> */
}

export default CulbSlider;
