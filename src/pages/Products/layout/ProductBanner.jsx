import { useEffect, useState } from 'react';
import '../scss/ProductBanner.scss';
import { useParams } from 'react-router-dom';

let bannerImg = [
  { key: 'bags', url: '/assets/images/static/product/Product-bags.png' },
  { key: 'shoes', url: '/assets/images/static/product/Product-shoes.png' },
  { key: 'jewellery', url: '/assets/images/static/product/Product-jewellery.png' },
  { key: 'wallets', url: '/assets/images/static/product/Product-wallets.png' },
  { key: 'accessories', url: '/assets/images/static/product/Product-accessories.png' },
  { key: 'Closet', url: '/assets/images/static/product/Product-closet.png' },
  { key: 'Custom', url: '/assets/images/static/product/Product-custom.png' },
];

const ProductBanner = ({ korTitle, bannerTitle }) => {
  const { category1, category2 } = useParams();
  const [banner, setBanner] = useState('');

  useEffect(() => {
    const cate = category1 === 'CustomStudio' && category2 ? category2 : category1;
    setBanner(bannerImg.filter((img) => img.key === cate));
  }, [category1, category2]);

  return (
    <section className="ProductBanner">
      <div>
        <img src={banner[0]?.url} alt="" />
      </div>
      <div className="text-box">
        <span>{korTitle}</span>
        <h2>Miu Miu {bannerTitle}</h2>
      </div>
    </section>
  );
};

export default ProductBanner;
