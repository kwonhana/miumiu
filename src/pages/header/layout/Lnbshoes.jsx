import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/lnbSub.scss';

const shoes = [
  { alt: '부츠' },
  { alt: '로퍼 및 레이스업' },
  { alt: '스니커즈' },
  { alt: '발레리나' },
  { alt: '샌들' },
  { alt: '펌프스' },
];
const conicshoes = [
  { alt: '미우 발레', src: '/assets/images/lnb/shoes-miu.jpg' },
  {
    alt: '페니 로퍼',
    src: '/assets/images/lnb/shoes-peny.jpg',
  },
  {
    alt: '윈터 슈즈',
    src: '/assets/images/lnb/shoes-winter.jpg',
  },
  { alt: '플룸', src: '/assets/images/lnb/shoes-plum.jpg' },
  { alt: '김나지움' },
  { alt: '루슈' },
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
                <li className="lnb-menuList" key={shoe.alt}>
                  <Link to={`/${shoe.alt}`}>{shoe.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <Link>
                <img src="/assets/images/lnb/shoes-list.jpg" alt="bag" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <div className="lnb-menus">
            <p className="lnb-menus-title">아이코닉 슈즈</p>
            <ul className="lnb-sub-menus">
              {conicshoes.map((shoes) => (
                <li className="lnb-menuList" key={shoes.alt}>
                  <Link to={`/${shoes.alt}`}>{shoes.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            {conicshoes.slice(0, 4).map((conicshoe) => (
              <li key={conicshoe.alt}>
                <Link to={`/${conicshoe.alt}`}>
                  <img src={conicshoe.src} alt={conicshoe.alt} />
                  <p>{conicshoe.alt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Lnbshoes;
