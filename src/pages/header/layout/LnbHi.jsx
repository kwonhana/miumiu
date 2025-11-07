import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/lnbHi.scss';

const colections = [
  { key: 'MIU MIU AUTOMNE', label: 'MIU MIU AUTOMNE' },
  { key: 'NEW BALANCE X MIU MIU', label: 'NEW BALANCE X MIU MIU' },
  { key: 'MIU MIU CUSTOM STUDIO', label: 'MIU MIU CUSTOM STUDIO' },
  { key: 'MIU MIU UPCYCLED', label: 'MIU MIU UPCYCLED' },
  { key: 'MIU CLOSET', label: 'MIU CLOSET' },
  { key: '기프트', label: '기프트' },
  { key: '향수', label: '향수' },
];
const newitems = [
  { key: '슈즈', label: '슈즈' },
  { key: '악세서리', label: '악세서리' },
  { key: '의류', label: '의류' },
  { key: '가방', label: '가방' },
];
const LnbHi = ({ isActive }) => {
  return (
    <div className={`lnb-hi ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left hi">
          <div className="lnb-menus">
            <p className="lnb-menus-title">컬렉션</p>
            <ul className="lnb-sub-menus">
              {colections.map((colection) => (
                <li className="lnb-menuList" key={colection.key}>
                  <Link to={`/${colection.key}`}>{colection.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lnb-menus">
            <p className="lnb-menus-title">신상품</p>
            <ul className="lnb-sub-menus">
              {newitems.map((items) => (
                <li className="lnb-menuList" key={items.key}>
                  <Link to={`/${items.key}`}>{items.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lnb-menus">
            <p className="lnb-menus-title">MIU MIU CLUB</p>
            <ul>
              <li className="lnb-sub-menus">Miu Miu Women's Tales</li>
            </ul>
          </div>
        </div>
        <div className="lnb-right">
          <ul className="lnb-imgs">
            <li>
              <img src="/assets/images/lnb/collection-1.jpg" alt="collection-1" />
            </li>
            <li>
              <img src="/assets/images/lnb/collection-2.jpg" alt="collection-2" />
            </li>
            <li>
              <img src="/assets/images/lnb/collection-3.jpg" alt="collection-3" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LnbHi;
