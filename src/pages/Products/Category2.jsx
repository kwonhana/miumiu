import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductList from './layout/ProductList';
import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';

const Category2 = () => {
  const { category1, category2, tags } = useParams();
  const {
    items,
    filtered,
    onFetchItems,
    onCateOnly,
    onCateTag,
    onCate1,
    onCustomStyle,
    setFiltered,
  } = useProductsStore();

  const [filterItem, setFilterItem] = useState(null);

  const displayList = filterItem ?? filtered ?? [];

  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  // CustomStudio 필터링
  useEffect(() => {
    if (category1 === 'CustomStudio' && category2) {
      onCustomStyle(category2);
      console.log("cus", filtered)
      return;
    }


    if (category1 && category2 && tags) {
      onCateOnly(category1, category2);
    } else if (category1 && tags && !category2) {
      onCateTag(category1, tags);
    } else if (category1 && category2 && !tags) {
      onCateOnly(category1, category2);
    } else if (category1 && !category2 && !tags) {
      onCate1(category1);
    }
  }, [category1, category2, tags, onFetchItems, onCateOnly, onCateTag, onCate1, onCustomStyle]);

  const filterCategory1 = Array.from(new Set(filtered.map(el => el.categoryKor1)));

  return (
    <div className="Category2">
      <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
      <ProductFilterNav list={filtered} onFilter={setFilterItem} />

      <ProductList filteredList={displayList} />
    </div>
  );
};

export default Category2;
