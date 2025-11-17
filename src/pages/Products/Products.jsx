import './scss/Products.scss';
import CousLet from '../Home/layout/CouLet';

import { categoryKorMap } from '../../store/data';
import ProductCard from './layout/ProductCard';
import { useParams } from 'react-router-dom';
import ProductList from './layout/ProductList';

const Products = () => {
  const { category1, category2, tags } = useParams();

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
      <h2>{categoryName}</h2>
      <div className="product-list-wrap">
        <ProductList />
      </div>
      <CousLet />
    </section>
  );
};

export default Products;
