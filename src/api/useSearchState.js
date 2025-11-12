import { create } from 'zustand';

export const useSearchState = create((set, get) => ({
  searchWord: '',
  lastSearch: [],

  setSearchWord: (word) => set({ searchWord: word }),
  addLastSearch: (word) => {
    if (!word || word.trim() === '') return;
    const { lastSearch } = get();
    if (lastSearch.includes(word)) return;
    const newSearch = {
      id: Date.now(),
      word: word,
    };
    const updated = [...lastSearch, newSearch];
    set({ lastSearch: updated });
  },
  clearSearchWord: () => set({ searchWord: '' }),

  onSearchDelete: (id) => {
    const { lastSearch } = get();
    const updated = lastSearch.filter((word) => word.id !== id);
    set({ lastSearch: updated });
  },
}));
