import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../component/layout/Logo';
import Lnb from './layout/Lnb';
import Search from './layout/Search';
import { useAuthStore } from '../../api/authStore';
import './scss/header.scss';
import { useProductsStore } from '../../store/useProductsStore';

const Header = () => {
  const location = useLocation();
  const Navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [lnbOpen, setLnbOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const headerRef = useRef(null);
  const { cartCount } = useProductsStore();

  const closeAll = useCallback(() => {
    setLnbOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, []);

  const toggleLnb = useCallback(() => {
    setLnbOpen((prev) => !prev);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
    setLnbOpen(false);
    setUserMenuOpen(false);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setUserMenuOpen((prev) => !prev);
    setLnbOpen(false);
    setSearchOpen(false);
  }, []);

  const handleLogout = () => {
    logout();
    closeAll();
    Navigate('/');
  };

  // 🔥 Header 밖 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeAll();
      }
    };

    if (lnbOpen || searchOpen || userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lnbOpen, searchOpen, userMenuOpen, closeAll]);

  // 🔥 스크롤 감지 (scrollY deps 제거)
  useEffect(() => {
    if (location.pathname === '/') {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setScrollY(100);
    }
  }, [location]);

  const isMainPage = location.pathname === '/';
  const headerClass = isMainPage ? (scrollY >= 20 ? 'black' : '') : 'black';

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
              {user ? (
                <>
                  <button onClick={toggleUserMenu} className="user-btn">
                    <img src="/assets/icon/UserIcon.svg" alt="user" />
                  </button>
                  {userMenuOpen && (
                    <div className="user-dropdown-menu">
                      <ul>
                        <li>
                          <Link to={'/mypage/info'} onClick={closeAll}>
                            나의 정보
                          </Link>
                        </li>
                        <li>
                          <Link to={'/mypage/order'} onClick={closeAll}>
                            주문 / 배송 조회
                          </Link>
                        </li>
                        <li>
                          <Link to={'/mypage/wishlist'} onClick={closeAll}>
                            위시리스트
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={'/'}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLogout();
                            }}>
                            로그아웃
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <Link to={'/login'}>
                  <img src="/assets/icon/Login.svg" alt="user" />
                </Link>
              )}
            </div>

            <div className="Icon cart">
              <Link to={'/cart'}>
                <img src="/assets/icon/CartIcon.svg" alt="cart" />
                <span className="cart-count">{cartCount}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Lnb isOpen={lnbOpen} onClose={closeAll} />
      <Search isOpen={searchOpen} onClose={closeAll} />
    </header>
  );
};

export default Header;
