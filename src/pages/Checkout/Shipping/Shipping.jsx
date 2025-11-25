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
import RadioCard from '../../../component/input/RadioCard';
import { store, coupon } from '../../../store/data.js';
import PointInput from '../../../component/input/PointInput.jsx';

export const Shipping = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('delivery');

  // TODO 배송정보 상태관리
  const [checkData, setCheckData] = useState({
    // 구매자 정보
    email: '',
    newsletterAgree: false,
    lastName: '',
    name: '',
    address: '',
    detailAddress: '',
    city: '',
    postCode: '',
    countryNum: '',
    phone: '',
    // 매장 수령
    selectedStore: '',
    //쿠폰 사용
    selectCoupon: '',
    country: '대한민국',
    date: new Date().toLocaleString(),
  });

  // TODO 뉴스, 매장, 쿠폰 값 업데이트
  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value, type, checked } = e.target;
    setCheckData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // TODO 필수 필드 유효성 검증
  const dateForm = () => {
    if (activeTab === 'delivery') {
      if (!checkData.email) {
        alert('이메일을 입력해주세요.');
        return false;
      }
      if (!checkData.name) {
        alert('이름을 입력해주세요.');
        return false;
      }
      if (!checkData.address) {
        alert('주소를 입력해주세요.');
        return false;
      }
      if (!checkData.postCode) {
        alert('우편번호를 입력해주세요.');
        return false;
      }
      if (!checkData.phone) {
        alert('전화번호를 입력해주세요.');
        return false;
      }
    } else if (activeTab === 'store') {
      if (!checkData.selectedStore) {
        alert('매장을 선택해주세요.');
        return false;
      }
    }
    return true;
  };

  // TODO 다음 버튼 클릭시 로컬저장
  const handleNext = () => {
    if (dateForm()) {
      // 폼 데이터 저장 (localStorage 또는 상태관리 store)
      localStorage.setItem('shippingData', JSON.stringify({ checkData, activeTab }));
      console.log('배송정보 저장:', checkData);
      // 결제 페이지로 이동
      navigate('/orderSummary');
    }
  };

  return (
    <section className="Shipping-wrap">
      <div className="shipping-left">
        <div className="top">
          <p>구입하신 상품의 수령 방법을 선택하세요.</p>
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

        <div className="input-left">
          <form action="/">
            <div className="user-email">
              <h4>구매자 정보</h4>
              <p>이메일*</p>
              <EmailInput
                value={checkData.email}
                onChange={(val) =>
                  setCheckData((prev) => ({
                    ...prev,
                    email: val,
                  }))
                }
              />
              <span>
                계정이 이미 있는 경우, 로그인하라는 메시지가 표시됩니다. 계정이 없는 경우,
                비회원으로 진행하고 결제 후 회원 등록을 완료할 수 있습니다.
              </span>
              <div className="letter-check">
                <label>
                  <input
                    type="checkbox"
                    name="newsletterAgree"
                    checked={checkData.newsletterAgree}
                    onChange={handleInputChange}
                  />
                  <span>
                    뉴스레터 수신 동의 (<Link style={{ fontWeight: '600' }}>개인정보 처리방침</Link>
                    에 명시된 뉴스레터 및 기타 마케팅 커뮤니케이션을 수신하고 싶습니다.{' '}
                    <Link style={{ textDecorationLine: 'underline' }}>추가정보</Link>)
                  </span>
                </label>
              </div>
            </div>
            <div className={activeTab === 'store' ? '' : 'hidden'}>
              <div className="radio-check">
                <h4>매장 선택</h4>
                <span>제품 수령을 원하는 미우미우 매장을 선택해주세요.</span>
                <ul className="radio-list">
                  {store.map((store) => (
                    <RadioCard
                      key={store.id}
                      id={store.id}
                      name={store.name}
                      value={store.value}
                      checked={checkData.selectedStore === store.value}
                      onChange={handleInputChange}
                      title={store.title}
                      script={store.address}
                      number={store.number}
                    />
                  ))}
                </ul>
              </div>
            </div>
            <div className="user-address">
              <h4>{activeTab === 'delivery' ? '배송 주소' : '청구 발송 주소'}</h4>
              <NameInput
                lastName={checkData.lastName}
                name={checkData.name}
                onLastNameChange={(n) => setCheckData((p) => ({ ...p, lastName: n }))}
                onNameChange={(n) => setCheckData((p) => ({ ...p, name: n }))}
              />
              <Address
                address={checkData.address}
                onAddChange={(a) => setCheckData((p) => ({ ...p, address: a }))}
              />
              <DetailAddress
                detailAddress={checkData.detailAddress}
                onDeAddress={(d) => setCheckData((p) => ({ ...p, detailAddress: d }))}
              />
              <div className="city-post">
                <SelectCity
                  city={checkData.city}
                  onCityChange={(v) => setCheckData((prev) => ({ ...prev, city: v }))}
                />
                <PostCode
                  postCode={checkData.postCode}
                  onPostCode={(p) => setCheckData((c) => ({ ...c, postCode: p }))}
                />
              </div>
              <div className="country-phon">
                <div className="base-input">
                  <p>국가*</p>
                  <input type="text" value="대한민국" readOnly />
                </div>
                <Tellinput
                  phone={checkData.phone}
                  onPhone={(v) => setCheckData((p) => ({ ...p, phone: v }))}
                  countNum={checkData.countryNum}
                  onCountNum={(dial) => setCheckData((p) => ({ ...p, countryNum: dial }))}
                />
              </div>
            </div>
            <div className="radio-check">
              <h4>할인쿠폰 선택</h4>
              <ul className="radio-list">
                {coupon.map((coupon) => (
                  <RadioCard
                    key={coupon.id}
                    id={coupon.id}
                    name={coupon.name}
                    value={coupon.value}
                    checked={checkData.selectCoupon === coupon.value}
                    onChange={handleInputChange}
                    title={coupon.title}
                    script={coupon.address}
                    number={coupon.number}
                  />
                ))}
              </ul>
            </div>
            <div className="point">
              <h4>보유 적립금 {/**/} 원</h4>
              <div className="point-input">
                <PointInput />
                <Button title="전액사용" />
              </div>
              <span>적립금은 1,000원 이상일때 사용 가능</span>
            </div>
          </form>
          <Button title="다음" onClick={handleNext} />
        </div>
      </div>
      <OrderTotal />
    </section>
  );
};
