import './App.scss';

import 'animate.css/animate.min.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/auth/login/Login';
import Footer from './pages/footer/Footer';
import Join from './pages/auth/join/Join';
import Mypage from './pages/auth/MyPage/Mypage';
import OAuthRedirect from './pages/auth/OAuthRedirect/OAuthRedirect';
import ResetID from './pages/auth/ResetID/ResetID';
import ResetPassword from './pages/auth/ResetPassword/ResetPassword';
import VerifyEmail from './pages/auth/VerifyEmail/VerifyEmail';
import Cart from './pages/Checkout/Cart/Cart';
import { Coupon } from './pages/Checkout/Coupon/Coupon';
import OrderComplete from './pages/Checkout/OrderComplete/OrderComplete';
import OrderSummary from './pages/Checkout/OrderSummary/OrderSummary';
import Payment from './pages/Checkout/Payment/Payment';
import { Shipping } from './pages/Checkout/Shipping/Shipping';

function App() {
  return (
    <>
      {/* <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
        <Route path="/productdetail" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/ordercomplete" element={<OrderComplete />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer /> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path="maypage" element={<Mypage />} />
        <Route path="oauthredirect" element={<OAuthRedirect />} />
        <Route path="resetid" element={<ResetID />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="verifyemail" element={<VerifyEmail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="coupon" element={<Coupon />} />
        <Route path="orderComplete" element={<OrderComplete />} />
        <Route path="ordersummary" element={<OrderSummary />} />
        <Route path="payment" element={<Payment />} />
        <Route path="shipping" element={<Shipping />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
