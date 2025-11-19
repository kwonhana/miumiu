import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { jewels } from '../../../store/data';
import { useProductsStore } from '../../../store/useProductsStore';
import '../scss/lnbSub.scss';

const LnbJewellery = ({ isActive }) => {
  const allItems = useProductsStore((state) => state.items);
  const randomItems = useMemo(() => {
    if (allItems.length === 0) {
      return [];
    }
    const jewellery = allItems.filter((item) => item.category1 === 'jewellery');
    const shuffled = [...jewellery].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [allItems]);
  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">패션 주얼리</p>
            <ul className="lnb-sub-menus">
              {jewels.map((jewel) => (
                <li className="lnb-menuList" key={jewel.alt}>
                  <Link to={`/jewellery/${jewel.alt2}`}>{jewel.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <Link>
                <img src="/assets/images/lnb/jewel.jpg" alt="jewel" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="lnb-right">
          <ul className="lnb-imgs">
            {randomItems.map((item) => (
              <li key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <img
                    src={
                      item.local_detail_images?.[0]
                        ? `/assets/images/detail/${item.local_detail_images[0]}`
                        : '/assets/images/default-product-image.png'
                    }
                    alt={item.name}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default LnbJewellery;
