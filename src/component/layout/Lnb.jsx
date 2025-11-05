import { Link } from 'react-router-dom';
import LnbBags from './LnbBags';
import LnbHi from './LnbHi';
import Lnbshoes from './Lnbshoes';
import LnbWalletJewel from './LnbWalletJewel';
import '../../styles/layout/lnb.scss';

const Lnb = ({ isOpen }) => {
  return (
    <nav className={`lnb-wrap  ${isOpen ? 'active' : ''}`}>
      <ul className="lnb-title">
        <li>
          <Link>하이라이트</Link>
        </li>

        <li>
          <Link>가방</Link>
        </li>
        <li>
          <Link>슈즈</Link>
        </li>
        <li>
          <Link>지갑&패션주얼리</Link>
        </li>
      </ul>
      <div className="lnb-list">
        <LnbHi />
        <LnbBags />
        <Lnbshoes />
        <LnbWalletJewel />
      </div>
    </nav>
  );
};

export default Lnb;
