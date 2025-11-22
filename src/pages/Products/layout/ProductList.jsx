// src/pages/Products/layout/ProductList.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductsStore } from '../../../store/useProductsStore';
import '../scss/ProductList.scss';
import AdProduct from './AdProduct';

const ProductList = ({ filteredList }) => {
  const { filtered, onFetchItems } = useProductsStore();

  // 첫 로딩 시 상품 불러오기
  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  const displayList = filteredList || filtered || [];

  return (
    <ul className="product-list">
      {displayList.map((p, index) => (
        <React.Fragment key={p.id ?? index}>
          <li className="item">
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
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ProductList;
