import React, { useEffect } from 'react';
import WOW from 'wowjs';
import '../scss/MostLove.scss';
import { Link } from 'react-router-dom';

const items = [
  { title: '여성 핸드백', imgUrl: 'bags' },
  { title: '여성 구두', imgUrl: 'shoes' },
  { title: '지갑 & 카드홀더', imgUrl: 'wallets' },
  { title: '악세사리', imgUrl: 'acc' },
];

const MostLove = () => {
  useEffect(() => {
    new WOW.WOW().init();
  }, []);

  return (
    <section className="MostLove wow animate__animated  animate__fadeInUp" data-wow-delay="0.6s">
      <h2>MOST LOVED</h2>

      <div className="container">
        <ul className="item-box  ">
          {items.map((el, index) => {
            return (
              <li className="item" category={el.imgUrl} key={index}>
                <Link to={`/bags`}>
                  <div className="item-img">
                    <img
                      src={`/assets/images/static/main/mostLoved/${el.imgUrl}.png`}
                      alt={el.title}
                    />
                  </div>
                  <p className="title">{el.title}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default MostLove;
