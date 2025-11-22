// src/pages/Products/layout/ProductFilterWrap.jsx
import React, { useState } from 'react';
import Button from '../../../component/layout/Button';
import '../scss/ProductFilterWrap.scss';

const ProductFilterWrap = ({ collection, fabric, isOpen, onClose, onApplyFilter }) => {
  const [isAlignActive, setIsAlignActive] = useState(true);
  const [isCollectionActive, setIsCollectionActive] = useState(true);
  const [isFabricActive, setIsFabricActive] = useState(true);

  const [isAlignHidden, setIsAlignHidden] = useState(true);
  const [isCollectionHidden, setIsCollectionHidden] = useState(true);
  const [isFabricHidden, setIsFabricHidden] = useState(true);

  // ✅ 선택된 값
  const [selectCollection, setSelectCollection] = useState('');
  const [selectFabric, setSelectFabric] = useState('');

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

  const handleBackgroundClick = (e) => {
    if (e.target.classList.contains('ProductFilterWrap')) {
      onClose();
    }
  };

  // ✅ 필터 삭제: state 초기화 + 상위에 "필터 없음" 전달
  const handleReset = () => {
    setSelectCollection('');
    setSelectFabric('');
    if (onApplyFilter) {
      onApplyFilter({ collection: '', fabric: '' });
    }
  };

  // ✅ 필터 적용: 현재 선택값 전달
  const handleApplyFilterClick = () => {
    if (onApplyFilter) {
      onApplyFilter({
        collection: selectCollection,
        fabric: selectFabric,
      });
    }
  };

  return (
    <div className={`ProductFilterWrap ${!isOpen ? 'hidden' : ''}`} onClick={handleBackgroundClick}>
      <div className="container" onClick={(e) => e.stopPropagation()}>
        <div className="product-filter">
          <div className="filter-top">
            <h3>필터 및 정렬</h3>
            <button className="icon" onClick={onClose}></button>
          </div>
          <div className="filter-bottom ">
            {/* 정렬기준 (지금은 UI만) */}
            <p
              className={`accordion-title align ${!isAlignActive ? 'active' : ''}`}
              onClick={handleClickAlign}>
              정렬기준
            </p>
            <ul className={`${isAlignHidden ? 'hidden' : ''}`}>
              <li>
                <label htmlFor="sort-name-desc">
                  <input type="radio" id="sort-name-desc" name="sort" />
                  내림차순 이름
                </label>
              </li>
              <li>
                <label htmlFor="sort-name-asc">
                  <input type="radio" id="sort-name-asc" name="sort" />
                  오름차순 이름
                </label>
              </li>
              <li>
                <label htmlFor="sort-price-desc">
                  <input type="radio" id="sort-price-desc" name="sort" />
                  내림차순 가격
                </label>
              </li>
              <li>
                <label htmlFor="sort-price-asc">
                  <input type="radio" id="sort-price-asc" name="sort" />
                  오름차순 가격
                </label>
              </li>
            </ul>

            {/* 컬렉션 */}
            {collection && collection.length > 0 && (
              <>
                <p
                  className={`accordion-title collection ${!isCollectionActive ? 'active' : ''}`}
                  onClick={toggleCollection}>
                  컬렉션
                </p>
                <ul className={`${isCollectionHidden ? 'hidden' : ''}`}>
                  {collection.map((el, i) => {
                    const id = `collection-${i}`;
                    return (
                      <li key={i}>
                        <label htmlFor={id}>
                          <input
                            type="radio"
                            id={id}
                            name="collection"
                            value={el}
                            checked={selectCollection === el}
                            onChange={(e) => setSelectCollection(e.target.value)}
                          />
                          {el}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}

            {/* 소재 */}
            <p
              className={`accordion-title  fabric ${!isFabricActive ? 'active' : ''}`}
              onClick={toggleFabric}>
              소재
            </p>
            <ul className={`${isFabricHidden ? 'hidden' : ''}`}>
              {fabric.map((el, i) => {
                const id = `fabric-${i}`;
                return (
                  <li key={i}>
                    <label htmlFor={id}>
                      <input
                        type="radio"
                        id={id}
                        name="fabric"
                        value={el}
                        checked={selectFabric === el}
                        onChange={(e) => setSelectFabric(e.target.value)}
                      />
                      {el}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="button-wrap">
          <Button title="필터 삭제" onClick={handleReset} />
          <Button title="필터 적용하기" onClick={handleApplyFilterClick} />
        </div>
      </div>
    </div>
  );
};

export default ProductFilterWrap;
