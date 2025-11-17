import React from 'react';
import '../scss/ProductBanner.scss';
import { useParams } from 'react-router-dom';

const ProductBanner = ({ bannerTitle }) => {
  const { category1 } = useParams();

  console.log('보자고', category1);
  return (
    <section className="ProductBanner">
      <span>{bannerTitle}</span>
      <h2>{bannerTitle}</h2>
    </section>
  );
};

export default ProductBanner;
