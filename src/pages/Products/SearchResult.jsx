// src/pages/Products/SearchResult.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import { useSearchState } from '../../store/useSearchState';
import ProductFilterNav from './layout/ProductFilterNav';
import ProductFilterWrap from './layout/ProductFilterWrap';
import './scss/SearchResult.scss';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q');

  const { filtered, onSearch, onFetchItems } = useProductsStore();
  const { currentSearchQuery, setCurrentSearchQuery } = useSearchState();

  // 🔹 현재 선택된 1차 카테고리 코드 (예: 'bags', 'shoes')
  const [activeCategory, setActiveCategory] = useState(null);

  // 🔹 필터랩(소재/컬렉션/정렬) 옵션
  const [filterOptions, setFilterOptions] = useState({
    collection: '',
    fabric: '',
    sort: '',
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔹 검색 결과 (기본 리스트)
  // 🔹 1차: 검색 결과 + id 기준 중복 제거
  const baseFromSearch = React.useMemo(() => {
    const list = filtered || [];
    const seen = new Set();
    return list.filter((item) => {
      if (!item.id) return true; // id 없으면 일단 통과
      if (seen.has(item.id)) return false; // 이미 본 id면 제거
      seen.add(item.id);
      return true;
    });
  }, [filtered]);

  const displayQuery = queryParam || currentSearchQuery;

  // 🔹 가격 문자열 → 숫자
  const parsePrice = (price) => {
    if (!price) return 0;
    const num = parseInt(String(price).replace(/[^0-9]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  // 🔥 최종적으로 화면에 뿌릴 리스트: 항상 "검색 결과"에서만 파생
  const displayList = useMemo(() => {
    let result = [...baseFromSearch];

    // 1) 카테고리 탭 필터
    if (activeCategory) {
      result = result.filter((item) => item.category1 === activeCategory);
    }

    // 2) 컬렉션 필터
    if (filterOptions.collection) {
      result = result.filter((item) => item.collection === filterOptions.collection);
    }

    // 3) 소재 필터
    if (filterOptions.fabric) {
      result = result.filter((item) => {
        const materialClean = item.material ? item.material.replace(/^주 소재:\s*/, '').trim() : '';
        return materialClean === filterOptions.fabric;
      });
    }

    // 4) 정렬
    if (filterOptions.sort) {
      switch (filterOptions.sort) {
        case 'name-asc':
          result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
          break;
        case 'name-desc':
          result.sort((a, b) => (b.name || '').localeCompare(a.name || ''));
          break;
        case 'price-asc':
          result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
          break;
        case 'price-desc':
          result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
          break;
        default:
          break;
      }
    }

    return result;
  }, [baseFromSearch, activeCategory, filterOptions]);

  // 🔹 필터랩에 보여줄 컬렉션/소재 목록은 "현재 카테고리 적용된 리스트" 기준으로
  const collectionArray = useMemo(
    () => Array.from(new Set(displayList.map((item) => item.collection).filter(Boolean))),
    [displayList]
  );

  const fabricArray = useMemo(
    () =>
      Array.from(
        new Set(
          displayList
            .map((item) => (item.material ? item.material.replace(/^주 소재:\s*/, '').trim() : ''))
            .filter(Boolean)
        )
      ),
    [displayList]
  );

  // 전체 아이템 최초 로드
  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  // 검색어(q) 바뀔 때마다 검색 실행 + 필터 초기화
  useEffect(() => {
    if (queryParam) {
      onSearch(queryParam);
      setCurrentSearchQuery(queryParam);
      setActiveCategory(null);
      setFilterOptions({ collection: '', fabric: '', sort: '' });
    }
  }, [queryParam, onSearch, setCurrentSearchQuery]);

  // 🔸 네비(카테고리 탭)에서 카테고리 변경
  const handleCategoryChange = (cateCode) => {
    // cateCode === null → "모든 룩 보기"
    setActiveCategory(cateCode);
    // 카테고리 바꾸면 컬렉션/소재/정렬은 그대로 둘 수도 있고 초기화할 수도 있음
    // 필요하면 아래 주석 풀어서 카테고리 변경 시 필터 초기화
    // setFilterOptions({ collection: '', fabric: '', sort: '' });
  };

  // 🔸 필터랩 열기/닫기
  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // 🔸 필터랩에서 "필터 적용하기" 눌렀을 때
  const handleApplyFilter = ({ collection, fabric, sort }) => {
    setFilterOptions({
      collection: collection || '',
      fabric: fabric || '',
      sort: sort || '',
    });
    setIsFilterOpen(false);
  };
  console.log((p) => p.id);
  return (
    <div className="search-result-container">
      {/* 상단 네비: "검색 결과" 기준 카테고리 탭 + 필터 버튼 */}
      <ProductFilterNav
        list={baseFromSearch} // 🔥 항상 "검색 결과" 기준
        query={!!queryParam}
        activeCategory={activeCategory}
        onChangeCategory={handleCategoryChange}
        onOpenFilter={handleOpenFilter}
      />

      {/* 필터랩(모달) */}
      <ProductFilterWrap
        collection={collectionArray}
        fabric={fabricArray}
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilter={handleApplyFilter}
      />

      {/* 검색 결과 타이틀 */}
      <div className="ProductBanner">
        <h2>
          "<span>{displayQuery || ''}</span>" 검색 결과
        </h2>
        <span>({displayList.length})</span>
      </div>

      {/* 상품 리스트 */}
      <ul className="search-product-list">
        {displayList.map((p, index) => (
          <li className="item" key={`${p.id || 'no-id'}-${index}`}>
            {/* 여기 p.id가 진짜로 유니크한지만 한 번 확인! */}
            <Link to={`/product/${p.id}`}>
              <img
                src={
                  p.detail_images?.[0].url
                    ? `${p.detail_images[0].url}`
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
