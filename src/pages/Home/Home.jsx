import React from 'react';
import NewItemMain from './layout/NewItemMain';
import AutomneBi from './layout/AutomneBi';
import LineBanner from './layout/LineBanner';
import MostLove from './layout/MostLove';
import SeasonCollection from './layout/SeasonCollection';
import './scss/home.scss';

const Home = () => {
  return (
    <main className="main">
      <div className="inner">
        <NewItemMain />
        <AutomneBi />
        <MostLove />
      </div>
      <LineBanner />
      <SeasonCollection />
    </main>
  );
};

export default Home;
