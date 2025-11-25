import React from 'react';
import './MypageNav.scss';

const MypageNav = ({ activeTab, onChangeTab }) => {
  return (
    <div className="mypageNav">
      <div className="nav-inner">
        <ul>
          <li className={activeTab === 'info' ? 'active' : ''}>
            <button type="button" onClick={() => onChangeTab('info')}>
              내 정보
            </button>
          </li>
          <li className={activeTab === 'order' ? 'active' : ''}>
            <button type="button" onClick={() => onChangeTab('order')}>
              주문 / 배송 조회
            </button>
          </li>
          <li className={activeTab === 'wishlist' ? 'active' : ''}>
            <button type="button" onClick={() => onChangeTab('wishlist')}>
              위시리스트
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MypageNav;
