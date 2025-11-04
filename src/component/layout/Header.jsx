import React from 'react';

import Lnb from './Lnb.jsx';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const Header = () => {
  return (
    <header>
      <div className="header-left">
        <Logo color={`white`} />
        <div>
          <Link>
            <img src="" alt="" />
          </Link>
        </div>
      </div>
      <div className="header-right">
        <ul className="gnb-list">
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
          <li>
            <img src="" alt="" />
          </li>
        </ul>
      </div>

      <Lnb />
    </header>
  );
};

export default Header;
