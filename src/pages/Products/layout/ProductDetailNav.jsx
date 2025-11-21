import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../component/layout/Button';
import '../scss/ProductNav.scss';

const ProductDetailNav = ({ onScroll }) => {
  const handleNavClick = (e, targetId) => {
    e.preventDefault();

    if (onScroll) {
      onScroll(targetId);
    }
  };
  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          <li>
            <Link
              className="link"
              to="#detail-info"
              onClick={(e) => handleNavClick(e, 'detail-info')}>
              제품 상세 정보
            </Link>
          </li>
          <li>
            <Link className="link" To="#info-text" onClick={(e) => handleNavClick(e, 'info-text')}>
              제품 설명
            </Link>
          </li>
          <li>
            <Link
              className="link "
              TO="#product-size"
              onClick={(e) => handleNavClick(e, 'product-size')}>
              제품 세부 정보
            </Link>
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
