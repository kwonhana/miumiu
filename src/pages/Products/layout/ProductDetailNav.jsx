import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../component/layout/Button';
import '../scss/ProductNav.scss';

const ProductDetailNav = () => {
  return (
    <div className="ProductNav">
      <div className="nav-inner">
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
    </div>
  );
};

export default ProductDetailNav;
