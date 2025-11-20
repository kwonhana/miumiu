import React, { useState } from 'react';
import OrderTotal from '../OrderTotal/OrderTotal';
import EmailInput from '../../../component/input/EmailInput';
import NameInput from '../../../component/input/NameInput';
import '../scss/Shipping.scss';
import Address from '../../../component/input/Address';
import DetailAddress from '../../../component/input/DetailAddress';
import PostCode from '../../../component/input/PostCode';
import SelectCity from '../../../component/input/SelectCity';
import Tellinput from '../../../component/input/Tellinput';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../component/layout/Button';

export const Shipping = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('delivery');

  // TODO 배송정보 상태관리
  const [formData, setFormData] = useState({
    // 구매자 정보
    email: '',
    newsletterAgree: false,
    // 배송주소
    name: '',
    address: '',
    detailAddress: '',
    city: '',
    postCode: '',
    phone: '',
    // 매장 수령
    selectedStore: '',
  });

  // TODO 폼 입력 값 업데이트
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // TODO 필수 필드 유효성 검증
  const validateForm = () => {
    if (activeTab === 'delivery') {
      if (!formData.email) {
        alert('이메일을 입력해주세요.');
        return false;
      }
      if (!formData.name) {
        alert('이름을 입력해주세요.');
        return false;
      }
      if (!formData.address) {
        alert('주소를 입력해주세요.');
        return false;
      }
      if (!formData.postCode) {
        alert('우편번호를 입력해주세요.');
        return false;
      }
      if (!formData.phone) {
        alert('전화번호를 입력해주세요.');
        return false;
      }
    } else if (activeTab === 'store') {
      if (!formData.selectedStore) {
        alert('매장을 선택해주세요.');
        return false;
      }
    }
    return true;
  };

  // TODO 다음 버튼 클릭
  const handleNext = () => {
    if (validateForm()) {
      // 폼 데이터 저장 (localStorage 또는 상태관리 store)
      localStorage.setItem('shippingData', JSON.stringify(formData));
      console.log('배송정보 저장:', formData);
      // 결제 페이지로 이동
      navigate('/payment');
    }
  };

  return (
    <section className="Shipping-wrap">
      <div className="top">
        <p>구입하신 상품의 수령 방법을 선택하세요.</p>
        <ul>
          <li>1. 주문서 작성 </li>
          <li>2. 배송정보</li>
          <li>3. 결제하기 </li>
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

      <div className="input-right">
        <form action="/">
          <div className="user-email">
            <h4>구매자 정보</h4>
            <p>이메일*</p>
            <EmailInput />
            <span>
              계정이 이미 있는 경우, 로그인하라는 메시지가 표시됩니다. 계정이 없는 경우, 비회원으로
              진행하고 결제 후 회원 등록을 완료할 수 있습니다.
            </span>
            <div className="letter-check">
              <input
                type="checkbox"
                name="newsletterAgree"
                checked={formData.newsletterAgree}
                onChange={handleInputChange}
              />
              <label>
                <span>
                  뉴스레터 수신 동의 (<Link style={{ fontWeight: '600' }}>개인정보 처리방침</Link>에
                  명시된 뉴스레터 및 기타 마케팅 커뮤니케이션을 수신하고 싶습니다.{' '}
                  <Link style={{ textDecorationLine: 'underline' }}>추가정보</Link>)
                </span>
              </label>
            </div>
          </div>
          <div className={activeTab === 'store' ? '' : 'hidden'}>
            <div className="store-check">
              <h4>매장 선택</h4>
              <span>제품 수령을 원하는 미우미우 매장을 선택해주세요.</span>
              <ul className="store-list">
                <li className="store-card">
                  <input
                    type="radio"
                    id="store1"
                    name="selectedStore"
                    value="cheongdam"
                    checked={formData.selectedStore === 'cheongdam'}
                    onChange={handleInputChange}
                  />
                  <label>미우미우 청담점</label>
                  <p className="info">서울시 강남구 압구정로 439 미우미우 매장 1-2층</p>
                  <p className="info">02-547-7443</p>
                </li>
                <li className="store-card">
                  <input
                    type="radio"
                    id="store2"
                    name="selectedStore"
                    value="gangnam"
                    checked={formData.selectedStore === 'gangnam'}
                    onChange={handleInputChange}
                  />
                  <label>미우미우 신세계백화점 강남점</label>
                  <p className="info">서울시 서초구 신반포로 176 신세계백화점강남점 2F</p>
                  <p className="info">02-3479-6182</p>
                </li>
              </ul>
            </div>
            <div className="coupon">
              <h4>할인쿠폰 선택</h4>
              <ul className="coupon-list"></ul>
            </div>
          </div>
          <div className="user-address">
            <h4>배송 주소</h4>
            <NameInput />
            <Address />
            <DetailAddress />
            <div className="city-post">
              <SelectCity />
              <PostCode />
            </div>
            <div className="country-phon">
              <div className="base-input">
                <p>국가*</p>
                <input type="text" value="대한민국" readOnly />
              </div>
              <Tellinput />
            </div>
          </div>
          <div className={activeTab === 'delivery' ? '' : 'hidden'}>
            <div className="coupon">
              <h4>할인쿠폰 선택</h4>
            </div>
          </div>
        </form>
        <Button title="다음" onClick={handleNext} />
      </div>
      <OrderTotal />
    </section>
  );
};
