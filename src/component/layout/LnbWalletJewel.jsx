import React from 'react';
import { Link } from 'react-router-dom';

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
const LnbWalletJewel = () => {
  return (
    <div className="lnb-wall">
      <div className="lnb-wall-left">
        <ul>
          <span>지갑</span>
          {wallets.map((wallet) => (
            <li key={wallet.key}>
              <Link to={`/${wallet.key}`}>{wallet.label}</Link>
            </li>
          ))}
        </ul>
        <div className="wall-imgs-left">
          <img src="" alt="" />
        </div>
      </div>

      <div className="lnb-wall-right">
        <ul>
          <span>패션 주얼리</span>
          {jewels.map((jewel) => (
            <li key={jewel.key}>
              <Link to={`/${jewel.key}`}>{jewel.label}</Link>
            </li>
          ))}
        </ul>
        <div className="wall-imgs-right">
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};
export default LnbWalletJewel;
