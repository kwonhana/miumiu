import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../component/layout/Logo';
import Lnb from './layout/Lnb';
import './scss/header.scss';

const Header = () => {
  const [lnbOpen, setLnbOpen] = useState(false);
  const toggleLnb = () => {
    setLnbOpen(!lnbOpen);
  };
  return (
    <header className="">
      <div className="header-wrap">
        <div className="header-left">
          <Link className="menu" onClick={toggleLnb}>
            <img src="/assets/icon/HamIcon.svg" alt="menu" />
          </Link>
        </div>
        <Logo className="logo" color={`white`} />
        <div className="header-right">
          <div className="gnb-list">
            <div className="Icon">
              <Link>
                <img src="/assets/icon/SearchIcon.svg" alt="Search" />
              </Link>
            </div>
            <div className="Icon user">
              <Link>
                <img src="/assets/icon/UserIcon.svg" alt="user" />
              </Link>
            </div>
            <div className="Icon cart">
              <Link>
                <img src="/assets/icon/CartIcon.svg" alt="cart" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Lnb isOpen={lnbOpen} />
    </header>
  );
};

export default Header;
