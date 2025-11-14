import React, { useState } from 'react';
import Button from '../../../component/layout/Button';
import '../scss/ProductFilterWrap.scss';

const ProductFilterWrap = ({ collection, fabric }) => {
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <div className={`ProductFilterWrap ${isHidden ? 'hidden' : ''}`}>
      <div className="container">
        <div className="product-filter">
          <div className="filter-top">
            <h3>필터 및 정렬</h3>
            <button className="icon" onClick={toggleHidden}></button>
          </div>
          <div className="filter-bottom">
            <ul className="accordion-box align">
              <p>정렬기준</p>
              <li>
                <label htmlFor="">
                  <input type="checkbox" />
                  제안
                </label>
              </li>
              <li>
                <label htmlFor="">
                  <input type="checkbox" />
                  최신
                </label>
              </li>
              <li>
                <label htmlFor="">
                  <input type="checkbox" />
                  내림차순 가격
                </label>
              </li>
              <li>
                <label htmlFor="">
                  <input type="checkbox" />
                  오름차순 가격
                </label>
              </li>
            </ul>
            <ul className="accordion-box collection">
              <p>컬렉션</p>
              {collection.map((el, i) => {
                return (
                  <li key={i}>
                    <label htmlFor="">
                      <input type="checkbox" />
                      {el}
                    </label>
                  </li>
                );
              })}
            </ul>
            <ul className="accordion-box fabric">
              <p className="active"> 소재</p>
              {fabric.map((el, i) => {
                return (
                  <li key={i}>
                    <label htmlFor="">
                      <input type="checkbox" />
                      {el}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="button-wrap">
          <Button title="필터 삭제" />
          <Button title="필터 적용하기" />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterWrap;
