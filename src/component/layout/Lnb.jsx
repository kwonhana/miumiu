import LnbBags from './LnbBags';
import LnbHi from './LnbHi';
import Lnbshoes from './Lnbshoes';
import LnbWalletJewel from './LnbWalletJewel';
import { useState } from 'react';
import '../../styles/layout/lnb.scss';
import '../../styles/layout/lnbHi.scss';
import '../../styles/layout/lnbBags.scss';

const Lnb = ({ isOpen }) => {
  const [activeMenu, setActiveMenu] = useState('hi');
  return (
    <nav className={`lnb-wrap  ${isOpen ? 'active' : ''}`}>
      <ul className="lnb-title">
        <li>
          <a onClick={() => setActiveMenu('hi')}>하이라이트</a>
        </li>

        <li>
          <a onClick={() => setActiveMenu('bags')}>가방</a>
        </li>
        <li>
          <a onClick={() => setActiveMenu('shoes')}>슈즈</a>
        </li>
        <li>
          <a onClick={() => setActiveMenu('wallet')}>지갑&패션주얼리</a>
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
