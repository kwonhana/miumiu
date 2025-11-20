import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../component/layout/Logo';
import Lnb from './layout/Lnb';
import './scss/header.scss';
import Search from './layout/Search';

const Header = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [lnbOpen, setLnbOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef(null);
  const closeAll = useCallback(() => {
    setLnbOpen(false);
    setSearchOpen(false);
  }, []);

  const toggleLnb = useCallback(() => {
    setLnbOpen((prev) => !prev);
    setSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
    setLnbOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeAll();
      }
    };
    if (lnbOpen || searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lnbOpen, searchOpen, closeAll]);

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
    <header ref={headerRef} className={headerClass}>
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
              <Link onClick={toggleSearch}>
                <img src="/assets/icon/SearchIcon.svg" alt="Search" />
              </Link>
            </div>
            <div className="Icon user">
              <Link to={'/login'}>
                <img src="/assets/icon/UserIcon.svg" alt="user" />
              </Link>
            </div>
            <div className="Icon cart">
              <Link to={'/cart'}>
                <img src="/assets/icon/CartIcon.svg" alt="cart" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Lnb isOpen={lnbOpen} />
      <Search isOpen={searchOpen} />
    </header>
  );
};

export default Header;
