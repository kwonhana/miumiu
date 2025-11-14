import React, { useState } from 'react';
import Button from '../../../component/layout/Button';
import '../scss/ProductFilterWrap.scss';

const ProductFilterWrap = ({ collection, fabric }) => {
  const [isHidden, setIsHidden] = useState(false);

  const [isAlignActive, setIsAlignActive] = useState(true);
  const [isCollectionActive, setIsCollectionActive] = useState(true);
  const [isFabricActive, setIsFabricActive] = useState(true);

  const [isAlignHidden, setIsAlignHidden] = useState(true);
  const [isCollectionHidden, setIsCollectionHidden] = useState(true);
  const [isFabricHidden, setIsFabricHidden] = useState(true);

  const toggleHidden = () => {
    setIsHidden((prev) => !prev);
  };

  const handleClickAlign = () => {
    setIsAlignActive((prev) => !prev);
    setIsAlignHidden((prev) => !prev);
  };

  const toggleCollection = () => {
    setIsCollectionActive((prev) => !prev);
    setIsCollectionHidden((prev) => !prev);
  };

  const toggleFabric = () => {
    setIsFabricActive((prev) => !prev);
    setIsFabricHidden((prev) => !prev);
  };

  return (
    <div className={`ProductFilterWrap ${isHidden ? 'hidden' : ''}`}>
      <div className="container">
        <div className="product-filter">
          <div className="filter-top">
            <h3>필터 및 정렬</h3>
            <button className="icon" onClick={toggleHidden}></button>
          </div>
          <div className="filter-bottom ">
            <p
              className={`accordion-title align ${isAlignActive ? 'active' : ''}`}
              onClick={handleClickAlign}>
              정렬기준
            </p>
            <ul className={`${isAlignHidden ? 'hidden' : ''}`}>
              <li>
                <label htmlFor="sort-latest">
                  <input type="checkbox" id="sort-latest" />
                  최신
                </label>
              </li>
              <li>
                <label htmlFor="sort-price-desc">
                  <input type="checkbox" id="sort-price-desc" />
                  내림차순 가격
                </label>
              </li>
              <li>
                <label htmlFor="sort-price-asc">
                  <input type="checkbox" id="sort-price-asc" />
                  오름차순 가격
                </label>
              </li>
            </ul>
            <p
              className={`accordion-title collection ${isCollectionActive ? 'active' : ''}`}
              onClick={toggleCollection}>
              컬렉션
            </p>
            <ul className={`${isCollectionHidden ? 'hidden' : ''}`}>
              {collection.map((el, i) => {
                const id = `collection-${i}`;
                return (
                  <li key={i}>
                    <label htmlFor={id}>
                      <input type="checkbox" id={id} />
                      {el}
                    </label>
                  </li>
                );
              })}
            </ul>
            <p
              className={`accordion-title  fabric ${isFabricActive ? 'active' : ''}`}
              onClick={toggleFabric}>
              소재
            </p>
            <ul className={`${isFabricHidden ? 'hidden' : ''}`}>
              {fabric.map((el, i) => {
                const id = `fabric-${i}`;
                return (
                  <li key={i}>
                    <label htmlFor={id}>
                      <input type="checkbox" id={id} />
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
