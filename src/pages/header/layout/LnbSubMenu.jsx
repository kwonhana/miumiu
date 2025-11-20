import React, { useMemo } from 'react';
import { useHeaderStore } from '../../../store/useHeaderStore';
import { useProductsStore } from '../../../store/useProductsStore';
import { Link } from 'react-router-dom';
import '../scss/lnbSub.scss';

const LnbSubMenu = ({ categoryKey, isActive, onCloseLnb }) => {
  const {
    title,
    data: menuData,
    path: menuPath,
    image: imageSrc,
  } = useHeaderStore((state) => state.menuData[categoryKey]);

  const allItems = useProductsStore((state) => state.items);

  const randomItems = useMemo(() => {
    if (allItems.length === 0) return [];
    const filteredItems = allItems.filter((item) => item.category1 === categoryKey);
    console.log(filteredItems, 'filteredItems');
    const shuffled = [...filteredItems].sort(() => 0.5 - Math.random);
    return shuffled.slice(0, 4);
  });

  const getItemImageSrc = (item) => {
    const images = item.local_detail_images;
    if (images && images.length > 0) {
      return `/assets/images/detail/${images[0]}`;
    }
    // LnbBags나 LnbJewellery에서 사용하던 기본 이미지가 있다면 대체
    return '/assets/images/default-product-image.png';
  };

  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">{title}</p>
            <ul className="lnb-sub-menus">
              {menuData.map((menuItem) => (
                <li className="lnb-menuList" key={menuItem.alt} onClick={onCloseLnb}>
                  <Link to={`/${menuPath}/${menuItem.alt2}`}>{menuItem.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <div>
                <img src={imageSrc} alt={title} />
              </div>
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <ul className="lnb-imgs">
            {/* 확인필요 */}
            {randomItems.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`} onClick={onCloseLnb}>
                  <img src={getItemImageSrc(item)} alt={item.name} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LnbSubMenu;
