import { Link } from 'react-router-dom';
import { bags } from '../../../store/data';
import { useProductsStore } from '../../../store/useProductsStore';
import { useMemo } from 'react';
import '../scss/lnbSub.scss';

const LnbBags = ({ isActive }) => {
  const allItems = useProductsStore((state) => state.items);
  const randomItems = useMemo(() => {
    if (allItems.length === 0) {
      return [];
    }
    const bagsOnly = allItems.filter((item) => item.category1 === 'bags');
    const shuffled = [...bagsOnly].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [allItems]);

  return (
    <div className={`lnb-box ${isActive ? '' : 'hidden'}`}>
      <div className="lnb-inner">
        <div className="lnb-left">
          <div className="lnb-menus">
            <p className="lnb-menus-title">가방</p>
            <ul className="lnb-sub-menus">
              {bags.map((bag) => (
                <li className="lnb-menuList" key={bag.alt}>
                  <Link to={`/bags/${bag.alt2}`}>{bag.alt}</Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="lnb-img">
            <li>
              <Link>
                <img src="/assets/images/lnb/bags-list.jpg" alt="bag" />
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

export default LnbBags;
