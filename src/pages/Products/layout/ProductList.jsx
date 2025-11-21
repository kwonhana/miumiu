import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductsStore } from '../../../store/useProductsStore';
import '../scss/ProductList.scss';
import AdProduct from './AdProduct';

const ProductList = () => {
  const { category1, category2, tags } = useParams();
  const { filtered, onFetchItems, onCateOnly, onCateTag, onCate1 } = useProductsStore();

  useEffect(() => {
    onFetchItems();
  }, [onFetchItems]);

  useEffect(() => {
    if (category1 && category2 && tags) {
      onCateOnly(category1, category2);
    } else if (category1 && tags && !category2) {
      onCateTag(category1, tags);
    } else if (category1 && category2 && !tags) {
      onCateOnly(category1, category2);
    } else if (category1 && !category2 && !tags) {
      onCate1(category1);
    }
  }, [category1, category2, tags]);
  console.log('상품이미지?', filtered);
  const showAd = category1 && category2;

  return (
    <ul className="product-list">
      {filtered.map((p, index) => (
        <React.Fragment key={index}>
          <li className="item" key={p.id}>
            <Link to={`/product/${p.id}`}>
              <img
                src={
                  p.local_detail_images?.[0]
                    ? `/assets/images/detail/${p.local_detail_images[0]}`
                    : '/assets/images/default-product-image.png'
                }
                alt={p.name}
              />
              <div className="product-text-box">
                <h3>{p.name}</h3>
                <p>{p.price}</p>
              </div>
            </Link>
          </li>
          {/* {!showAd && index === 6 && <AdProduct startIndex={0} />}  */}
          {/* {!showAd && index === 18 && <AdProduct startIndex={2} />} */}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default ProductList;
