// SearchResult.jsx 수정 예시
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import { useSearchState } from '../../store/useSearchState';
import ProductFilterNav from './layout/ProductFilterNav';
import ProductFilterWrap from './layout/ProductFilterWrap';
import './scss/SearchResult.scss';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { filtered, onSearch, onFetchItems } = useProductsStore();
  const { currentSearchQuery, setCurrentSearchQuery } = useSearchState();

  const [navFilteredList, setNavFilteredList] = useState(null); // 네비(카테고리) 필터 결과
  const [filterWrapList, setFilterWrapList] = useState(null); // 필터랩(컬렉션/소재/정렬) 결과
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔹 검색으로 걸러진 기본 리스트
  const baseFromSearch = filtered || [];

  // 🔹 1차: 카테고리(네비)로 한 번 거른 리스트
  const baseList = navFilteredList || baseFromSearch;

  // 🔹 2차: 필터랩 결과가 있으면 그걸 최종으로 사용
  const displayList = filterWrapList || baseList;

  const displayQuery = query || currentSearchQuery;

  // 필터랩에 넘길 컬렉션/소재 목록은 "현재 기준 리스트(baseList)"에서 추출
  const collectionArray = Array.from(
    new Set(baseList.map((item) => item.collection).filter(Boolean))
  );
  const fabricArray = Array.from(
    new Set(
      baseList
        .map((item) => (item.material ? item.material.replace(/^주 소재:\s*/, '').trim() : ''))
        .filter(Boolean)
    )
  );

  // 전체 아이템 가져오기
  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  // URL q 변경 시 검색 실행
  useEffect(() => {
    if (query) {
      onSearch(query);
      setCurrentSearchQuery(query);
      setNavFilteredList(null);
      setFilterWrapList(null); // 검색어 바뀌면 필터 초기화
    }
  }, [query, onSearch, setCurrentSearchQuery]);

  // 🔸 네비에서 카테고리 필터(또는 "모든 룩 보기") 했을 때
  const handleFilterChange = (result) => {
    // result === null → 네비 필터 없음 (기본 검색 결과로)
    if (!result) {
      setNavFilteredList(null);
    } else {
      setNavFilteredList(result);
    }
    // 카테고리 바꾸면 필터랩 결과도 초기화
    setFilterWrapList(null);
  };

  // 🔸 필터랩 열기/닫기
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // 가격 문자열 → 숫자
  const parsePrice = (price) => {
    if (!price) return 0;
    const num = parseInt(String(price).replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  // 🔸 필터랩에서 "필터 적용하기" 눌렀을 때
  const handleApplyFilter = ({ collection, fabric, sort }) => {
    let result = baseList; // 현재 기준 리스트(검색 + 네비 필터 적용된 상태)

    // 1) 컬렉션 필터
    if (collection) {
      result = result.filter((item) => item.collection === collection);
    }

    // 2) 소재 필터
    if (fabric) {
      result = result.filter((item) => {
        const materialClean = item.material ? item.material.replace(/^주 소재:\s*/, '').trim() : '';
        return materialClean === fabric;
      });
    }

    // 3) 정렬 적용
    if (sort) {
      const sorted = [...result];
      switch (sort) {
        case 'name-asc':
          sorted.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          result = sorted;
          break;
        case 'name-desc':
          sorted.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
          result = sorted;
          break;
        case 'price-asc':
          sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
          result = sorted;
          break;
        case 'price-desc':
          sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
          result = sorted;
          break;
        default:
          break;
      }
    }

    // 필터 결과 저장 (아무것도 없으면 빈 배열 or null 선택 가능)
    setFilterWrapList(result.length ? result : []);
    setIsFilterOpen(false);
  };
  console.log('[SearchResult] fabricArray:', fabricArray);
  return (
    <div className="search-result-container">
      {/* 상단 네비: 카테고리 필터 + "필터 및 정렬" 버튼 */}
      <ProductFilterNav
        list={baseFromSearch}
        query={!!query}
        onFilter={handleFilterChange}
        onOpenFilter={handleOpenFilter}
      />

      {/* 필터랩: 정렬 + 컬렉션 + 소재 */}
      <ProductFilterWrap
        collection={collectionArray}
        fabric={fabricArray}
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilter={handleApplyFilter}
      />

      {/* 검색 결과 배너 */}
      <div className="ProductBanner">
        <h2>
          "<span>{displayQuery || ''}</span>" 검색 결과
        </h2>
        <span>({displayList.length})</span>
      </div>

      {/* 상품 리스트 */}
      <ul className="search-product-list">
        {displayList.map((p) => (
          <li className="item" key={p.id}>
            <Link to={`/product/${p.id}`}>
              <img
                src={
                  p.local_detail_images?.[0]
                    ? `/assets/images/detail/${p.local_detail_images[0]}`
                    : '/assets/images/default-product-image.png'
                }
                alt={p.name}
              />
              <div className="product-text-box">
                <h3>{p.name}</h3>
                <p>{p.price}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
