import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import { useSearchState } from '../../store/useSearchState';
import './scss/SearchResult.scss';
import ProductFilterNav from './layout/ProductFilterNav';

//TODO 통합검색 결과 창
const SearchResult = () => {
  //
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { filtered, onSearch, onFetchItems } = useProductsStore();
  const { currentSearchQuery, setCurrentSearchQuery } = useSearchState();
  const [filterItem, setFilterItem] = useState(null);

  // 최종적으로 화면에 뿌릴 리스트 (필터 있으면 필터, 없으면 원본)
  const displayList = filterItem ?? filtered ?? [];

  //TODO 아이템 정보 셋팅
  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  //TODO 주소창의 검색어(query)가 바뀔 때마다 실행
  useEffect(() => {
    if (query) {
      // TODO 새 검색어로 상품 목록 필터링
      onSearch(query);
      // TODO 필터링에 쓴 검색어를 저장소에 "현재 검색어로 기억시킨다."
      setCurrentSearchQuery(query);
    }
  }, [query, onSearch, setCurrentSearchQuery]);

  useEffect(() => {
    console.log('filterItem 변경됨:', filterItem, displayList);
  }, [filterItem]);

  // console.log('봐봐봐', filtered);
  // console.log('부모', filterItem);
  // console.log('필터된거?', displayList);

  //TODO 화면에 보여줄 검색어: 주소창 검색어가 최우선, 없으면 기억된 검색어를 사용
  const displayQuery = query || currentSearchQuery;

  return (
    <div className="search-result-container">
      <ProductFilterNav list={filtered} query={query} onFilter={setFilterItem} />

      <div className="ProductBanner">
        <h2>
          "<span>{displayQuery || ''}</span>" 검색 결과
        </h2>
        <span>({displayList.length})</span>
      </div>

      <ul className="search-product-list">
        {displayList.map((p, i) => (
          <li className="item" key={p.i}>
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
