import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import OurStore from './pages/OurStore';
import Blogs from './pages/Blogs';
import CompareProduct from './pages/CompareProduct';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element= {<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="store" element={<OurStore/>}/>
          <Route path="blogs" element={<Blogs/>}/>
          <Route path="compare-product" element={<CompareProduct/>}/>
          <Route path="wishlist" element={<Wishlist/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="reset-password" element={<ResetPassword/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
