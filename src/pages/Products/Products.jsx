import { useProductsStore } from '../../store/useProductsStore';
import { Link, useParams } from 'react-router-dom';
import './scss/Products.scss';
import CousLet from '../Home/layout/CouLet';
import { useEffect } from 'react';
import './scss/ProductBanner.scss';

const Products = () => {
  const { category1, category2, tags } = useParams();

  const { filtered, onFecthItems, onCategorys } = useProductsStore();

  useEffect(() => {
    onFecthItems(); // 상품 불러오기
  }, []);

  useEffect(() => {
    onCategorys(category1, category2, tags); // URL 변경 → 필터링 실행
  }, [category1, category2, tags]);

  return (
    <section className="product-page inner">
      <h2></h2>
      <div className="product-list-wrap">
        <ul className="product-list">
          {filtered.map((p) => (
            <li className="item" key={p.id}>
              <Link to={`/product/${p.id}`}>
                <img
                  src={p.detail_images?.find((img) => img.type === 'thumbnail')?.url}
                  alt={p.name}
                />
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
