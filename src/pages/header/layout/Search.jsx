import React from 'react';
import '../scss/search.scss';
import { useAuthStore } from '../../../api/authStore';

const Search = ({ isOpen }) => {
  const { searchWord, setSearchWord } = useAuthStore();
  return (
    <div className={`search-wrap ${isOpen ? 'active' : ''}`}>
      <div className="search-box">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <img src="/assets/icon/SearchIconBk.svg" alt="search" />
      </div>
      <div className="search-list">
        <div className="lasted-search">
          <p>최근 검색어</p>
          <div className="lasted-list"></div>
        </div>
        <div className="divider"></div>
        <div className="recommend-search">
          <p>추천 검색어</p>
          <div className="recommend-list"></div>
        </div>
      </div>
    </div>
  );
};

export default Search;
