import React from 'react';
import '../scss/ProductBanner.scss';

const ProductBanner = ({ korTtle, bannerTitle }) => {
  return (
    <section className="ProductBanner">
      <span>{korTtle}</span>
      <h2>Miu Miu {bannerTitle}</h2>
    </section>
  );
};

export default ProductBanner;
