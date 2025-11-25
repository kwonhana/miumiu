import React, { useEffect, useState } from 'react';
import Button from '../../../component/layout/Button';
import '../scss/OrderSummary.scss';

const OrderSummary = () => {
  const [activeTab, setActiveTab] = useState('delivery');

  const [shippingData, setShippingData] = useState(null);

  useEffect(() => {
    const pull = localStorage.getItem('shippingData');
    if (pull) {
      const data = JSON.parse(pull);
      setShippingData(data);
      setActiveTab(data.activeTab);
    }
  }, []);

  console.log(shippingData);
  return (
    <section className="OrderSummary-wrap">
      <div className="summary-left">
        <div className="summary-top">
          <p>수령정보를 확인하고 결제를 진행해 주세요.</p>
          <ul>
            <li>1. 주문서 작성 </li>
            <li>&nbsp; &gt;&nbsp; 2. 배송정보</li>
            <li>&nbsp; &gt;&nbsp; 3. 결제하기 </li>
          </ul>
        </div>
        <div className="tab-menu">
          <button
            type="button"
            className={activeTab === 'delivery' ? 'active' : ''}
            onClick={() => setActiveTab('delivery')}>
            주소지로 배송
          </button>
          <button
            type="button"
            className={activeTab === 'store' ? 'active' : ''}
            onClick={() => setActiveTab('store')}>
            매장에서 수령
          </button>
        </div>
        <div className={activeTab === 'delivery' ? '' : 'hidden'}>
          <h4>구매자 정보</h4>
          {shippingData && (
            <ul>
              <li>
                {shippingData.lastName} {shippingData.name}
              </li>
              <li>
                {shippingData.countryNum} {shippingData.phone}
              </li>
              <li>{shippingData.email}</li>
            </ul>
          )}
        </div>
        <div className={activeTab === 'delivery' ? '' : 'hidden'}>
          <h4>배송 주소</h4>
          {shippingData && (
            <ul>
              <li>{shippingData.country}</li>
              <li>{shippingData.address}</li>
              <li>{shippingData.detailAddress}</li>
            </ul>
          )}
        </div>
        <div className={activeTab === 'delivery' ? '' : 'hidden'}>
          <h4>배송 방법</h4>
          {shippingData && (
            <ul>
              <li>{shippingData.date}</li>
            </ul>
          )}
        </div>
        <div className={activeTab === 'store' ? '' : 'hidden'}>
          <h4>픽업매장</h4>
          {shippingData && (
            <ul>
              <li>{shippingData.selectedStore}</li>
            </ul>
          )}
        </div>
        <div className={activeTab === 'store' ? '' : 'hidden'}>
          <h4>청구서 발송 정보</h4>
          {shippingData && (
            <ul>
              <li>
                {shippingData.lastName} {shippingData.name}
              </li>
              <li>{shippingData.address}</li>
              <li>{shippingData.detailAddress}</li>
              <li>
                {shippingData.countryNum} {shippingData.phone}
              </li>
              <li>{shippingData.email}</li>
            </ul>
          )}
        </div>

        <div className="selectedItem">
          {/* 장바구니나 상세제품에서 바로 넘어온 상품 보여주기 */}
        </div>
        <div className="letter-input">
          <h4>카드 메세지 입력</h4>
          <p>미우미우 카드에 메시지를 담아 선물을 더욱 특별하게 만들어 보세요!</p>
          <input type="text" />
        </div>
      </div>
      {/* <Button /> */}
    </section>
  );
};

export default OrderSummary;
