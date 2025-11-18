import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import { useSearchState } from '../../api/useSearchState';
import './scss/Products.scss';

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const { filtered, onSearch, onFecthItems } = useProductsStore();
  const { currentSearchQuery, setCurrentSearchQuery } = useSearchState();

  useEffect(() => {
    onFecthItems();
  }, [onFecthItems]);
  useEffect(() => {
    if (query) {
      onSearch(query);
      setCurrentSearchQuery(query);
    }
  }, [query, onSearch, setCurrentSearchQuery]);

  const displayQuery = query || currentSearchQuery;

  return (
    <div className="search-result-container">
      <div className="ProductBanner">
        <h2>"{displayQuery || ''}"검색 결과</h2>
        <span>{filtered.length}개의 상품</span>
      </div>
      <ul className="product-list">
        {filtered.map((p) => (
          <li className="item" key={p.id}>
            <Link to={`/product/${p.id}`}>
              <img
                src={
                  p.local_detail_images?.[0]
                    ? `/assets/images/detail/${p.local_detail_images[0]}`
                    : p.detail_images?.[0]?.url || '/assets/images/default-product-image.png'
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
