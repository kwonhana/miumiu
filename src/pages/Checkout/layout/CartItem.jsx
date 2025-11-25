import React from 'react';
import '../scss/CartItem.scss';

const CartItem = () => {
  return (
    <div className="CartItem">
      <div className="itemleft-Img">
        <img src="" alt="" />
      </div>
      <div className="itemRight">
        <div className="top">
          <span className="itemNO">nonononononono</span>
          <button className="icon"></button>
        </div>
        <p className="title">
          titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle
        </p>
        <div className="bottom">
          <div className="countBtn">
            <button>-</button>
            <span>1</span>
            <button>+</button>
          </div>
          <p className="price">48593485930</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
