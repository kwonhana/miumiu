import { Link } from 'react-router-dom';
import './../scss/lnb.scss';
import { useHeaderStore } from '../../../store/useHeaderStore';
import LnbSubMenu from './LnbSubMenu';

const Lnb = ({ isOpen, onClose }) => {
  const activeMenu = useHeaderStore((state) => state.activeMenu);
  const setActiveMenu = useHeaderStore((state) => state.setActiveMenu);
  const menuKeys = Object.keys(useHeaderStore.getState().menuData);

  //TODO LNB 창 닫기
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && <div className="lnb-dimmed" onClick={handleClose}></div>}

      <nav className={`lnb-wrap ${isOpen ? 'active' : ''}`}>
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
      {/* headerBlock은 이제 딤드 배경이 역할을 대신하거나, 
          필요하다면 lnb-dimmed 위에 적절한 위치에 스타일링해야 합니다. 
          일단은 주석 처리합니다. 필요하다면 다시 살리셔도 됩니다.
          <div className="headerBlock"></div> */}
    </>
  );
};

export default Lnb;
