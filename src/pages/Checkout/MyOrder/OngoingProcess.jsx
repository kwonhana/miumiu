import React, { useEffect, useState } from 'react';
import './scss/OngoingProcess.scss';

// 결제시간 기준으로 상태 계산하는 함수
const getOrderStatusByTime = (paymentTime) => {
  if (!paymentTime) return '결제완료';

  const now = new Date();
  const payTime = new Date(paymentTime);
  const diff = (now - payTime) / 1000; // 초 단위 차이

  const minutes = diff / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  // 👉 여기 구간은 너가 원하는대로 바꿔도 됨
  if (minutes < 10) return '결제완료';
  if (hours < 2) return '배송 준비 중';
  if (hours < 48) return '배송 중';
  return '배송 완료';
};

const OngoingProcess = ({ paymentTime, counts }) => {
  const [status, setStatus] = useState('결제완료');
  const { payment, prepare, delivering, delivered } = counts || {};

  useEffect(() => {
    // 처음 진입 시 상태 계산
    setStatus(getOrderStatusByTime(paymentTime));

    // 1분마다 상태 재계산
    const interval = setInterval(() => {
      setStatus(getOrderStatusByTime(paymentTime));
    }, 60000);

    return () => clearInterval(interval);
  }, [paymentTime]);

  return (
    <div className="ongoingProcess">
      <div className={`payment-status ${status === '결제완료' ? 'active' : ''}`}>
        <p>결제완료</p>
        <span>{payment ?? 0}</span>
      </div>
      <div className="next-icon"></div>

      <div className={`delivery-prepare ${status === '배송 준비 중' ? 'active' : ''}`}>
        <p>배송 준비 중</p>
        <span>{prepare ?? 0}</span>
      </div>
      <div className="next-icon"></div>

      <div className={`delivery-status ${status === '배송 중' ? 'active' : ''}`}>
        <p>배송 중</p>
        <span>{delivering ?? 0}</span>
      </div>
      <div className="next-icon"></div>

      <div className={`delivery-completed ${status === '배송 완료' ? 'active' : ''}`}>
        <p>배송 완료</p>
        <span>{delivered ?? 0}</span>
      </div>
    </div>
  );
};

export default OngoingProcess;
