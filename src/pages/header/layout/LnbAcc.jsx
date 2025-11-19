import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { accessories } from '../../../store/data';
import { useProductsStore } from '../../../store/useProductsStore';
import '../scss/lnbSub.scss';

const LnbAcc = ({ isActive }) => {
  const allItems = useProductsStore((state) => state.items);
  const randomItems = useMemo(() => {
    if (allItems.length === 0) {
      return [];
    }
    const accessories = allItems.filter((item) => item.category1 === 'accessories');
    const shuffled = [...accessories].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [allItems]);
  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">엑세서리</p>
            <ul className="lnb-sub-menus">
              {accessories.map((acc) => (
                <li className="lnb-menuList" key={acc.alt}>
                  <Link to={`/accessories/${acc.alt2}`}>{acc.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <Link>
                <img src="/assets/images/lnb/accessories.png" alt="accessories" />
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
                        : `/assets/images/detail/${item.local_detail_images[1]}`
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
export default LnbAcc;
