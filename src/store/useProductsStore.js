import { create } from 'zustand';
import { products } from '../api/products';
import { categoryKorMap } from './data';

export const useProductsStore = create((set, get) => ({
  // TODO-------- 상품 ----------
  items: [],
  filtered: [],

  onFetchItems: async () => {
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
  onSearch: (word) => {
    const query = word.toLowerCase().trim();
    const items = get().items;

    const results = items.filter((product) => {
      const searchableText = [
        product.category1,
        product.category2,
        product.name,
        product.price,
        product.subtitle,
        product.material,
        product.kor,
        product.tags,
        product.tags2,
        ...(Array.isArray(product.bullet_points) ? product.bullet_points : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(query);
    });

    set({ filtered: results });
    console.log('Search results (filtered):', results);
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
  subMenu: [], // category2만
  tagMenu: [], // tags만

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
          category2List: [], // category2 메뉴
          tagList: [], // tag 메뉴
          kor: categoryKorMap[category1] || '',
          tag: tags || '',
          id: id,
        };
        menuList.push(mainMenu);
      }

      // TODO---- 서브 메뉴 (category2만) ----
      if (category2) {
        const hasCate2 = mainMenu.category2List.find((c) => c.name === category2);
        if (!hasCate2) {
          mainMenu.category2List.push({
            name: category2,
            link: `/${category1}/${category2}`,
            imgUrl:
              Array.isArray(detail_images) && detail_images.length > 0 ? detail_images[0].url : '',
            kor2: categoryKorMap[category2] || '',
          });
        }
      }

      // TODO---- 서브 메뉴 (tags만) ----
      if (tags) {
        const hasTag = mainMenu.tagList.find((t) => t.name === tags);
        if (!hasTag) {
          mainMenu.tagList.push({
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

  onMakeSubMenu: (category1) => {
    const menu = get().menu;
    const mainMenu = menu.find((m) => m.name === category1);
    const subMenu = mainMenu ? mainMenu.category2List : []; // category2만
    const tagMenu = mainMenu ? mainMenu.tagList : []; // tags만

    set({ subMenu, tagMenu });
    console.log('category2 subMenu:', category1, ':', subMenu);
    console.log('tags tagMenu:', category1, ':', tagMenu);
  },
}));
