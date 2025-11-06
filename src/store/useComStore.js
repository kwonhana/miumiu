// import { create } from 'zustand';

// const useSwiperStore = create((set, get) => ({
//   //스와이퍼 인스턴트를 전역 상태 저장
//   swiperInstance: null,

//   setSwiperInstance: (swiper) => set({ swiperInstance: swiper }),

//   handleMouseEnter: () => {
//     const { swiperInstance } = get();
//     if (swiperInstance && swiperInstance.autoplay) {
//       swiperInstance.stop();
//       console.log('22222222');
//     }
//   },

//   handleMouseLeave: () => {
//     const { swiperInstance } = get();
//     if (swiperInstance && swiperInstance.autoplay) {
//       swiperInstance.start();
//       console.log('1111111');
//     }
//   },
// }));

// export default useSwiperStore;
