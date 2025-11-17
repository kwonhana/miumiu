import { create } from 'zustand';
import { products } from '../api/products';
import { categoryKorMap } from './data';

export const useProductsStore = create((set, get) => ({
  // -------- 상품 ----------
  items: [],
  filtered: [],

  //TODO API 또는 products 데이터에서 상품 정보를 불러와 상태에 저장 (items)
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

  //TODO 카테고리 1, 2 또는 태그를 기준으로 items를 필터링해 filtered에 저장
  onCategorys: (category1, category2, tags) => {
    const items = get().items;
    const filtered = items.filter((item) => {
      if (category1 && category2) {
        return item.category1 === category1 && item.category2 === category2;
      } else if (category1 && tags) {
        return item.category1 === category1 && item.tags === tags;
      } else {
        return true;
      }
    });
    set({ filtered });
    console.log('Filtered items:', filtered);
    return filtered; // 필요시 반환
  },

  //TODO 카테고리 기반 필터링 (filterCate에 저장)
  onCateOnly: (category1, category2) => {
    const items = get().items;
    const filterCate = items.filter((item) => {
      if (category1 && category2) {
        return item.category1 === category1 && item.category2 === category2;
      } else if (category1) {
        return item.category1 === category1;
      } else {
        return true;
      }
    });
    set({ filterCate });
    console.log('filterCate items:', filterCate);
    return filterCate;
  },

  //TODO 카테고리2 + 태그로 상품 필터링 (cateTags에 저장)
  onCateTag: (category2, tags) => {
    const items = get().items;
    const cateTags = items.filter((item) => {
      if (category2 && tags) {
        return item.category2 === category2 && item.tags === tags;
      } else if (tags) {
        return item.tags === tags;
      } else {
        return true;
      }
    });
    set({ cateTags });
    console.log('cateTags items:', cateTags);
    return cateTags;
  },

  // -------- 메뉴 생성 ----------
  menu: [],

  //TODO 상품 데이터로부터 메뉴 구조 (menu) 생성
  onMakeMenu: () => {
    const menuList = [];
    const item1 = get().items;

    item1.forEach(({ category1, category2, tags, tags2, id, detail_images }) => {
      // ---- 메인 메뉴 ----
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

      // ---- 서브 메뉴 (category2) ----
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

      // ---- 서브 메뉴 (tags) ----
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

// 카테1 카테 2
// 카테 2 태그 따로 분류해서 모아두기

//카테1
//카테1 카테2
//카테1 태그 :태그
//카테1 카테2 태그 :태그
//카테1 태그 :태그 카테2
