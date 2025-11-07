import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/lnbSub.scss';

const wallets = [
  { key: '반지갑', label: '반지갑' },
  { key: '카드홀더', label: '카드홀더' },
];
const jewels = [
  { key: '반지 및 브로츠', label: '반지 및 브로츠' },
  { key: '목걸이', label: '목걸이' },
  { key: '팔찌', label: '팔찌' },
  { key: '이어링', label: '이어링' },
];
const LnbWalletJewel = ({ isActive }) => {
  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">지갑</p>
            <ul className="lnb-sub-menus">
              {wallets.map((wallet) => (
                <li className="lnb-menuList" key={wallet.key}>
                  <Link to={`/${wallet.key}`}>{wallet.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <img src="/assets/images/lnb/wall-list.jpg" alt="bag" />
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <div className="lnb-menus">
            <p className="lnb-menus-title">패션 주얼리</p>
            <ul className="lnb-sub-menus">
              {jewels.map((jewel) => (
                <li className="lnb-menuList" key={jewel.key}>
                  <Link to={`/${jewel.key}`}>{jewel.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            <li>
              <img src="/assets/images/lnb/jewel-earing.jpg" alt="earing" />
            </li>
            <li>
              <img src="/assets/images/lnb/jewel-neck.jpg" alt="neck" />
            </li>
            <li>
              <img src="/assets/images/lnb/jewel-arm.jpg" alt="arm" />
            </li>
            <li>
              <img src="/assets/images/lnb/jewel-ring.jpg" alt="ring" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default LnbWalletJewel;
