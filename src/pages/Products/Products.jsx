import React, { useEffect } from 'react';
import './scss/Products.scss';
import '../../App.scss';
import { useProductsStore } from '../../store/useProductsStore';

const Products = ({ category }) => {
  const { onFecthItems, onItemCategory } = useProductsStore();

  let catelist = onItemCategory(category);
  useEffect(() => {
    if (onFecthItems.length === 0) onFecthItems();
  }, []);

  return (
    <section className="product-page">
      <h2></h2>
      <div className="product-menu">
        <ul className="item-menu">
          {catelist.map((item) => (
            <li key={item.id}>{item.detail_images}</li>
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

export default Products;
