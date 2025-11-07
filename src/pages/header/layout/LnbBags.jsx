import '../scss/lnbSub.scss';

import React from 'react';
import { Link } from 'react-router-dom';
const bags = [
  { key: '백팩', label: '백팩' },
  { key: '미니백', label: '미니백' },
  { key: '호보백', label: '호보백' },
  { key: '탑핸들', label: '탑핸들' },
  { key: '토트백', label: '토트백' },
  { key: '숄더백', label: '숄더백' },
];
const conicBags = [
  { key: '완더', label: '완더' },
  { key: '아르카디', label: '아르카디' },
  { key: '포켓', label: '포켓' },
  { key: '보', label: '보' },
  { key: '아방뛰르', label: '아방뛰르' },
  { key: '아이비', label: '아이비' },
];
const LnbBags = ({ isActive }) => {
  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">가방</p>
            <ul className="lnb-sub-menus">
              {bags.map((bag) => (
                <li className="lnb-menuList" key={bag.key}>
                  <Link to={`/${bag.key}`}>{bag.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <img src="/assets/images/lnb/bags-list.jpg" alt="bag" />
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <div className="lnb-menus">
            <p className="lnb-menus-title">아이코닉 백</p>
            <ul className="lnb-sub-menus">
              {conicBags.map((bagconicBag) => (
                <li className="lnb-menuList" key={bagconicBag.key}>
                  <Link to={`/${bagconicBag.key}`}>{bagconicBag.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            <li>
              <img src="/assets/images/lnb/bags-wander.jpg" alt="wander" />
            </li>
            <li>
              <img src="/assets/images/lnb/bags-arcadi.jpg" alt="arcadi" />
            </li>
            <li>
              <img src="/assets/images/lnb/bags-pocket.jpg" alt="pocket" />
            </li>
            <li>
              <img src="/assets/images/lnb/bags-vo.jpg" alt="vo" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LnbBags;
