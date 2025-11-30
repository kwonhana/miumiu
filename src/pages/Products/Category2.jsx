import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductList from './layout/ProductList';
import ProductBanner from './layout/ProductBanner';
import ProductFilterNav from './layout/ProductFilterNav';
import './scss/Category2.scss';
import ProductFilterWrap from './layout/ProductFilterWrap';

const Category2 = () => {
  const { category1, category2, tags } = useParams();
  const { items, filtered, onFetchItems, onCateOnly, onCateTag, onCate1, onCustomStyle } =
    useProductsStore();

  const [extraFilteredList, setExtraFilteredList] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // 🔥 부모가 들고 있는 필터 상태
  const [filterState, setFilterState] = useState({
    collection: '',
    fabric: '',
    sort: '',
  });

  // 상품 가져오기
  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  // 카테고리 필터링
  useEffect(() => {
    if (category1 === 'CustomStudio' && category2) {
      onCustomStyle(category2);
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
  }, [category1, category2, tags, onCateOnly, onCateTag, onCate1, onCustomStyle]);

  const handleFilterChange = (result) => {
    if (!result || result.length === 0) {
      setExtraFilteredList(null);
    } else {
      setExtraFilteredList(result);
    }
  };

  const handleOpenFilter = () => setIsFilterOpen(true);
  const handleCloseFilter = () => setIsFilterOpen(false);

  // 🔥 필터 적용 (부모 상태 저장 + 리스트 필터링)
  const handleApplyFilter = (filters) => {
    setFilterState(filters); // 선택된 필터 기억

    let result = filtered;

    if (filters.collection) {
      result = result.filter((item) => item.tags === filters.collection);
    }

    if (filters.fabric) {
      result = result.filter((item) => {
        if (!item.material) return false;
        const cleanMaterial = item.material.replace(/^주\s*소재:\s*/g, '').trim();
        return cleanMaterial === filters.fabric;
      });
    }

    // 정렬
    if (filters.sort) {
      const copy = [...result];
      if (filters.sort === 'name-asc') copy.sort((a, b) => a.name.localeCompare(b.name));
      if (filters.sort === 'name-desc') copy.sort((a, b) => b.name.localeCompare(a.name));
      if (filters.sort === 'price-asc') copy.sort((a, b) => parseInt(a.price) - parseInt(b.price));
      if (filters.sort === 'price-desc') copy.sort((a, b) => parseInt(b.price) - parseInt(a.price));
      result = copy;
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
          return item.material.replace(/^주\s*소재:\s*/g, '').trim();
        })
        .filter(Boolean)
    )
  );

  const filterCategory1 = Array.from(new Set(filtered.map((el) => el.categoryKor1)));

  return (
    <div className="Category2">
      <ProductBanner bannerTitle={category1} korTitle={filterCategory1} />
      <ProductFilterNav
        list={filtered}
        query={false}
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
        selectedFilter={filterState} // ⭐ 여기 꼭 추가
      />
    </div>
  );
};

export default Category2;
