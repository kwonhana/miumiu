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
// import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import { useProductsStore } from './store/useProductsStore';
import { useEffect } from 'react';
import Local from './pages/customer/Local';
import ProductBanner from './pages/Products/layout/ProductBanner';
import ProductDetailNav from './pages/Products/layout/ProductDetailNav';
import AllProducts from './pages/Products/AllProducts';
import ProductFilterWrap from './pages/Products/layout/ProductFilterWrap';
import SearchResult from './pages/Products/SearchResult';
import Category1 from './pages/Products/Category1';
import Category2 from './pages/Products/Category2';
import ScrollToTop from './ScrollToTop';
import WIshList from './pages/auth/WishList/WIshList';
import MyOrder from './pages/Checkout/MyOrder/MyOrder';
import CustomStudio from './pages/Products/CustomStudio';

function App() {
  const { onFetchItems, onMakeMenu } = useProductsStore();
  useEffect(() => {
    onFetchItems();
    onMakeMenu();
  }, [onFetchItems, onMakeMenu]);
  return (
    <>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* auth */}
        <Route path="login" element={<Login />} />
        <Route path="join" element={<Join />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="OAuthRedirect" element={<OAuthRedirect />} />
        <Route path="resetId" element={<ResetID />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="verifyEmail" element={<VerifyEmail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="coupon" element={<Coupon />} />
        <Route path="orderComplete" element={<OrderComplete />} />
        <Route path="orderSummary" element={<OrderSummary />} />
        <Route path="payment" element={<Payment />} />
        <Route path="shipping" element={<Shipping />} />
        <Route path="wishlist" element={<WIshList />} />
        <Route path="myOrder" element={<MyOrder />} />
        <Route path="searchResult" element={<SearchResult />} />
        {/* <Route path="/:category1" element={<Products />} />
        <Route path="/:category1/:category2" element={<Products />} />
        <Route path="/:category1/tag/:tags" element={<Products />} />
        <Route path="/:category1/:category2/tag/:tags" element={<Products />} />
        <Route path="/:category1/tag/:tags/:category2" element={<Products />} /> */}
        <Route path="/:category1" element={<Category1 />} />
        <Route path="/:category1/:category2" element={<Category2 />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="local" element={<Local />} />
        <Route path="ProductBanner" element={<ProductBanner />} />
        <Route path="ProductDetailNav" element={<ProductDetailNav />} />
        <Route path="AllProducts" element={<AllProducts />} />
        <Route path="ProductFilterWrap" element={<ProductFilterWrap />} />
        {/* <Route path="/CustomStudio/:id" element={<CustomStudio />} /> */}
        {/* <Route path="/CustomStudio/:id" element={<Category1 />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
