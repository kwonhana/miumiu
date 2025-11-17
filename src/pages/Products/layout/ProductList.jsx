import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductsStore } from '../../../store/useProductsStore';

const ProductList = () => {
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
  console.log('상품이미지?', filtered);

  return (
    <ul className="product-list">
      {filtered.map((p) => (
        <li className="item" key={p.id}>
          <Link to={`/product/${p.id}`}>
            <img src={`/assets/images/detail/${p.local_detail_images[0]}`} alt={p.name} />
            <div className="product-text-box">
              <h3>{p.name}</h3>
              <p>{p.price}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
