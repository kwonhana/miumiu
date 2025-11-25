import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import { useSearchState } from '../../store/useSearchState';
import ProductFilterNav from './layout/ProductFilterNav';
import './scss/SearchResult.scss';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { filtered, onSearch, onFetchItems } = useProductsStore();
  const { currentSearchQuery, setCurrentSearchQuery } = useSearchState();
  const [filterItem, setFilterItem] = useState(null);

  const displayList = filterItem ?? filtered ?? [];
  const displayQuery = query || currentSearchQuery;

  useEffect(() => {
    onFetchItems();

  }, [onFetchItems]);

  useEffect(() => {
    if (query) {
      onSearch(query);
      setCurrentSearchQuery(query);
      setFilterItem(null);
    }
  }, [query, onSearch, setCurrentSearchQuery]);
  console.log("필터링 개수와 맞나???", displayList)
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
