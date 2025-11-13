import React from 'react';
import { Link } from 'react-router-dom';
import '../scss/lnbSub.scss';

const shoes = [
  { alt: 'boots-and-ankle-boots', alt2: '부츠' },
  { alt: 'loafers-and-lace-ups', alt2: '로퍼 및 레이스업' },
  { alt: 'sneakers', alt2: '스니커즈' },
  { alt: 'ballerinas', alt2: '발레리나' },
  { alt: 'sandals', alt2: '샌들' },
  { alt: 'pumps', alt2: '펌프스' },
];
const conicshoes = [
  { alt: 'miu-ballet', alt2: '미우 발레', src: '/assets/images/lnb/shoes-miu.jpg' },
  {
    alt: 'penny-loafers',
    alt2: '페니 로퍼',
    src: '/assets/images/lnb/shoes-peny.jpg',
  },
  {
    alt: 'winter-shoes',
    alt2: '윈터 슈즈',
    src: '/assets/images/lnb/shoes-winter.jpg',
  },
  { alt: 'plume', alt2: '플룸', src: '/assets/images/lnb/shoes-plum.jpg' },
  { alt: 'gymnasium', alt2: '김나지움' },
  { alt: 'ruches', alt2: '루슈' },
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
                  <Link to={`/shoes/${shoe.alt}`}>{shoe.alt2}</Link>
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
                  <Link to={`/shoes/tag/${shoes.alt}`}>{shoes.alt2}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            {conicshoes.slice(0, 4).map((conicshoe) => (
              <li key={conicshoe.alt} data-alt={conicshoe.alt}>
                <Link to={`/shoes/${conicshoe.alt}`}>
                  <img src={conicshoe.src} alt={conicshoe.alt} />
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
