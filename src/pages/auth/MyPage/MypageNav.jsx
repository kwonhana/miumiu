import React from 'react';
import './scss/MypageNav.scss';
import { Link } from 'react-router-dom';

const MypageNav = () => {
  return (
    <div className="mypageNav">
      <div className="nav-inner">
        <ul>
          <li>
            <Link>내 정보</Link>
          </li>
          <li>
            <Link>주문 / 배송 조회</Link>
          </li>
          <li>
            <Link>위시리스트</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MypageNav;
