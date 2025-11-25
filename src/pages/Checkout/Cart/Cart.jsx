import React from 'react';
import '../scss/Cart.scss';
import CartItem from '../layout/CartItem';
import CartTotalPrice from '../layout/CartTotalPrice';
import { useProductsStore } from '../../../store/useProductsStore';

const Cart = () => {
  const { cartCount } = useProductsStore();
  return (
    <section className="Cart">
      <div className="left-wrap">
        <div className="top">
          <h2>
            장바구니 <span>({cartCount}개 상품)</span>
          </h2>
        </div>
        <div className="cart-items">
          <CartItem />
        </div>
      </div>
      <CartTotalPrice />
    </section>
  );
};

export default Cart;
