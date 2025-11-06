import React, { useEffect } from 'react';
import '../scss/SeasonCollection.scss';
import WOW from 'wowjs';
import { Link } from 'react-router-dom';

const items = [
  { no: '5BA302_US0_F0002_V_OWO' },
  { no: '5BB142_2CS4_F0393_V_OON' },
  { no: '5BB172_2CRW_F0NBL_V_OOO' },
  { no: '5BB182_2IER_F0046_V_MOO' },
  { no: '5BB182_2IER_F0046_V_MOO' },
  { no: '5BC125_2IDK_F0036_V_OWS' },
  { no: '5BF131_2IEO_F0002_V_OOO' },
  { no: '5CC691_2IFT_F0151' },
  { no: '5D499E_054_F0003_F_015' },
  { no: '5D563E_007_F0003_F_015' },
  { no: '5HC369_2CWC_F04Z6' },
  { no: '5T515E_Z0G_F0F24_F_ZF15' },
  { no: '5W315E_2KJ_F0002_F_G035' },
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
          {items.map((el) => {
            return (
              <div className="item">
                <Link>
                  <img
                    src={`/assets/images/static/main/SeasonCollection/${el.no}.png`}
                    alt={el.no}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SeasonCollection;
