import { create } from 'zustand';
import { products } from '../api/products';

const categoryKorMap = {
  wallets: '지갑',
  small: '스몰 지갑',
  card: '카드 지갑',
  bags: '가방',
  mini: '미니백',
  topHandles: '토트백',
  shoulder: '숄더백',
  hobo: '호보백',
  backpacks: '백팩',
  totes: '토트백',
  jewellery: '쥬얼리',
  earrings: '귀걸이',
  necklaces: '목걸이',
  bracelets: '팔찌',
  'rings-and-brooches': '반지/브로치',
  shoes: '신발',
  pumps: '펌프스',
  sandals: '샌들',
  ballerinas: '플랫슈즈',
  sneakers: '스니커즈',
  'boots-and-ankle-boots': '부츠',
  'loafers-and-lace-ups': '로퍼/레이스업',
  고객센터: '고객센터',
  이벤트: '이벤트',
};

export const useProductsStore = create((set, get) => ({
  // ------ 상품 --------
  items: [],

  onFecthItems: async () => {
    const existing = get().items;
    if (existing.length > 0) return;

    set({ items: products });
  },

  // ------ 메뉴 생성 --------
  menu: [],

  onMakeMenu: () => {
    const menuList = [];

    const item1 = get().items;

    item1.forEach(({ category1, category2, tags }) => {
      // ---- 메인 메뉴 ----
      let mainMenu = menuList.find((m) => m.name === category1);
      if (!mainMenu) {
        mainMenu = {
          name: category1,
          link: ``,
          subMenu: [],
          kor: categoryKorMap[category1],
          tag: tags,
        };
        menuList.push(mainMenu);
      }
      // -----서브 메뉴 -----
      let hasMenu = mainMenu.subMenu.find((s) => s.name === category2);
      if (!hasMenu && category2) {
        mainMenu.subMenu.push({ name: category2, link: ``, tag: tags });
      }
    });
  },
}));
