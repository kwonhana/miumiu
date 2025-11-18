import './scss/Products.scss';
import CousLet from '../Home/layout/CouLet';
import { categoryKorMap } from '../../store/data';
import ProductBanner from './layout/ProductBanner';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';
import ProductList from './layout/ProductList';

const Products = () => {
  const { category1, category2, tags } = useParams();
  const { onFecthItems, onCateOnly, onCateTag, onCate1 } = useProductsStore();

  useEffect(() => {
    onFecthItems(); // 상품 불러오기
  }, []);

  useEffect(() => {
    // category1 + category2 + tags 모두 있는 경우
    if (category1 && category2 && tags) {
      onCateOnly(category1, category2);
      // category1 + category2만 필터링
    }
    // category1 + tags만 있는 경우 (category2 없음)
    else if (category1 && tags && !category2) {
      onCateTag(category1, tags);
    }
    // category1 + category2만 있는 경우
    else if (category1 && category2 && !tags) {
      onCateOnly(category1, category2);
    }
    // category1만 있는 경우
    else if (category1 && !category2 && !tags) {
      onCate1(category1);
    }
  }, [category1, category2, tags, onFecthItems, onCateOnly, onCateTag, onCate1]);

  const categoryName =
    categoryKorMap.find(
      (c) =>
        (c.eng || '').toLowerCase() === (category1 || '').toLowerCase() ||
        (c.eng || '').toLowerCase() === (tags || '').toLowerCase()
    )?.kor ||
    category1 ||
    tags;

  return (
    <section className="product-page">
      <ProductBanner bannerTitle={categoryName} />
      <div className="product-list-wrap">
        <h2>{categoryName}</h2>
        <ProductList />
      </div>
      <CousLet />
    </section>
  );
};

export default Products;
