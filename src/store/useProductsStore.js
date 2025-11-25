import { create } from 'zustand';
import { products } from '../api/products';
import { categoryKorMap, CustomItem } from './data';
import { db } from '../api/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthStore } from '../api/authStore';

export const useProductsStore = create((set, get) => ({
  // TODO-------- 상품 ----------
  items: [],
  wishList: [],
  filtered: [],
  // 카트에 담은 상품을 저장할 배열
  cartItems: [],
  // 카트애 담긴 상품 개수
  cartCount: 0,
  // 총금액
  totalPrice: 0,
  // 할인 금액
  discount: 0,
  // 최종 결제 금액
  finalPrice: 0,
  // 선택된 쿠폰
  selectedCoupon: null,

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
    set({ items: enriched, filtered: enriched });
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

    return results;
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
  //TODO custom 상품의 경우
  onCustomStyle: (style) => {
    const items = get().items;
    const customItems = CustomItem.filter((item) => item.style === style);
    const filtered = items.filter((item) =>
      customItems.some((custom) => custom.itemId === item.id)
    );
    set({ filtered });
    console.log('onCustomStyle 필터됨:', filtered);
    return filtered;
  },

  //TODO 필터적용함수
  onApplyFilter: (filters) => {
    const items = get().items; // 항상 원본 items에서 시작!
    let result = [...items];

    console.log('필터 적용 시작:', filters);
    console.log('원본 items 개수:', items.length);

    // 컬렉션 필터 (tags 기반)
    if (filters.collection) {
      result = result.filter((item) => item.tags === filters.collection);
      console.log(`컬렉션 필터 적용 (${filters.collection}):`, result.length, '개');
    }

    // 소재 필터 (material 기반)
    if (filters.fabric) {
      result = result.filter((item) => {
        const material = item.material ? item.material.replace(/^주 소재:\s*/, '').trim() : '';
        return material === filters.fabric;
      });
      console.log(`소재 필터 적용 (${filters.fabric}):`, result.length, '개');
    }
    set({ filtered: result });
  },
  // TODO필터 초기화 함수
  onResetFilter: () => {
    const items = get().items;
    console.log('필터 초기화: 전체', items.length, '개 상품으로 복원');
    set({ filtered: items });
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

  // TODO 장바구니 상품 추가
  onAddToCart: (product) => {
    const cart = get().cartItems;
    const existing = cart.find((item) => item.id === product.id);
    let updateCart;
    if (existing) {
      updateCart = cart.map((item) =>
        item.id === product.id ? { ...item, count: item.count + product.count } : item
      );
    } else {
      updateCart = [...cart, { ...product }];
    }
    console.log('업데이트된 장바구니:', updateCart);

    //총 구매 금액
    let total = 0;
    updateCart.forEach((item) => {
      total += item.price * item.count;
    });
    set({ cartItems: updateCart, cartCount: updateCart.length, totalPrice: total });
  },

  // TODO 장바구니 상품 삭제
  onRemoveCart: (id) => {
    const cart = get().cartItems;
    const updateCart = cart.filter((p) => p.id !== id);

    let total = 0;
    updateCart.forEach((item) => {
      total += item.price * item.count;
    });
    set({ cartItems: updateCart, cartCount: updateCart.length, totalPrice: total });
  },

  // TODO 장바구니 +
  onPlusItem: (id) => {
    const cart = get().cartItems;
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );

    let total = 0;
    updateCart.forEach((item) => {
      total += item.price * item.count;
    });
    set({
      cartItems: updateCart,
      totalPrice: total,
    });
  },

  // TODO 장바구니 -
  onMinusItem: (id) => {
    const cart = get().cartItems;
    const updateCart = cart.map((item) =>
      item.id == id ? { ...item, count: Math.max(1, item.count - 1) } : item
    );

    let total = 0;
    updateCart.forEach((item) => {
      total += item.price * item.count;
    });
    set({ cartItems: updateCart, totalPrice: total });
  },

  // TODO 장바구니 비우기
  onClearCart: () => {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingData');
    set({
      cartItems: [],
      cartCount: 0,
      totalPrice: 0,
      discount: 0,
      finalPrice: 0,
      selectedCoupon: null,
    });
  },

  // TODO 쿠폰 계산
  onSelectCoupon: (coupon) => set({ selectedCoupon: coupon }),
  onFinalPrice: () => {
    const { totalPrice, selectedCoupon } = get();
    const discount = selectedCoupon ? Math.floor(totalPrice * (selectedCoupon.discount / 100)) : 0;
    const finalPrice = totalPrice - discount;

    set({ discount, finalPrice });
  },
  //TODO 찜목록 추가 / 제거 (firebase서버 반영)
  onToggleWish: async (product) => {
    const { user } = useAuthStore.getState(); // 현재 로그인 유저
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    const wish = get().wishList;
    const exists = wish.some((item) => item.id === product.id);
    let updatedWish;

    if (exists) {
      // 이미 있으면 제거
      updatedWish = wish.filter((item) => item.id !== product.id);
    } else {
      updatedWish = [...wish, product];
    }

    set({ wishList: updatedWish });

    // TODO Firestore 업데이트
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, { wishList: updatedWish });

    console.log(' Firestore wishList 업데이트 완료');
  },

  // TODO 서버에서 찜목록 불러오기 (로그인 시)
  fetchWishList: async () => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const data = userDoc.data();
      set({ wishList: data.wishList || [] });
      console.log(' Firestore에서 wishList 불러옴');
    }
  },
}));
