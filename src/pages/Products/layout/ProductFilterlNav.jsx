import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../component/layout/Button';
import '../scss/ProductNav.scss';

const ProductFilterlNav = () => {
  return (
    <div className="ProductNav">
      <div className="nav-inner">
        <ul>
          <li>
            <Link className="link">모든 룩 보기</Link>
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

export default ProductFilterlNav;
