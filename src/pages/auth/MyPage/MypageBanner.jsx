import React from 'react';
import './MypageBanner.scss';

const MypageBanner = ({ userName }) => {
  return (
    <div className="mypage-banner-wrap">
      <div className="mypage-banner-inner">
        <div className="banner-text">
          <p className="welcome-text">Welcome to Miu Miu</p>
          <p className="userName">
            <span>{userName}</span> 님
          </p>
        </div>
        <div className="banner-right">
          <div className="coupon">
            <p className="title">쿠폰</p>
            <p className="count">
              2<span>개</span>
            </p>
          </div>
          <div className="point">
            <p className="title">적립금</p>
            <p className="count">19,600</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MypageBanner;
