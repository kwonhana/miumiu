import React from 'react';
import Button from '../../component/layout/Button';
import './scss/ProductDetail.scss';
import { Link } from 'react-router-dom';
import { useProductsStore } from '../../store/useProductsStore';

const ProductDetail = ({ id }) => {
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
                <Link className="link">제품 설명</Link>
              </li>
              <li>
                <Link className="link">제품 상세 정보</Link>
              </li>
              <li>
                <Link className="link">사이즈 가이드</Link>
              </li>
              <li>
                <Link className="link">제품 세부 정보</Link>
              </li>
              <li>
                <Link className="link">매장 찾기</Link>
              </li>
            </ul>
            <div className="button-wrap">
              <Button title="장바구니 담기" />
              <Button title="구매하기" />
            </div>
          </div>
          <div className="product-info">
            <div className="image1"></div>
            <div className="image2"></div>
            <div className="image3"></div>
            <div className="image4"></div>
            <div className="image5"></div>
            <div className="image6"></div>
            <div className="image7"></div>
            <div className="image8"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
