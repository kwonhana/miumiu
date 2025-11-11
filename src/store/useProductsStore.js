import { create } from 'zustand';
import { products } from '../api/products';

export const useProductsStore = create((set, get) => ({
  items: [],

  onFecthItems: async () => {
    const existing = get().items;
    if (existing.length > 0) return;

    console.log(products);
    set({ items: products });
  },

  onItemCategory: (cate) => {
    const miuItems = get().items;
    if (!cate || cate === 'all') return miuItems;
    return miuItems.filter((item) => item.category1 === cate);
  },
}));
