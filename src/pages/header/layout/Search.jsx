import React from 'react';
import '../scss/search.scss';
import { useSearchState } from '../../../api/useSearchState';

const Search = ({ isOpen }) => {
  const { searchWord, setSearchWord, lastSearch, addLastSearch, clearSearchWord, onSearchDelete } =
    useSearchState();
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      addLastSearch(searchWord);
      clearSearchWord();
      console.log('검색엔터');
    }
  };

  return (
    <div className={`search-wrap ${isOpen ? 'active' : ''}`}>
      <div className="search-box">
        <input
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button>
          <img src="/assets/icon/SearchIconBK.svg" alt="search" />
        </button>
      </div>
      <div className="search-list">
        <div className="lasted-search">
          <p>최근 검색어</p>
          <ul className="lasted-list">
            {lastSearch.map((item) => (
              <li key={item.id}>
                <span>{item.word}</span>
                <button
                  onClick={() => {
                    onSearchDelete(item.id);
                  }}>
                  <img src="/assets/icon/search-remove.svg" />
                </button>
              </li>
            ))}
          </ul>
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
