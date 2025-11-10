import { Link } from 'react-router-dom';
import LnbBags from './LnbBags';
import LnbHi from './LnbHi';
import Lnbshoes from './Lnbshoes';
import LnbWalletJewel from './LnbWalletJewel';
import { useState } from 'react';
import './../scss/lnb.scss';

const Lnb = ({ isOpen }) => {
  const [activeMenu, setActiveMenu] = useState('hi');
  return (
    <nav className={`lnb-wrap ${isOpen ? 'active' : ''}`}>
      <div className="headerBlock"></div>
      <ul className="lnb-title">
        <li>
          <Link onClick={() => setActiveMenu('hi')} className={activeMenu === 'hi' ? 'active' : ''}>
            하이라이트
          </Link>
        </li>

        <li>
          <Link
            onClick={() => setActiveMenu('bags')}
            className={activeMenu === 'bags' ? 'active' : ''}>
            가방
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveMenu('shoes')}
            className={activeMenu === 'shoes' ? 'active' : ''}>
            슈즈
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveMenu('wallet')}
            className={activeMenu === 'wallet' ? 'active' : ''}>
            지갑&패션주얼리
          </Link>
        </li>
      </ul>
      <div className="lnb-list">
        <LnbHi isActive={activeMenu === 'hi'} />
        <LnbBags isActive={activeMenu === 'bags'} />
        <Lnbshoes isActive={activeMenu === 'shoes'} />
        <LnbWalletJewel isActive={activeMenu === 'wallet'} />
      </div>
    </nav>
  );
};

export default Lnb;
