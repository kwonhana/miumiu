import React, { useEffect, useState } from 'react';
import '../scss/main.scss';
import '../scss/keyframes.scss';
import WOW from 'wowjs';

const introItems = [
  { data: 'miumiunux_1.jpg' },
  { data: 'miumiunux_2.avif' },
  { data: 'miumiunux_3.avif' },
  { data: 'miumiunux_4.avif' },
  { data: 'miumiunux_5.avif' },
  { data: 'miumiunux_6.avif' },
  { data: 'miumiunux_7.avif' },
  { data: 'miumiunux_8.avif' },
  { data: 'miumiunux_9.avif' },
  { data: 'miumiunux_10.avif' },
  { data: 'miumiunux_11.avif' },
  { data: 'miumiunux_12.avif' },
];

const Main = () => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    new WOW.WOW().init();
    const randomImg = [...introItems].sort(() => 0.5 - Math.random());
    setRandomItems(randomImg.slice(0, 1));
  }, []);

  return (
    <div className="intro">
      {randomItems.map((el, index) => {
        return (
          <div
            className={`poto-box`}
            key={index}
            style={{ backgroundImage: `url(/assets/images/static/intro/${el.data})` }}>
            {/* <strong >Miu Miu Automne</strong> */}
          </div>
        );
      })}
      ;
      {/* <div className={`logo-wrapper`}>
        <Logo />
      </div> */}
    </div>
  );
};

export default Main;
