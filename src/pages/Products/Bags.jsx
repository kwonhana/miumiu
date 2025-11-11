import React, { useEffect } from 'react';
import { useProductsStore } from '../../store/useProductsStore';
import './scss/Products.scss';

const Bags = ({ category }) => {
  const { items, onFecthItems, onItemCategory } = useProductsStore();

  useEffect(() => {
    if (items.length === 0) onFecthItems();
  }, [items]);

  let cateList = onItemCategory(category);

  return (
    <section className="product-page">
      <h2>가방</h2>
      <div className="product-menu">
        <ul className="item-menu">
          {cateList.map((item) => (
            <li key={item.id}>
              <img src={`./assets/images/detail/${item.local_detail_images[0]}`} alt={item.name} />
            </li>
          ))}
        </ul>
      </div>
      <div className="product-list-wrap">
        <ul className="product-list">
          <li></li>
        </ul>
      </div>
    </section>
  );
};

export default Bags;
