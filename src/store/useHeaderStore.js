import { create } from 'zustand';
import { bags, shoes, accessories, wallets, jewels } from './data';

//TODO 헤더 공동화
export const useHeaderStore = create((set, get) => ({
  //TODO 현재 활성화 메뉴 (기본값 백)
  activeMenu: 'bags',

  //TODO LNB 메뉴 데이터
  menuData: {
    bags: {
      title: '가방',
      data: bags,
      path: 'bags',
      categoryKey: 'bags',
      image: '/assets/images/lnb/bags-list.jpg',
    },
    shoes: {
      title: '신발',
      data: shoes,
      path: 'shoes',
      categoryKey: 'shoes',
      image: '/assets/images/lnb/shoes-list.jpg',
    },
    accessories: {
      title: '엑세서리',
      data: accessories,
      path: 'accessories',
      categoryKey: 'accessories',
      image: '/assets/images/lnb/accessories.png',
    },
    wallets: {
      title: '지갑',
      data: wallets,
      path: 'wallets',
      categoryKey: 'wallets',
      image: '/assets/images/lnb/wallets.jpg',
    },
    jewellery: {
      title: '패션 주얼리',
      data: jewels,
      path: 'jewellery',
      categoryKey: 'jewellery',
      image: '/assets/images/lnb/jewel.jpg',
    },
  },

  setActiveMenu: (menuKey) => set({ activeMenu: menuKey }),
}));
