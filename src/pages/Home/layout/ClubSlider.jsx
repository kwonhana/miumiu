import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const clubCard = [
  {
    src: '/assets/images/static/main/main_club_Swiper/5IB654_2E6Y_F0XMZ.jpg',
    alt: 'miumiu_acc',
    menu: '5IB654_2E6Y_F0XMZ',
    title: '버클 장식 가죽 팔찌',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5IC206_2IDA_F04R9.jpg',
    alt: 'miumiu_acc',
    menu: '5IC206_2IDA_F04R9',
    title: '메탈 및 가죽 목걸이',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5IC245_2IET_F04KZ.jpg',
    alt: 'miumiu_acc',
    menu: '5IC245_2IET_F04KZ',
    title: '크리스털 장식 메탈 목걸이',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5IO132_2F89_F0SAJ.jpg',
    alt: 'miumiu_acc',
    menu: '5IO132_2F89_F0SAJ',
    title: '메탈 및 인조 진주 이어링',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5IO259_2IDA_F061L.jpg',
    alt: 'miumiu_acc',
    menu: '5IO259_2IDA_F061L',
    title: '메탈 및 가죽 이어링',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5IO292_2IDS_F0236.jpg',
    alt: 'miumiu_acc',
    menu: '5IO292_2IDS_F0236',
    title: '에나멜 메탈 이어링',
  },
];
const clubCard2 = [
  {
    src: '/assets/images/static/main/main_club_Swiper/5IO319_2IEU_F0NXA.jpg',
    alt: 'miumiu_acc',
    menu: '5IO319_2IEU_F0NXA',
    title: '크리스털 장식 메탈 이어링',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5IS132_2IEV_F0056.jpg',
    alt: 'miumiu_acc',
    menu: '5IS132_2IEV_F0056',
    title: '메탈 브로치',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5JC871_2DNC_F0OKL.jpg',
    alt: 'miumiu_acc',
    menu: '5JC871_2DNC_F0OKL',
    title: '크리스털 네크리스',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5JO661_2DNC_F0OKL.jpg',
    alt: 'miumiu_acc',
    menu: '5JO661_2DNC_F0OKL',
    title: '크리스털 장식 펜던트 이어링',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5JO849_2DTU_F0056.jpg',
    alt: 'miumiu_acc',
    menu: '5JO849_2DTU_F0056',
    title: '미우 로고 귀걸이',
  },
  {
    src: '/assets/images/static/main/main_club_Swiper/5JO912_2F6T_F0399.jpg',
    alt: 'miumiu_acc',
    menu: '5JO912_2F6T_F0399',
    title: '에나멜 메탈 귀걸이',
  },
];

const CulbSlider = () => {
  const [Scard, setScard] = useState(false);
  return (
    <div
      className="club-slides"
      onMouseEnter={() => setScard(true)}
      onMouseLeave={() => setScard(false)}>
      <div className={`slider-card ${Scard ? 'paused' : ''}`}>
        <ul className="card-container">
          {clubCard.concat(clubCard).map((c, id) => {
            return (
              <li className="card-box" key={id}>
                <Link>
                  <img src={c.src} alt={c.alt} />
                  <p className="card-menu">{c.menu}</p>
                  <span className="card-title">{c.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`slider-card2 ${Scard ? 'paused' : ''}`}>
        <ul className="card-container">
          {clubCard2.concat(clubCard2).map((c, id) => {
            return (
              <li className="card-box" key={id}>
                <Link>
                  <img src={c.src} alt={c.alt} />
                  <p className="card-menu">{c.menu}</p>
                  <span className="card-title">{c.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CulbSlider;
