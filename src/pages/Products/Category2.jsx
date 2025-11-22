import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { special, CustomItem } from '../../store/data';
import { useProductsStore } from '../../store/useProductsStore';
import ProductList from './layout/ProductList';
import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import './scss/Category2.scss';

const Category2 = () => {
  const { category1, category2, tags } = useParams();
  const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1, items, onCustomStyle } =
    useProductsStore();

  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  //TODO useParams에서 category2의 값을 가지고와 data의 style값과 동일한 값을 찾음
  const isCustom = CustomItem.filter((item) => item.style === category2);
  const filterItem = items.filter((item) => isCustom.some((cus) => cus.itemId === item.id));

  console.log(CustomItem, 'CustomItem');
  console.log(category2, 'category2');
  console.log(items, 'items');
  console.log(isCustom, 'isCustom');
  console.log(filterItem, 'filterItem');

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

    // 👇 CustomStudio URL인 경우 (카테고리1이 'CustomStudio'일 수 있음)
    if (category1 === 'CustomStudio' && category2) {
      onCustomStyle(category2); // "Custom" 또는 "Closet" 등
    }
  }, [category1, category2, tags, onFetchItems, onCateOnly, onCateTag, onCate1, onCustomStyle]);
  console.log('필터링 아이템', filtered);
  let filterCategory1 = Array.from(new Set(filtered.map((el) => el.categoryKor1)));
  console.log(filterCategory1);

  return (
    <div className="Category2">
      <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
      <ProductFilterNav list={filtered} />

      <ProductList />
    </div>
  );
};

export default Category2;
