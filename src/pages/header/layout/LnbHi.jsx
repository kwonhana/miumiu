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
        <div className="lnb-hi-left">
          <div className="lnb-hi-col">
            <span>컬렉션</span>
            <ul>
              {colections.map((colection) => (
                <li key={colection.key}>
                  <Link to={`/${colection.key}`}>{colection.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lnb-hi-new">
            <span>신상품</span>
            <ul>
              {newitems.map((newitem) => (
                <li key={newitem.key}>
                  <Link to={`/${newitem.key}`}>{newitem.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lnb-hi-miu">
            <span>miu miu</span>
            <ul>
              <li key={`Miu Miu Women's Tales`}>
                <Link to={`/Miu Miu Women's Tales`}>Miu Miu Women's Tales</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="lnb-hi-right">
          <div className="lnb-hi-imgs">
            <img src="/assets/images/lnb/collection-1.jpg" alt="collection1" />
            <img src="/assets/images/lnb/collection-2.jpg" alt="collection2" />
            <img src="/assets/images/lnb/collection-3.jpg" alt="collection3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LnbHi;
