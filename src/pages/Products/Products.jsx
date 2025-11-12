import { useProductsStore } from '../../store/useProductsStore';
import './scss/Products.scss';
import { Link, useParams } from 'react-router-dom';

const Products = () => {
  const { category1, category2 } = useParams();
  const { items } = useProductsStore();

  const filtered = items.filter((item) => {
    if (category1 && category2) {
      return item.category1 === category1 && item.category2 === category2;
    } else if (category1) {
      return item.category1 === category1;
    } else {
      return true;
    }
  });

  return (
    <section className="product-page inner">
      <h2>가방</h2>
      <div className="product-menu">
        <ul className="item-menu">
          {filtered.map((p) => (
            <li key={p.id}>
              <Link>
                <img src="" alt="" />
                <p>{p.kor}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list-wrap">
        <ul className="product-list"></ul>
      </div>
    </section>
  );
};

export default Products;
