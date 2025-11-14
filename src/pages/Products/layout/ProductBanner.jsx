import React from 'react';

const ProductBanner = ({ bannerTitle }) => {
  return (
    <section className="ProductBanner">
      <span>{bannerTitle}</span>
      <h2>{bannerTitle}</h2>
    </section>
  );
};

export default ProductBanner;
