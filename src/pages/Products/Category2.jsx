import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductList from './layout/ProductList';
import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import './scss/Category2.scss';
import ProductFilterWrap from './layout/ProductFilterWrap';
import ProductListSkeleton from './layout/ProductListSkeleton';

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

  const [extraFilteredList, setExtraFilteredList] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  // CustomStudio 필터링
  useEffect(() => {
    if (category1 === 'CustomStudio' && category2) {
      onCustomStyle(category2);
      console.log('cus', filtered);
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
  console.log('필터링 아이템', filtered);

  const handleFilterChange = (result) => {
    if (!result || result.length === 0) {
      setExtraFilteredList(null);
    } else {
      setExtraFilteredList(result);
    }
  };

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleApplyFilter = (filters) => {
    let result = filtered;

    if (filters.collection) {
      result = result.filter((item) => item.tags === filters.collection);
    }

    if (filters.fabric) {
      result = result.filter((item) => {
        if (!item.material) return false;
        // "주 소재: 송아지 가죽" → "송아지 가죽"으로 변환해서 비교
        const cleanMaterial = item.material.replace(/^주\s*소재:\s*/g, '').trim();
        return cleanMaterial === filters.fabric;
      });
    }

    setExtraFilteredList(result);
    setIsFilterOpen(false);
  };

  const displayList = extraFilteredList || filtered;
  const collectionArray = Array.from(new Set(filtered.map((item) => item.tags).filter(Boolean)));
  const fabricArray = Array.from(
    new Set(
      filtered
        .map((item) => {
          if (!item.material) return null;
          // "주 소재: 송아지 가죽" → "송아지 가죽"
          return item.material.replace(/^주\s*소재:\s*/g, '').trim();
        })
        .filter(Boolean)
    )
  );

  let filterCategory1 = Array.from(new Set(filtered.map((el) => el.categoryKor1)));
  console.log(filterCategory1);

  return (
    <div className="Category2">
      <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
      <ProductFilterNav
        list={filtered}
        query={false}
        onFilter={handleFilterChange}
        onOpenFilter={handleOpenFilter}
      />

      {!items ? <ProductListSkeleton /> : <ProductList filteredList={displayList} />}

      <ProductFilterWrap
        collection={collectionArray}
        fabric={fabricArray}
        isOpen={isFilterOpen}
        onClose={handleCloseFilter}
        onApplyFilter={handleApplyFilter}
      />
    </div>
  );
};

export default Category2;
