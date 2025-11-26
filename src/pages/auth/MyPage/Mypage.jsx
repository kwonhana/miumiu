import React, { useEffect, useState } from 'react';
import MypageBanner from './MypageBanner';
import MypageNav from './MypageNav';
import './Mypage.scss';
import MyInfo from './MyInfo';
const MyOrder = () => (
  <div className="container">
    <section className="myOrder">
      <div className="myOrder-inner">
        <h2>주문 / 배송 조회</h2>
        <p>주문 내역이 없습니다.</p>
      </div>
    </section>
  </div>
);

// 위시리스트 탭용 더미 컴포넌트
const Wishlist = () => (
  <div className="container">
    <section className="wishlist">
      <div className="wishlist-inner">
        <h2>위시리스트</h2>
        <p>위시리스트에 담긴 상품이 없습니다.</p>
      </div>
    </section>
  </div>
);
const Mypage = () => {
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    // 로컬스토리지에서 로그인 정보 가져오기
    const loginData = localStorage.getItem('loginUser');

    if (loginData) {
      const user = JSON.parse(loginData);
      setUserData(user);
    } else {
      // 로그인 정보가 없으면 로그인 페이지로 리다이렉트
      // navigate('/login');
      console.log('로그인 정보가 없습니다.');
    }
  }, []);

  if (!userData) {
    return <div>로딩 중...</div>;
  }
  const fullName = [userData.lastName, userData.name].filter(Boolean).join('');
  return (
    <div className="myPage">
      <div className="mypage-inner">
        <MypageBanner
          userName={fullName || userData.name}
          couponCount={userData.couponCount || 0}
          point={userData.point || 0}
        />
        <MypageNav activeTab={activeTab} onChangeTab={setActiveTab} />

        {activeTab === 'info' && <MyInfo userData={userData} />}
        {activeTab === 'order' && <MyOrder />}
        {activeTab === 'wishlist' && <Wishlist />}
      </div>
    </div>
  );
};

export default Mypage;
