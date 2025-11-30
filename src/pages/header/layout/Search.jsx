// src/pages/header/layout/Search.jsx
import { useState, useEffect } from 'react';
import { useSearchState } from '../../../store/useSearchState';
import { useNavigate } from 'react-router-dom';
import '../scss/search.scss';
import { useProductsStore } from '../../../store/useProductsStore';

const Search = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const { searchWord, setSearchWord, lastSearch, addLastSearch, clearSearchWord, onSearchDelete } =
    useSearchState();

  const [showNoResult, setShowNoResult] = useState(false);
  const [failedSearchWord, setFailedSearchWord] = useState('');

  // TODO 상품 스토어
  const { onSearch, items, onFetchItems } = useProductsStore();

  // TODO Search 열릴 때 상품 로드
  useEffect(() => {
    if (isOpen && onFetchItems) {
      onFetchItems();
      setShowNoResult(false);
    }
  }, [isOpen, onFetchItems]);

  // TODO 검색 실행 시 최근 검색어 추가
  const executeSearch = (word) => {
    addLastSearch(word);
  };

  // TODO 실제 검색 실행 + 페이지 이동
  const performSearch = (word) => {
    if (!word || word.trim() === '') return;
    const trimmedWord = word.trim();

    const results = onSearch(trimmedWord);
    const hasResults = results && results.length > 0;

    if (hasResults) {
      executeSearch(trimmedWord);
      clearSearchWord();
      setShowNoResult(false);
      navigate(`/searchResult?q=${encodeURIComponent(trimmedWord)}`);
      if (onClose) onClose();
    } else {
      setFailedSearchWord(trimmedWord);
      setShowNoResult(true);
      clearSearchWord();
    }
  };

  // TODO Enter 키
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchWord.trim() !== '') {
      performSearch(searchWord);
    }
  };

  // TODO 검색 버튼 클릭
  const handleSearchClick = () => {
    if (searchWord.trim() !== '') {
      performSearch(searchWord);
    }
  };

  // TODO 입력 값 변경 (얘는 그냥 검색창 입력 상태)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchWord(value);
    if (showNoResult) setShowNoResult(false);
  };

  // -----------------------------------------
  // 🔥 "최근 검색어" 기반 추천 검색어
  // -----------------------------------------
  const recentWord = lastSearch.length > 0 ? lastSearch[lastSearch.length - 1].word : '';
  const recentTrimmed = recentWord.trim();
  const recentLower = recentTrimmed.toLowerCase();

  const [recommendKeywords, setRecommendKeywords] = useState([]);

  useEffect(() => {
    if (!recentTrimmed || !items || items.length === 0) {
      setRecommendKeywords([]);
      return;
    }

    // 최근 검색어와 매칭되는 상품 찾기
    const matchedItems = items.filter((product) => {
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

      return searchableText.includes(recentLower);
    });

    // TODO 매칭된 상품들에서 category1/2, 한글 카테고리, material, 태그 등 뽑기
    const set = new Set();

    matchedItems.forEach((p) => {
      if (p.category1) set.add(p.category1);
      if (p.category2) set.add(p.category2);
      if (p.categoryKor1) set.add(p.categoryKor1);
      if (p.categoryKor2) set.add(p.categoryKor2);
      if (p.tags) set.add(p.tags);
      if (p.tags2) set.add(p.tags2);

      if (p.material) {
        const clean = p.material.replace(/^주\s*소재:\s*/g, '').trim();
        if (clean) set.add(clean);
      }
    });

    setRecommendKeywords(Array.from(set));
  }, [recentTrimmed, recentLower, items, recentWord]);

  return (
    <div className={`search-wrap ${isOpen ? 'active' : ''}`}>
      <div className="background" onClick={onClose}>
        <div className="container" onClick={(e) => e.stopPropagation()}>
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
                  {/* 최근 검색어 */}
                  <div className="lasted-search">
                    <p>최근 검색어</p>
                    <ul className="lasted-list">
                      {lastSearch.length === 0 ? (
                        <li className="empty">최근 검색어가 없습니다.</li>
                      ) : (
                        lastSearch.map((item) => (
                          <li className="search-item" key={item.id}>
                            <span onClick={() => performSearch(item.word)}>{item.word}</span>
                            <button onClick={() => onSearchDelete(item.id)}>
                              <img src="/assets/icon/search-remove.svg" alt="remove" />
                            </button>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>

                  <div className="divider"></div>

                  {/* 추천 검색어 */}
                  <div className="recommend-search">
                    <p>
                      추천 검색어
                      {recentTrimmed && <span className="recent-label"></span>}
                    </p>

                    <div className="recommend-list">
                      {!recentTrimmed ? (
                        <span className="empty">
                          최근 검색어가 있어야 추천 검색어가 표시됩니다.
                        </span>
                      ) : recommendKeywords.length === 0 ? (
                        <span className="empty">추천 검색어가 없습니다.</span>
                      ) : (
                        <ul>
                          {recommendKeywords.slice(0, 10).map((word, index) => (
                            <li key={index}>
                              <button
                                type="button"
                                className="recommend-item"
                                onClick={() => performSearch(word)}>
                                {word}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
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
