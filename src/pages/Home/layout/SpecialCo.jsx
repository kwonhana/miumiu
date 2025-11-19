import React from 'react';
import '../scss/specialCo.scss';
import { special } from '../../../store/data';

const SpecialCo = () => {
  return (
    <section className="specialCo-wrap">
      <div className="inner">
        <h2>SPECIAL COLLECTION</h2>
        <ul className="special-item">
          {special.map((img, key) => (
            <li
              className={`special-item-box wow animate__animated animate__zoomIn`}
              data-wow-delay="0.6s"
              key={key}
              style={{
                backgroundImage: `url(/assets/images/static/main/SpecialCo/${img.imgUrl}.jpg)`,
              }}>
              <div className="text-wrap">
                <p className="sp-text1">{img.title1}</p>
                {img.title2 && <p className="sp-text2">{img.title2}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SpecialCo;
