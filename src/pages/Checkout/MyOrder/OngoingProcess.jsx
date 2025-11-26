import React from 'react';
import './scss/OngoingProcess.scss';

const OngoingProcess = () => {
  return (
    <div className="ongoingProcess">
      <div className="payment-status">
        <p>결제완료</p>
        <span>1</span>
      </div>
      <div className="next-icon"></div>

      <div className="delivery-prepare">
        <p>배송 준비 중</p>
        <span>0</span>
      </div>
      <div className="next-icon"></div>

      <div className="delivery-status">
        <p>배송 중</p>
        <span>0</span>
      </div>
      <div className="next-icon"></div>

      <div className="delivery-completed">
        <p>배송 완료</p>
        <span>1</span>
      </div>
    </div>
  );
};

export default OngoingProcess;
