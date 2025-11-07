import '../scss/lnbSub.scss';
import { Link } from 'react-router-dom';

const bags = [
  { alt: '백팩' },
  { alt: '미니백' },
  { alt: '호보백' },
  { alt: '탑핸들' },
  { alt: '토트백' },
  { alt: '숄더백' },
];
const conicBags = [
  { alt: '완더', src: '/assets/images/lnb/bags-wander.jpg' },
  { alt: '아르카디', src: '/assets/images/lnb/bags-arcadi.jpg' },
  { alt: '포켓', src: '/assets/images/lnb/bags-pocket.jpg' },
  { alt: '보', src: '/assets/images/lnb/bags-vo.jpg' },
  { alt: '아방뛰르' },
  { alt: '아이비' },
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
                  <Link to={`/${bag.alt}`}>{bag.alt}</Link>
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
              {conicBags.map((conicBag) => (
                <li className="lnb-menuList" key={conicBag.alt}>
                  <Link to={`/${conicBag.alt}`}>{conicBag.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-imgs">
            {conicBags.slice(0, 4).map((conicBag) => (
              <li key={conicBag.alt}>
                <Link to={`/${conicBag.alt}`}>
                  <img src={conicBag.src} alt={conicBag.alt} />
                  <p>{conicBag.alt}</p>
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
