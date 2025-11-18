import React, { useEffect } from 'react';
import ProductBanner from './layout/ProductBanner';
import ProductFilterlNav from './layout/ProductFilterlNav';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductList from './layout/ProductList';
import './scss/Category2.scss';

const Category2 = () => {
  const { category1, category2, tags } = useParams();
  const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1 } = useProductsStore();

  useEffect(() => {
    onFetchItems();
  }, []);
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
  }, [category1, category2, tags, onFetchItems, onCateOnly, onCateTag, onCate1]);

  console.log('필터링 아이템', filtered);
  let filtercategory1 = Array.from(new Set(filtered.map((el) => el.categoryKor1)));
  console.log(filtercategory1);

  return (
    <div className="Category2">
      <ProductBanner bannerTitle={category1} korTtle={filtercategory1} />
      <ProductFilterlNav list={filtered} />

      <ProductList />
    </div>
  );
};

export default Category2;
