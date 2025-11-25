import React from 'react';
import './MypageBanner.scss';

const MypageBanner = () => {
  return (
    <div className="mypage-banner-wrap">
      <div className="mypage-banner-inner">
        <div className="banner-text">
          <p>Welcome to Miu Miu</p>
          <p>***님</p>
        </div>
        <div className="banner-right">
          <div className="coupon"></div>
          <div className="point"></div>
        </div>
      </div>
    </div>
  );
};
export default MypageBanner;
