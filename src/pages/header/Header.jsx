import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../component/layout/Logo';
import Lnb from './layout/Lnb';
import './scss/header.scss';

const Header = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [lnbOpen, setLnbOpen] = useState(false);
  const toggleLnb = () => {
    setLnbOpen(!lnbOpen);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        setScrollY(window.scrollY);
        console.log(scrollY);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      setScrollY(100);
    }
  }, [location]);

  const isMainPage = location.pathname === '/';
  const headerClass = isMainPage ? (scrollY >= 20 ? 'black' : '') : 'black';
  // window.addEventListener('scroll', () => {

  // });

  return (
    <header className={headerClass}>
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
