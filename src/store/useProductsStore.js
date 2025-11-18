import { create } from 'zustand';
import { products } from '../api/products';
import { categoryKorMap } from './data';

export const useProductsStore = create((set, get) => ({
  // TODO-------- 상품 ----------
  items: [],
  filtered: [],

  onFecthItems: async () => {
    const pull = get().items;
    if (pull.length > 0) return;

    const enriched = products.map((item) => ({
      ...item,
      kor: categoryKorMap[item.category1] || '',
      // detail_images가 없으면 빈 배열로 초기화
      detail_images: Array.isArray(item.detail_images) ? item.detail_images : [],
      tags: item.tags || '',
      tags2: item.tags2 || '',
    }));
    set({ items: enriched });
    console.log('Fetched items:', enriched);
  },

  //TODO 카테고리1 + 카테고리2 상품 필터링 (filtered에 저장)
  onCateOnly: (category1, category2) => {
    const items = get().items;
    let filtered = items;

    if (category1 && category2) {
      filtered = items.filter((item) => {
        return item.category1 === category1 && item.category2 === category2;
      });
    } else if (category1) {
      filtered = items.filter((item) => {
        return item.category1 === category1;
      });
    }

    set({ filtered });
    console.log('onCateOnly 필터됨:', filtered);
    return filtered;
  },

  //TODO 카테고리1 + 태그로 상품 필터링 (filtered에 저장)
  onCateTag: (category1, tags) => {
    const items = get().items;
    let filtered = items;

    if (category1 && tags) {
      filtered = items.filter((item) => {
        return item.category1 === category1 && item.tags === tags;
      });
    } else if (tags) {
      filtered = items.filter((item) => {
        return item.tags === tags;
      });
    }

    set({ filtered });
    console.log('onCateTag 필터됨:', filtered);
    return filtered;
  },

  // TODO 카테고리 1만 상품
  onCate1: (category1) => {
    const items = get().items;
    let filtered = items;

    if (category1) {
      filtered = items.filter((item) => {
        return item.category1 === category1;
      });
    }

    set({ filtered });
    console.log('onCate1 필터됨:', filtered);
    return filtered;
  },

  // TODO 태그만 상품
  onTags: (tags) => {
    const items = get().items;
    let filtered = items;

    if (tags) {
      filtered = items.filter((item) => {
        return item.tags === tags;
      });
    }

    set({ filtered });
    console.log('onTags 필터됨:', filtered);
    return filtered;
  },

  // TODO-------- 메뉴 생성 ----------
  menu: [],

  onMakeMenu: () => {
    const menuList = [];
    const item1 = get().items;

    item1.forEach(({ category1, category2, tags, tags2, id, detail_images }) => {
      // TODO---- 메인 메뉴 ----
      let mainMenu = menuList.find((m) => m.name === category1);
      if (!mainMenu) {
        mainMenu = {
          name: category1,
          link: `/${category1}`,
          subMenu: [],
          iconic: [],
          kor: categoryKorMap[category1] || '',
          tag: tags || '',
          id: id,
        };
        menuList.push(mainMenu);
      }

      // TODO---- 서브 메뉴 (category2) ----
      if (category2) {
        const hasSubMenu = mainMenu.subMenu.find((s) => s.name === category2);
        if (!hasSubMenu) {
          mainMenu.subMenu.push({
            name: category2,
            link: `/${category1}/${category2}`,
            tag: tags || '',
            imgUrl:
              Array.isArray(detail_images) && detail_images.length > 0 ? detail_images[0].url : '',
            kor2: categoryKorMap[category2] || '',
          });
        }
      }

      // TODO---- 서브 메뉴 (tags) ----
      if (tags) {
        const iMenu = mainMenu.subMenu.find((i) => i.name === tags);
        if (!iMenu) {
          mainMenu.subMenu.push({
            name: tags,
            link: `/${category1}/tag/${tags}`,
            iTag: tags2 || '',
            imgUrl:
              Array.isArray(detail_images) && detail_images.length > 0 ? detail_images[0].url : '',
          });
        }
      }
    });

    set({ menu: menuList });
    console.log('Menu list:', menuList);
  },
}));
