import React from 'react';
import NewItemMain from './layout/NewItemMain';
import AutomneBi from './layout/AutomneBi';
import LineBanner from './layout/LineBanner';
import MostLove from './layout/MostLove';
import Main from './layout/Main';
import SeasonCollection from './layout/SeasonCollection';
import './scss/home.scss';

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
