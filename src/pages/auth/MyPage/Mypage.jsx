import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../../api/authStore';
import MypageBanner from './MypageBanner';
import MypageNav from './MypageNav';
import MyInfo from './MyInfo';
import './scss/Mypage.scss';
import CousLet from '../../Home/layout/CouLet';
import WIshList from '../WishList/WIshList';
import { useNavigate, useParams } from 'react-router-dom';
import MyOrder from '../../Checkout/MyOrder/MyOrder';

const Mypage = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const activeTab = tab || 'info';

  if (!user) {
    return <div>로그인 정보가 없습니다</div>;
  }

  const fullName = [user.lastName, user.name].filter(Boolean).join('');

  const handleChangeTab = (nextTab) => {
    navigate(`/mypage/${nextTab}`);
  };
  return (
    <div className="myPage">
      <div className="mypage-inner">
        <MypageBanner
          userName={fullName || user.displayName}
          couponCount={user.couponCount || 0}
          point={user.point || 0}
        />
        <MypageNav activeTab={activeTab} onChangeTab={handleChangeTab} />

        {activeTab === 'info' && <MyInfo userData={user} />}
        {activeTab === 'order' && <MyOrder />}
        {activeTab === 'wishlist' && <WIshList />}
        <CousLet />
      </div>
    </div>
  );
};

export default Mypage;
