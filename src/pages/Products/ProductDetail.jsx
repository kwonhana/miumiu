import React from 'react';
import Button from '../../component/layout/Button';
import './scss/ProductDetail.scss';
import { Link } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';

const ProductDetail = () => {
  // const { id } = useParams();
  const { items } = useProductsStore();

  console.log(items);

  return (
    <section className="ProductDetail-wrap">
      <div className="inner">
        <div className="ProductDetail-top">
          <div className="top-left"></div>
          <div className="top-right">
            <p className="title">
              <span className="tag">태그태그</span>
              <div className="wish-icon"></div>
            </p>
            <h3>제목제목</h3>
            <p className="price">가격</p>

            <div className="button-wrap">
              <Button title="장바구니 담기" />
              <Button title="구매하기" />
            </div>
          </div>
        </div>
        <div className="ProductDetail-bottom">
          <div className="top-nav">
            <ul>
              <li>
                <Link>제품 설명</Link>
              </li>
              <li>
                <Link>제품 상세 정보</Link>
              </li>
              <li>
                <Link>사이즈 가이드</Link>
              </li>
              <li>
                <Link>제품 세부 정보</Link>
              </li>
              <li>
                <Link>매장 찾기</Link>
              </li>
            </ul>
            <div className="button-wrap">
              <Button title="장바구니 담기" />
              <Button title="구매하기" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
