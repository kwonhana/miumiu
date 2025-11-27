import React, { useState } from 'react';
import '../scss/Payment.scss';
import Button from '../../../component/layout/Button';
import OrderTotal from '../OrderTotal/OrderTotal';
import { useNavigate } from 'react-router-dom';
import { useProductsStore } from '../../../store/useProductsStore';

const Payment = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('');
  const { onClearCart } = useProductsStore();

  const handleComplete = () => {
    onClearCart();
    navigate('/orderComplete');
  };

  const handleBackSum = () => {
    navigate('/orderSummary');
  };

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
              <li
                className={`payment-icon ${selectedPayment === 'kakao' ? 'active' : ''}`}
                onClick={() => setSelectedPayment('kakao')}>
                <img src="/assets/icon/kakaoPay.png" alt="카카오페이" />
                <p>카카오페이</p>
              </li>
              <li
                className={`payment-icon ${selectedPayment === 'credit' ? 'active' : ''}`}
                onClick={() => setSelectedPayment('credit')}>
                <img src="/assets/icon/creditPay.png" alt="신용카드" />
                <p>신용카드</p>
              </li>
              <li
                className={`payment-icon ${selectedPayment === 'cash' ? 'active' : ''}`}
                onClick={() => setSelectedPayment('cash')}>
                <img src="/assets/icon/cashPay.png" alt="실시간 계좌이체" />
                <p>실시간 계좌이체</p>
              </li>
            </ul>
            <div className="payment-btn">
              <Button title="이전" onClick={handleBackSum} />
              <Button title="결제진행" onClick={handleComplete} />
            </div>
          </div>
        </div>
      </div>
      <OrderTotal />
    </section>
  );
};

export default Payment;
