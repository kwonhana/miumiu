import React from 'react';
import AddressTable from './AddressTable';

const MyInfo = ({ userData }) => {
  if (!userData) {
    return null;
  }
  const fullName = [userData.lastName, userData.name].filter(Boolean).join('');
  return (
    <div className="container">
      <section className="basicInfo">
        <div className="basicInfo-inner">
          <div className="title-wrap">
            <h2>기본 정보</h2>
            <button className="editBtn">수정하기</button>
          </div>

          <table className="info-table">
            <tbody>
              <tr>
                <th>이름</th>
                <td>{fullName || userData.name}</td>
                <th>생년월일</th>
                <td>{userData.birthday}</td>
              </tr>

              <tr>
                <th>이메일</th>
                <td>{userData.email}</td>
                <th>휴대폰 번호</th>
                <td>{userData.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="loginInfo">
        <div className="loginInfo-inner">
          <h2>로그인 정보</h2>
          <table className="login-table">
            <tbody>
              <tr>
                <th>아이디</th>
                <td>{userData.userId}</td>
                <th>비밀번호</th>
                <td>**********</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="myCoupon">
        <div className="myCoupon-inner">
          <h2>내 쿠폰</h2>

          <div className="coupon-wrap">
            <div className="coupon-box">
              <p className="title">10% 할인 쿠폰</p>
              <p className="coupon-detail">
                <span className="desc">100만원 이상 구매시 사용가능</span>
                <span className="validDate">2026. 08. 31 까지</span>
              </p>
            </div>
            <div className="coupon-box">
              <p className="title">15% 할인 쿠폰</p>
              <p className="coupon-detail">
                <span className="desc">150만원 이상 구매시 사용가능</span>
                <span className="validDate">2026. 08. 31 까지</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="myPoint">
        <div className="myPoint-inner">
          <h2>내 적립금</h2>
          <p>
            <span>16,800</span> 원
          </p>
        </div>
      </section>

      <section className="deliveryAddress">
        <div className="address-inner">
          <div className="title-wrap">
            <h2>배송지 관리</h2>
            <button className="addAddressBtn">배송지 추가하기</button>
          </div>
          <AddressTable />
        </div>
      </section>
    </div>
  );
};

export default MyInfo;
