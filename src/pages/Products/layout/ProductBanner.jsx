import React from 'react';
import '../scss/ProductBanner.scss';

const ProductBanner = ({ korTitle, bannerTitle }) => {
  return (
    <section className="ProductBanner">
      <span>{korTitle}</span>
      <h2>Miu Miu {bannerTitle}</h2>
    </section>
  );
};

export default ProductBanner;
