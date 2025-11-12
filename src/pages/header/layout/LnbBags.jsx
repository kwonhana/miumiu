import '../scss/lnbSub.scss';
import { Link } from 'react-router-dom';

const bags = [
  { alt: '백팩', alt2: 'backpacks' },
  { alt: '미니백', alt2: 'mini' },
  { alt: '호보백', alt2: 'hobo' },
  { alt: '탑핸들', alt2: 'topHandles' },
  { alt: '토트백', alt2: 'totes' },
  { alt: '숄더백', alt2: 'shoulder' },
];
const iconicBags = [
  { alt: '완더', alt2: 'wander', src: '/assets/images/lnb/bags-wander.jpg' },
  { alt: '아르카디', alt2: 'arcadie', src: '/assets/images/lnb/bags-arcadi.jpg' },
  { alt: '포켓', alt2: 'pocket', src: '/assets/images/lnb/bags-pocket.jpg' },
  { alt: '보', alt2: 'beau', src: '/assets/images/lnb/bags-vo.jpg' },
  { alt: '아방뛰르', alt2: 'abang' },
  { alt: '아이비', alt2: 'ivy' },
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
                <li className="lnb-menuList" key={bag.alt}>
                  <Link to={`/bags/${bag.alt2}`}>{bag.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <Link>
                <img src="/assets/images/lnb/bags-list.jpg" alt="bag" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <div className="lnb-menus">
            <p className="lnb-menus-title">아이코닉 백</p>
            <ul className="lnb-sub-menus">
              {iconicBags.map((iconicBag) => (
                <li className="lnb-menuList" key={iconicBag.alt}>
                  <Link to={`/bags/${iconicBag.alt2}`}>{iconicBag.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            {iconicBags.slice(0, 4).map((iconicBag) => (
              <li key={iconicBag.alt} data-alt={iconicBag.alt}>
                <Link to={`/bags/${iconicBag.alt2}`}>
                  <img src={iconicBag.src} alt={iconicBag.alt} />
                  <p>{iconicBag.alt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LnbBags;
