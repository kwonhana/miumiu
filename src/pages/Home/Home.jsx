import React from 'react';
import NewItemMain from './layout/NewItemMain';
import AutomneBi from './layout/AutomneBi';
import LineBanner from './layout/LineBanner';
import MostLove from './layout/MostLove';
import SeasonCollection from './layout/SeasonCollection';
import './scss/home.scss';
import Main from './Main';

const Home = () => {
  return (
    <main className="main">
      <Main />
      <div className="inner">
        <NewItemMain />
      </div>
      <LineBanner />
      <div className="inner">
        <AutomneBi />
        <MostLove />
      </div>
      <LineBanner />
      <SeasonCollection />
    </main>
  );
};

export default Home;
