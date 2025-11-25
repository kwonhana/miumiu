// src/pages/Products/AllProducts.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import ProductList from './layout/ProductList';
import ProductFilterWrap from './layout/ProductFilterWrap';
import { useProductsStore } from '../../store/useProductsStore';

const AllProducts = () => {
  const { category1, category2, tags } = useParams();

  const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1 } = useProductsStore();

  const [extraFilteredList, setExtraFilteredList] = useState(null);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 전체 상품 가져오기
  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  // URL 기준으로 1차 카테고리/2차 카테고리 필터
  useEffect(() => {
    if (category1 && category2 && tags) {
      onCateOnly(category1, category2);
    } else if (category1 && tags && !category2) {
      onCateTag(category1, tags);
    } else if (category1 && category2 && !tags) {
      onCateOnly(category1, category2);
    } else if (category1 && !category2 && !tags) {
      onCate1(category1);
    }
  }, [category1, category2, tags, onCateOnly, onCateTag, onCate1]);

  const baseList = filtered || [];

  const handleFilterChange = (result) => {
    if (!result || result.length === 0) {
      setExtraFilteredList(null);
    } else {
      setExtraFilteredList(result);
    }
  };
  const handleOpenFilter = () => {
    console.log(' handleOpenFilter 실행됨!');
    setIsFilterOpen(true);
  };

  // 필터창 닫기
  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  // 필터 적용 (컬렉션, 소재)
  const handleApplyFilter = (filters) => {
    let result = baseList;

    if (filters.collection) {
      result = result.filter((item) => item.collection === filters.collection);
    }

    if (filters.fabric) {
      result = result.filter((item) => item.fabric === filters.fabric);
    }

    setExtraFilteredList(result);
    setIsFilterOpen(false); // 필터 적용 후 창 닫기
  };

  // 최종으로 화면에 뿌릴 리스트
  const displayList = extraFilteredList || baseList;
  console.log('isFilterOpen', isFilterOpen);

  // collection, fabric 배열 추출 (baseList에서)
  const collectionArray = Array.from(
    new Set(baseList.map((item) => item.collection).filter(Boolean))
  );
  const fabricArray = Array.from(new Set(baseList.map((item) => item.fabric).filter(Boolean)));

  return (
    <>
      {console.log(' AllProducts 렌더링!')}
      <ProductBanner />
      <ProductFilterNav
        list={baseList}
        query={true}
        onFilter={handleFilterChange}
        onOpenFilter={handleOpenFilter}
      />
      <ProductList filteredList={displayList} />

      <ProductFilterWrap
        collection={collectionArray}
        fabric={fabricArray}
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilter={handleApplyFilter}
      />
    </>
  );
};

export default AllProducts;
