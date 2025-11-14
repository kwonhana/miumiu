import React from 'react';
import ProductBanner from './layout/ProductBanner';
import ProductDetailNav from './layout/ProductDetailNav';
import ProductFilterWrap from './layout/ProductFilterWrap';

const collection = [
  { name: '아이비' },
  { name: '솔리테르' },
  { name: '아르카디' },
  { name: '완더' },
];

const fabric = [{ fabric: '소가죽' }, { fabric: '메탈' }, { fabric: '골드' }, { fabric: '브릭스' }];

const AllProducts = () => {
  return (
    <>
      <ProductBanner />
      <ProductDetailNav />
      <ProductFilterWrap
        collection={collection.map((item) => item.name)}
        fabric={fabric.map((item) => item.fabric)}
      />
      <div></div>;
    </>
  );
};

export default AllProducts;
