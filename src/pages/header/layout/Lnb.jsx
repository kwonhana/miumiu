import { Link } from 'react-router-dom';
import './../scss/lnb.scss';
import { useHeaderStore } from '../../../store/useHeaderStore';
import LnbSubMenu from './LnbSubMenu';

const Lnb = ({ isOpen, onClose }) => {
  const activeMenu = useHeaderStore((state) => state.activeMenu);
  const setActiveMenu = useHeaderStore((state) => state.setActiveMenu);
  const menuKeys = Object.keys(useHeaderStore.getState().menuData);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <nav className={`lnb-wrap ${isOpen ? 'active' : ''}`}>
      <div className="headerBlock"></div>
      <ul className="lnb-title">
        {menuKeys.map((key) => {
          const menuTitle = useHeaderStore.getState().menuData[key].title;
          return (
            <li key={key}>
              <Link
                onClick={() => setActiveMenu(key)}
                className={activeMenu === key ? 'active' : ''}>
                {menuTitle}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="lnb-list">
        {menuKeys.map((key) => (
          <LnbSubMenu
            key={key}
            categoryKey={key} // 🚀 Zustand Store에서 데이터 조회할 키
            isActive={activeMenu === key} // 🚀 Store에서 가져온 activeMenu 사용
            onCloseLnb={handleClose}
          />
        ))}
      </div>
    </nav>
  );
};

export default Lnb;
