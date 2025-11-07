import React from 'react';
import '../scss/speclalCo.scss';

const speclal = [
  { title1: 'MIU MIU', title2: 'CUSTOM STUDIO', imgUrl: 'Custom' },
  { title1: 'MIU CLOSET', imgUrl: 'Closet' },
];

const SpeclalCo = () => {
  return (
    <section className="speclalCol-wrap">
      <div className="inner">
        <h2>SPECLAL CLLECTION</h2>
        <ul className="speclal-item">
          {speclal.map((img, key) => (
            <li
              className={`speclal-item-box`}
              key={key}
              style={{
                backgroundImage: `url(/assets/images/static/main/SpeclalCo/${img.imgUrl}.jpg)`,
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

export default SpeclalCo;
