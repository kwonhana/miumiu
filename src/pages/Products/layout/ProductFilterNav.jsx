import React, { useState } from 'react';
import '../scss/ProductFilterWrap.scss';
import { Link } from 'react-router-dom';

const ProductFilterNav = ({ list, query, onFilter }) => {
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

  console.log(cateObj, cate, query);
  const handleFilter = (id) => {
    console.log(id);
    const filterItem = list.filter((list) => list.categoryKor1 === id);
    console.log('원본', list);
    console.log('자식', filterItem);
    if (query) onFilter(filterItem);
  };

  const handleShowAll = () => {
    if (query) {
      onFilter(list);
    }
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
              // 🚀 query가 true일 때 (검색 결과 페이지): Button 사용
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
                  <button onClick={() => handleFilter(c)}>{c}</button>
                </li>
              ))}
        </ul>

        <div className="button-wrap">
          <button>필터 및 정렬</button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterNav;
