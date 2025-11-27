// src/store/useProductsStore.js
import { create } from 'zustand';
import { products } from '../api/products';
import { categoryKorMap, CustomItem } from './data';
import { db } from '../api/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthStore } from '../api/authStore';

// 🔹 현재 로그인된 유저 UID 가져오는 헬퍼
const getCurrentUid = () => {
  const { user } = useAuthStore.getState();
  const rawUid = user && (user.uid || user.userId || user.id);
  return typeof rawUid === 'string' && rawUid.trim() ? rawUid : null;
};

export const useProductsStore = create((set, get) => ({
  // -------------------- 상품 --------------------
  items: [],

  // 위시리스트
  wishList: [],
  showWish: false,
  setShowWish: (value) => set({ showWish: value }),

  filtered: [],

  // 장바구니
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
  discount: 0,
  finalPrice: 0,
  selectedCoupon: null,

  //TODO 유저별 위시/카트 로드/저장
  // 로그인/계정변경 시 호출 → Firestore에 저장된 위시/카트 불러오기
  loadUserCartAndWish: async () => {
    const uid = getCurrentUid();
    if (!uid) return;

    try {
      const userRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const cartItems = data.cartItems || [];
        const wishList = data.wishList || [];
        const totalPrice = cartItems.reduce(
          (sum, item) => sum + (item.price || 0) * (item.count || 1),
          0
        );

        set({
          wishList,
          cartItems,
          cartCount: cartItems.length,
          totalPrice,
        });
      }
    } catch (err) {
      console.error('유저 장바구니/위시 불러오기 에러:', err);
    }
  },

  //TODO 위시/카트 변경 시 Firestore에 저장
  saveUserCartAndWish: async () => {
    const uid = getCurrentUid();
    if (!uid) return;

    const { wishList, cartItems } = get();

    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(
        userRef,
        {
          wishList,
          cartItems,
        },
        { merge: true }
      );
    } catch (err) {
      console.error('유저 장바구니/위시 저장 에러:', err);
    }
  },

  // 로그아웃 시 메모리 상의 장바구니/위시 비우기
  clearUserCartAndWish: () =>
    set({
      wishList: [],
      cartItems: [],
      cartCount: 0,
      totalPrice: 0,
      discount: 0,
      finalPrice: 0,
      selectedCoupon: null,
    }),

  // -------------------- 상품 전체 로드 --------------------
  onFetchItems: async () => {
    const pull = get().items;
    if (pull.length > 0) return;

    const enriched = products.map((item) => ({
      ...item,
      kor: categoryKorMap[item.category1] || '',
      detail_images: Array.isArray(item.detail_images) ? item.detail_images : [],
      tags: item.tags || '',
      tags2: item.tags2 || '',
    }));

    set({ items: enriched, filtered: enriched });
  },

  // TODO 검색
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
    return results;
  },

  //TODO 필터링
  onCateOnly: (category1, category2) => {
    const items = get().items;
    let filtered = items;

    if (category1 && category2) {
      filtered = items.filter(
        (item) => item.category1 === category1 && item.category2 === category2
      );
    } else if (category1) {
      filtered = items.filter((item) => item.category1 === category1);
    }

    set({ filtered });
    return filtered;
  },

  onCateTag: (category1, tags) => {
    const items = get().items;
    let filtered = items;

    if (category1 && tags) {
      filtered = items.filter((item) => item.category1 === category1 && item.tags === tags);
    } else if (tags) {
      filtered = items.filter((item) => item.tags === tags);
    }

    set({ filtered });
    return filtered;
  },

  onCate1: (category1) => {
    const items = get().items;
    const filtered = items.filter((item) => item.category1 === category1);
    set({ filtered });
    return filtered;
  },

  onTags: (tags) => {
    const items = get().items;
    const filtered = items.filter((item) => item.tags === tags);
    set({ filtered });
    return filtered;
  },

  onCustomStyle: (style) => {
    const items = get().items;
    const customItems = CustomItem.filter((item) => item.style === style);
    const filtered = items.filter((item) =>
      customItems.some((custom) => custom.itemId === item.id)
    );
    set({ filtered });
    return filtered;
  },

  onApplyFilter: (filters) => {
    const items = get().items;
    let result = [...items];

    if (filters.collection) {
      result = result.filter((item) => item.tags === filters.collection);
    }
    if (filters.fabric) {
      result = result.filter((item) => {
        const material = item.material ? item.material.replace(/^주 소재:\s*/, '').trim() : '';
        return material === filters.fabric;
      });
    }

    set({ filtered: result });
  },

  onResetFilter: () => {
    const items = get().items;
    set({ filtered: items });
  },

  // -------------------- 메뉴 생성 --------------------
  menu: [],
  subMenu: [],
  tagMenu: [],

  onMakeMenu: () => {
    const menuList = [];
    const item1 = get().items;

    item1.forEach(({ category1, category2, tags, tags2, id, detail_images }) => {
      let mainMenu = menuList.find((m) => m.name === category1);
      if (!mainMenu) {
        mainMenu = {
          name: category1,
          link: `/${category1}`,
          category2List: [],
          tagList: [],
          kor: categoryKorMap[category1] || '',
          tag: tags || '',
          id,
        };
        menuList.push(mainMenu);
      }

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
  },

  onMakeSubMenu: (category1) => {
    const menu = get().menu;
    const mainMenu = menu.find((m) => m.name === category1);

    set({
      subMenu: mainMenu ? mainMenu.category2List : [],
      tagMenu: mainMenu ? mainMenu.tagList : [],
    });
  },

  // -------------------- 장바구니 --------------------
  onAddToCart: (product, addCount = 1) => {
    const cart = get().cartItems;
    const existing = cart.find((item) => item.id === product.id);

    const countToAdd = product.count ?? addCount ?? 1;

    let updateCart;
    if (existing) {
      updateCart = cart.map((item) =>
        item.id === product.id ? { ...item, count: item.count + countToAdd } : item
      );
    } else {
      updateCart = [...cart, { ...product, count: countToAdd }];
    }

    const total = updateCart.reduce((sum, item) => sum + item.price * item.count, 0);

    set({
      cartItems: updateCart,
      cartCount: updateCart.length,
      totalPrice: total,
    });

    // 🔹 Firestore 반영
    get().saveUserCartAndWish();
  },

  onRemoveCart: (id) => {
    const cart = get().cartItems;
    const updateCart = cart.filter((item) => item.id !== id);

    const total = updateCart.reduce((sum, item) => sum + item.price * item.count, 0);

    set({
      cartItems: updateCart,
      cartCount: updateCart.length,
      totalPrice: total,
    });

    // 🔹 Firestore 반영
    get().saveUserCartAndWish();
  },

  onPlusItem: (id) => {
    const cart = get().cartItems;
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );

    const total = updateCart.reduce((sum, item) => sum + item.price * item.count, 0);

    set({ cartItems: updateCart, totalPrice: total });

    // 🔹 Firestore 반영
    get().saveUserCartAndWish();
  },

  onMinusItem: (id) => {
    const cart = get().cartItems;
    const updateCart = cart.map((item) =>
      item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item
    );

    const total = updateCart.reduce((sum, item) => sum + item.price * item.count, 0);

    set({ cartItems: updateCart, totalPrice: total });

    // 🔹 Firestore 반영
    get().saveUserCartAndWish();
  },

  onClearCart: () => {
    // 유저별로도 비울 거라 localStorage는 배송 정보만 정리 용도로 유지
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

    // 🔹 Firestore 반영
    get().saveUserCartAndWish();
  },

  onSelectCoupon: (coupon) => set({ selectedCoupon: coupon }),

  onFinalPrice: () => {
    const { totalPrice, selectedCoupon } = get();
    const discount = selectedCoupon ? Math.floor(totalPrice * (selectedCoupon.discount / 100)) : 0;
    const finalPrice = totalPrice - discount;

    set({ discount, finalPrice });
  },

  // -------------------- 위시리스트 --------------------
  onToggleWish: async (product) => {
    const uid = getCurrentUid();
    if (!uid) {
      alert('로그인이 필요합니다.');
      return;
    }

    const wish = get().wishList;
    const exists = wish.some((item) => item.id === product.id);

    const updatedWish = exists ? wish.filter((item) => item.id !== product.id) : [...wish, product];

    set({ wishList: updatedWish });

    try {
      await get().saveUserCartAndWish();
      console.log('위시리스트 Firestore 업데이트 완료');
    } catch (err) {
      console.error(err);
    }
  },

  // (원래 쓰던 함수 – 필요하면 그대로 사용 가능하지만,
  // 사실상 loadUserCartAndWish로 통합해서 써도 됨)
  fetchWishList: async () => {
    const uid = getCurrentUid();
    if (!uid) return;

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const data = userDoc.data();
      set({ wishList: data.wishList || [] });
    }
  },
}));
