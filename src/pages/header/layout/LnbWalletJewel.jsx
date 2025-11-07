import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/lnbSub.scss';

const wallets = [{ alt: '반지갑' }, { alt: '카드홀더' }];
const jewels = [
  { alt: '반지 및 브로치', src: '/assets/images/lnb/jewel-ring.jpg' },
  { alt: '목걸이', src: '/assets/images/lnb/jewel-neck.jpg' },
  { alt: '팔찌', src: '/assets/images/lnb/jewel-arm.jpg' },
  { alt: '이어링', src: '/assets/images/lnb/jewel-earing.jpg' },
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
                <li className="lnb-menuList" key={wallet.alt}>
                  <Link to={`/${wallet.alt}`}>{wallet.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <Link>
                <img src="/assets/images/lnb/wall-list.jpg" alt="bag" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <div className="lnb-menus">
            <p className="lnb-menus-title">패션 주얼리</p>
            <ul className="lnb-sub-menus">
              {jewels.map((jewel) => (
                <li className="lnb-menuList" key={jewel.alt}>
                  <Link to={`/${jewel.alt}`}>{jewel.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            {jewels.slice(0, 4).map((jewel) => (
              <li key={jewel.alt} data-alt={jewel.alt}>
                <Link to={`/${jewel.alt}`}>
                  <img src={jewel.src} alt={jewel.alt} />
                  <p>{jewel.alt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default LnbWalletJewel;
