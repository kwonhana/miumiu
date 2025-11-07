import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/lnbSub.scss';

const shoes = [
  { key: '부츠', label: '부츠' },
  { key: '로퍼 및 레이스업', label: '로퍼 및 레이스업' },
  { key: '스니커즈', label: '스니커즈' },
  { key: '발레리나', label: '발레리나' },
  { key: '샌들', label: '샌들' },
  { key: '펌프스', label: '펌프스' },
];
const conicshoes = [
  { key: '미우 발레', label: '미우 발레' },
  { key: '페니 로퍼', label: '페니 로퍼' },
  { key: '윈터 슈즈', label: '윈터 슈즈' },
  { key: '플룸', label: '플룸' },
  { key: '김나지움', label: '김나지움' },
  { key: '루슈', label: '루슈' },
];
const Lnbshoes = ({ isActive }) => {
  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">슈즈</p>
            <ul className="lnb-sub-menus">
              {shoes.map((shoe) => (
                <li className="lnb-menuList" key={shoe.key}>
                  <Link to={`/${shoe.key}`}>{shoe.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <img src="/assets/images/lnb/shoes-list.jpg" alt="bag" />
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <div className="lnb-menus">
            <p className="lnb-menus-title">아이코닉 슈즈</p>
            <ul className="lnb-sub-menus">
              {conicshoes.map((shoes) => (
                <li className="lnb-menuList" key={shoes.key}>
                  <Link to={`/${shoes.key}`}>{shoes.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            <li>
              <img src="/assets/images/lnb/shoes-miu.jpg" alt="ballet" />
            </li>
            <li>
              <img src="/assets/images/lnb/shoes-plum.jpg" alt="plum" />
            </li>
            <li>
              <img src="/assets/images/lnb/shoes-winter.jpg" alt="winter" />
            </li>
            <li>
              <img src="/assets/images/lnb/shoes-peny.jpg" alt="peny" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lnbshoes;
