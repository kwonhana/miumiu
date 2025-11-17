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
  const { filtered, onFecthItems, onCategorys, onCateOnly, onCateTag } = useProductsStore();

  useEffect(() => {
    onFecthItems(); // 상품 불러오기
  }, []);

  //TODO 기능1. 카테고리 상황 체크하기 (카테고리 1인지, 2인지, 태그인지,)
  //TODO 기능2. URL의 파라미터(category1, category2, tags)가 변경될 때마다 실행되는 필터링 로직
  useEffect(() => {
    // 1. 조건에 따라 필터링
    if (category1 && !category2 && !tags) {
      onCategorys(category1, null, null);
      console.log('카테고리1만 있음');
    } else if (category1 && category2 && !tags) {
      onCategorys(category1, category2, null);
      console.log('카테고리1, 2 있음');
    } else if (category1 && tags && !category2) {
      onCategorys(category1, null, tags);
      console.log('카테고리1과 태그 있음');
    } else {
      onCategorys(category1, category2, tags);
      console.log('기타 조합 또는 없음');
    }

    // 2. 기타 필터도 함께 실행
    onCateOnly(category1, category2);
    onCateTag(category2, tags);
  }, [category1, category2, tags]);

  //TODO 카테고리 한글 이름 찾기
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
        <ProductList />
      </div>
      <CousLet />
    </section>
  );
};

export default Products;
