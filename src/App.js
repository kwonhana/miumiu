import './App.scss';
import Header from './component/layout/Header';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetail from './pages/Products/ProductDetail';
import Cart from './pages/Checkout/Cart';
import { Coupon } from './pages/Checkout/Coupon';
import OrderComplete from './pages/Checkout/OrderComplete';
import OrderSummary from './pages/Checkout/OrderSummary';
import Payment from './pages/Checkout/Payment';
import Footer from './component/layout/Footer';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import 'animate.css/animate.min.css';

function App() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default App;
