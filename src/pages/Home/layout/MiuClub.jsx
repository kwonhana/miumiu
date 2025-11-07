import React from 'react';
import '../scss/club.scss';
import CulbSlider from './ClubSlider';

const MiuClub = () => {
  return (
    <section className="miu-club-wrap">
      <div className="inner">
        <div className="club-title">
          <h2>MIU MIU CLUB</h2>
          <p>
            미우미우의 다양한 컬렉션과 스페셜 프로젝트를
            <br />
            만나보세요
          </p>
        </div>
        <CulbSlider />
      </div>
    </section>
  );
};

export default MiuClub;
