import React from 'react';
import '../scss/Payment.scss';
import Button from '../../../component/layout/Button';
import OrderTotal from '../OrderTotal/OrderTotal';

const Payment = () => {
  return (
    <section className="Payment-wrap">
      <div className="payment-left">
        <div className="payment-top">
          <p>결제 방법을 선택해 주세요.</p>
          <ul>
            <li>1. 주문서 작성 </li>
            <li>&nbsp; &gt;&nbsp; 2. 배송정보</li>
            <li>&nbsp; &gt;&nbsp; 3. 결제하기 </li>
          </ul>
        </div>
        <div className="select-payment">
          <h4>결제수단 선택</h4>
          <div className="payment-box">
            <ul className="payment-list">
              <li className="payment-icon">
                <p>
                  <img src="/assets/icon/kakaoPay.png" alt="" />
                </p>
                <p>카카오페이</p>
              </li>
              <li className="payment-icon">
                <p>
                  <img src="/assets/icon/creditPay.png" alt="" />
                </p>
                <p>신용카드</p>
              </li>
              <li className="payment-icon">
                <p>
                  <img src="/assets/icon/cashPay.png" alt="" />
                </p>
                <p>실시간 계좌이체</p>
              </li>
            </ul>
            <Button title="확인 및 결제진행" />
          </div>
        </div>
      </div>
      <OrderTotal />
    </section>
  );
};

export default Payment;
