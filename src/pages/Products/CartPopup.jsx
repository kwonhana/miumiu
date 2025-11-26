import React from 'react';
import Button from '../../component/layout/Button';

const CartPopup = () => {
  return (
    <div className="cart-popup-wrap">
      <div className="cartpop-top">
        <h3>장바구니에 추가된 상품</h3>
      </div>
      <div className="cartpop-list">
        <ul>
          <li></li>
        </ul>
      </div>
      <div className="cartpop-bottom">
        <div className="cartpop-title"></div>
        <Button />
        <Button />
      </div>
    </div>
  );
};

export default CartPopup;
