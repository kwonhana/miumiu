import { Link } from 'react-router-dom';
import LnbBags from './LnbBags';
import Lnbshoes from './Lnbshoes';
import LnbWallet from './LnbWallet';
import LnbAcc from './LnbAcc';
import LnbJewellery from './LnbJewellery';
import { useState } from 'react';
import './../scss/lnb.scss';

const Lnb = ({ isOpen }) => {
  const [activeMenu, setActiveMenu] = useState('bags');
  return (
    <nav className={`lnb-wrap ${isOpen ? 'active' : ''}`}>
      <div className="headerBlock"></div>
      <ul className="lnb-title">
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
            신발
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveMenu('acc')}
            className={activeMenu === 'acc' ? 'active' : ''}>
            엑세서리
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveMenu('wallet')}
            className={activeMenu === 'wallet' ? 'active' : ''}>
            지갑
          </Link>
        </li>
        <li>
          <Link
            onClick={() => setActiveMenu('jewellery')}
            className={activeMenu === 'jewellery' ? 'active' : ''}>
            패션 주얼리
          </Link>
        </li>
      </ul>
      <div className="lnb-list">
        <LnbBags isActive={activeMenu === 'bags'} />
        <Lnbshoes isActive={activeMenu === 'shoes'} />
        <LnbAcc isActive={activeMenu === 'acc'} />
        <LnbWallet isActive={activeMenu === 'wallet'} />
        <LnbJewellery isActive={activeMenu === 'jewellery'} />
      </div>
    </nav>
  );
};

export default Lnb;
