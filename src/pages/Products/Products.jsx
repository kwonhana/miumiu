import { useProductsStore } from '../../store/useProductsStore';
import { Link, useParams } from 'react-router-dom';
import './scss/Products.scss';
import CousLet from '../Home/layout/CouLet';
import { useEffect } from 'react';
import { categoryKorMap } from '../../store/data';
import ProductCard from './layout/ProductCard';

const Products = () => {
  const { category1, category2, tags } = useParams();

  const { filtered, onFecthItems, onCategorys, onCateOnly, onCateTag } = useProductsStore();

  useEffect(() => {
    onFecthItems(); // 상품 불러오기
  }, []);

  useEffect(() => {
    onCategorys(category1, category2, tags); // URL 변경 → 필터링 실행
    onCateOnly(category1, category2);
    onCateTag(category2, tags);
  }, [category1, category2, tags]);

  const categoryName =
    categoryKorMap.find(
      (c) =>
        (c.eng || '').toLowerCase() === (category1 || '').toLowerCase() ||
        (c.eng || '').toLowerCase() === (tags || '').toLowerCase()
    )?.kor ||
    category1 ||
    tags;

  return (
    <section className="product-page inner">
      <h2>{categoryName}</h2>
      <div className="product-list-wrap">
        <ul className="product-list">
          {filtered.map((p) => (
            <li className="item" key={p.id}>
              <Link to={`/product/${p.id}`}>
                <ProductCard product={p} />
                <div className="product-text-box">
                  <h3>{p.name}</h3>
                  <p>{p.price}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <CousLet />
    </section>
  );
};

export default Products;
