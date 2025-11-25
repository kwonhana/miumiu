// src/pages/Products/layout/ProductFilterNav.jsx
import React, { useState } from 'react';
import '../scss/ProductFilterWrap.scss';
import { Link } from 'react-router-dom';

const ProductFilterNav = ({ list, query, onFilter, onOpenFilter }) => {
  const cate = Array.from(new Set(list.map((el) => el.category1)));
  const cateKor = Array.from(new Set(list.map((el) => el.categoryKor1)));

  const cateObj = Array.from(
    new Map(
      list.map((el) => {
        const key = `${el.categoryKor2}-${el.category1}-${el.category2}`;
        return [
          key,
          {
            kor1: el.categoryKor1,
            kor2: el.categoryKor2,
            cate: el.category1,
            cate2: el.category2,
          },
        ];
      })
    ).values()
  );

  const handleFilter = (id) => {
    const filterItem = list.filter((item) => item.categoryKor1 === id);
    if (query && onFilter) onFilter(filterItem);
  };

  const handleShowAll = () => {
    if (query && onFilter) onFilter(list);
  };

  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          <li>
            {!query ? (
              <Link to={`/${cate}/`} className="link">
                모든 룩 보기
              </Link>
            ) : (
              <button className="link" onClick={handleShowAll}>
                모든 룩 보기
              </button>
            )}
          </li>

          {!query
            ? cateObj.map((el, i) => (
                <li key={i}>
                  <Link to={`/${el.cate}/${el.cate2}`} className="link">
                    {el.kor2}
                  </Link>
                </li>
              ))
            : cateKor.map((c, id) => (
                <li key={id}>
                  <button type="button" onClick={() => handleFilter(c)}>
                    {c}
                  </button>
                </li>
              ))}
        </ul>

        <div className="button-wrap">
          {/* ✅ 여기서 필터 랩 열기 */}
          <button
            type="button"
            onClick={() => {
              if (onOpenFilter) onOpenFilter();
            }}>
            필터 및 정렬
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNav;
