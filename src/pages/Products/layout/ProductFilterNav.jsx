// src/pages/Products/layout/ProductFilterNav.jsx
import React from 'react';
import '../scss/ProductFilterWrap.scss';
import { Link } from 'react-router-dom';

const ProductFilterNav = ({ list, query, activeCategory, onChangeCategory, onOpenFilter }) => {
  // 🔹 검색 결과(list) 안에 있는 category1 / categoryKor1 쌍만 추출
  const catePairs = Array.from(
    new Map(
      list.map((el) => [el.category1, el.categoryKor1]) // key: code, value: label
    ).entries()
  );

  const handleClickAll = () => {
    if (!query) return;
    onChangeCategory(null); // 🔥 전체 보기
  };

  const handleClickCategory = (cateCode) => {
    if (!query) return;
    onChangeCategory(cateCode); // 🔥 해당 카테고리 선택
  };

  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          {/* 모든 룩 보기 */}
          <li>
            {!query ? (
              <Link to="/" className="link">
                모든 룩 보기
              </Link>
            ) : (
              <button
                className={`link ${!activeCategory ? 'active' : ''}`}
                type="button"
                onClick={handleClickAll}>
                모든 룩 보기
              </button>
            )}
          </li>

          {/* 검색 결과에 등장한 카테고리1 탭 */}
          {query &&
            catePairs.map(([code, label]) => (
              <li key={code}>
                <button
                  type="button"
                  className={activeCategory === code ? 'active' : ''}
                  onClick={() => handleClickCategory(code)}>
                  {label}
                </button>
              </li>
            ))}
        </ul>

        <div className="button-wrap">
          <button type="button" onClick={onOpenFilter}>
            필터 및 정렬
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNav;
