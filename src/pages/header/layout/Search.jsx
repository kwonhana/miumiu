import React, { useState } from 'react';
import { useSearchState } from '../../../store/useSearchState';
import { useNavigate } from 'react-router-dom';
import { products } from '../../../api/products';
import '../scss/search.scss';

const Search = ({ isOpen }) => {
  const navigate = useNavigate();
  const { searchWord, setSearchWord, lastSearch, addLastSearch, clearSearchWord, onSearchDelete } =
    useSearchState();
  const [showNoResult, setShowNoResult] = useState(false);
  const [failedSearchWord, setFailedSearchWord] = useState('');

  const executeSearch = (word) => {
    addLastSearch(word);
  };
  // 검색어와 일치하는게 있는지 확인하는 함수
  const checkSearchResults = (word) => {
    const query = word.toLowerCase().trim();
    const results = products.filter((product) => {
      const searchableText = [
        product.category1,
        product.category2,
        product.name,
        product.price,
        product.subtitle,
        product.material,
        ...(Array.isArray(product.bullet_points) ? product.bullet_points : []),
      ]
        .filter(Boolean)
        .join('')
        .toLowerCase();
      return searchableText.includes(query);
    });
    return results.length > 0;
  };
  const performSearch = (word) => {
    if (!word || word.trim() === '') return;
    const trimmedWord = word.trim();
    const hasResults = checkSearchResults(trimmedWord);
    if (hasResults) {
      executeSearch(trimmedWord);
      clearSearchWord();
      setShowNoResult(false);
      navigate(`/searchResult?q=${encodeURIComponent(trimmedWord)}`);
    } else {
      setFailedSearchWord(trimmedWord);
      setShowNoResult(true);
      clearSearchWord();
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchWord.trim() !== '') {
      performSearch(searchWord);
    }
  };
  const handleSearchClick = () => {
    if (searchWord.trim() !== '') {
      performSearch(searchWord);
    }
  };

  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
    if (showNoResult) {
      setShowNoResult(false);
    }
  };

  return (
    <div className={`search-wrap ${isOpen ? 'active' : ''}`}>
      <div className="background">
        <div className="container">
          <div className="box">
            <div className="search-box">
              <input
                type="text"
                placeholder="검색어를 입력해주세요."
                value={searchWord}
                onChange={handleInputChange}
                onKeyDown={handleSearch}
              />
              <button onClick={handleSearchClick} type="button">
                <img src="/assets/icon/SearchIconBK.svg" alt="search" />
              </button>
            </div>
            <div className="search-list">
              {showNoResult ? (
                <div className="no-result-container">
                  <p className="no-result-text">
                    ""{failedSearchWord}""에 대한 검색 결과가 없습니다.
                  </p>
                  <p className="no-result-subtext">
                    다른 단어로 검색하시거나 고객센터로 연락주시기 바랍니다.
                  </p>
                </div>
              ) : (
                <>
                  <div className="lasted-search">
                    <p>최근 검색어</p>
                    <ul className="lasted-list">
                      {lastSearch.length === 0 ? (
                        <li className="empty">최근 검색어가 없습니다.</li>
                      ) : (
                        lastSearch.map((item) => (
                          <li className="search-item" key={item.id}>
                            <span onClick={() => performSearch(item.word)}>{item.word}</span>
                            <button
                              onClick={() => {
                                onSearchDelete(item.id);
                              }}>
                              <img src="/assets/icon/search-remove.svg" />
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                  <div className="divider"></div>
                  <div className="recommend-search">
                    <p>추천 검색어</p>
                    <div className="recommend-list"></div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
