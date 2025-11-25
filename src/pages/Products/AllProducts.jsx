// src/pages/Products/AllProducts.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import ProductList from './layout/ProductList';
import { useProductsStore } from '../../store/useProductsStore';

const AllProducts = () => {
  const { category1, category2, tags } = useParams();

  const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1 } = useProductsStore();

  const [extraFilteredList, setExtraFilteredList] = useState(null);

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

  // 최종으로 화면에 뿌릴 리스트
  const displayList = extraFilteredList || baseList;

  return (
    <>
      <ProductBanner />
      <ProductFilterNav list={baseList} onFilterChange={handleFilterChange} />
      <ProductList filteredList={displayList} />
    </>
  );
};

export default AllProducts;
