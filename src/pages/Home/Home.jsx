import React from 'react';
import NewItemMain from './layout/NewItemMain';
import AutomneBi from './layout/AutomneBi';
import LineBanner from './layout/LineBanner';
import MostLove from './layout/MostLove';
import Main from './layout/Main';
import SeasonCollection from './layout/SeasonCollection';
import './scss/home.scss';
import CousLet from './layout/CouLet';
import MiuClub from './layout/MiuClub';
import SpeclalCo from './layout/SpeclalCo';
import AddressInput from '../../component/input/AddressInput';
import EmailInput from '../../component/input/EmailInput';
import PasswordInput from '../../component/input/PasswordInput';
import SearchInput from '../../component/input/SearchInput';
import { TextInput } from '../../component/input/TextInput';
import AuthInput from '../../component/input/AuthInput';
import BirthdayInput from '../../component/input/BirthdayInput';

const Home = () => {
  return (
    <main className="main">
      <Main />
      <div className="inner">
        <NewItemMain />
      </div>
      {/* <LineBanner /> */}
      <div className="inner">
        <AutomneBi />
        <MostLove />
      </div>
      <LineBanner />
      <SeasonCollection />
      <SpeclalCo />
      <MiuClub />
      <CousLet />
      <AddressInput />
      <EmailInput />
      <PasswordInput />
      <AuthInput />
      <SearchInput />
      <TextInput />
      <BirthdayInput />
    </main>
  );
};

export default Home;
