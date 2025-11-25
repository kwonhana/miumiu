import React from 'react';
import '../scss/Cart.scss';
import CartItem from '../layout/CartItem';
import Button from '../../../component/layout/Button';
import CartTotalPrice from '../layout/CartTotalPrice';

const Cart = () => {
  return (
    <section className="Cart">
      <div className="left-wrap">
        <div className="top">
          <h2>
            장바구니 <span>(3개 상품)</span>
          </h2>
        </div>
        <div className="cart-items">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>
      <CartTotalPrice />
    </section>
  );
};

export default Cart;
