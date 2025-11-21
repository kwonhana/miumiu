import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { shoes } from '../../../store/data';
import { useProductsStore } from '../../../store/useProductsStore';
import '../scss/lnbSub.scss';

const Lnbshoes = ({ isActive }) => {
  const allItems = useProductsStore((state) => state.items);
  const randomItems = useMemo(() => {
    if (allItems.length === 0) {
      return [];
    }
    const shoesOnly = allItems.filter((item) => item.category1 === 'shoes');
    const shuffled = [...shoesOnly].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [allItems]);
  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">슈즈</p>
            <ul className="lnb-sub-menus">
              {shoes.map((shoe) => (
                <li className="lnb-menuList" key={shoe.alt}>
                  <Link to={`/shoes/${shoe.alt2}`}>{shoe.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <div>
                <img src="/assets/images/lnb/shoes-list.jpg" alt="bag" />
              </div>
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

export default Lnbshoes;
