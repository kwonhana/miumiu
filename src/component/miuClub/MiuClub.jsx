import React from "react";
import CulbSlider from "./CulbSlider";
import "../../styles/clubLayout.scss";

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
        <CulbSlider />
      </div>
    </section>
  );
};

export default MiuClub;
