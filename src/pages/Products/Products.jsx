import { useProductsStore } from '../../store/useProductsStore';
import { Link, useParams } from 'react-router-dom';
import './scss/Products.scss';

const Products = () => {
  const { category1, category2, tags } = useParams();
  const { items } = useProductsStore();

  const filtered = items.filter((item) => {
    if (category1 && category2 && tags) {
      return item.category1 === category1 && item.category2 === category2 && item.tags === tags;
    } else if (category1 && category2) {
      return item.category1 === category1 && item.category2 === category2;
    } else if (category1 && tags) {
      return item.category1 === category1 && item.tags === tags;
    } else if (category1) {
      return item.category1 === category1;
    } else if (tags) {
      return item.tags === tags;
    } else {
      return true;
    }
  });

  console.log(filtered, '보오자');

  return (
    <section className="product-page inner">
      <h2>{filtered[0].kor}</h2>
      <div className="product-menu">
        <ul className="item-menu"></ul>
      </div>
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
    </section>
  );
};

export default Products;
