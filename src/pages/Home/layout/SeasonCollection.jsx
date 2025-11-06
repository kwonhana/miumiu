import React, { useEffect } from 'react';
import '../scss/SeasonCollection.scss';
import WOW from 'wowjs';
import { Link } from 'react-router-dom';
import SwiperSlider from './SwiperSlider';

const items = [
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BA302_US0_F0002_V_OWO.png',
    alt: '5BA302_US0_F0002_V_OWO',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BB142_2CS4_F0393_V_OON.png',
    alt: '5BB142_2CS4_F0393_V_OON',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BB172_2CRW_F0NBL_V_OOO.png',
    alt: '5BB172_2CRW_F0NBL_V_OOO',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BB182_2IER_F0046_V_MOO.png',
    alt: '5BB182_2IER_F0046_V_MOO',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BB182_2IER_F0046_V_MOO.png',
    alt: '5BB182_2IER_F0046_V_MOO',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BC125_2IDK_F0036_V_OWS.png',
    alt: '5BC125_2IDK_F0036_V_OWS',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5BF131_2IEO_F0002_V_OOO.png',
    alt: '5BF131_2IEO_F0002_V_OOO',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5CC691_2IFT_F0151.png',
    alt: '5CC691_2IFT_F0151',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5D499E_054_F0003_F_015.png',
    alt: '5D499E_054_F0003_F_015',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5D563E_007_F0003_F_015.png',
    alt: '5D563E_007_F0003_F_015',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5HC369_2CWC_F04Z6.png',
    alt: '5HC369_2CWC_F04Z6',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5T515E_Z0G_F0F24_F_ZF15.png',
    alt: '5T515E_Z0G_F0F24_F_ZF15',
  },
  {
    imgUrl: './assets/images/static/main/SeasonCollection/5W315E_2KJ_F0002_F_G035.png',
    alt: '5W315E_2KJ_F0002_F_G035',
  },
];

const SeasonCollection = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);
  return (
    <section className="SeasonCollection">
      <div className="topSection">
        <div className="inner">
          <div className="left-container">
            <span>season collection</span>
            <h2>miu miu automne</h2>
          </div>
          <div className="right-container">
            <img src="/assets/images/static/main/SeasonCollection/SeasonCollection.png" alt="" />
          </div>
        </div>
      </div>
      <div className="bottomSection">
        <div className="item-container">
          <SwiperSlider item={items} direction="horizontal" perView="12" speed="1000" delay="0" />
        </div>
      </div>
    </section>
  );
};

export default SeasonCollection;
