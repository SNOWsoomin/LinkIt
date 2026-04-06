import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import LoginPage from './pages/login/LoginPage.jsx';
import RegisterPage from './pages/registerCard/RegisterCardPage';
import MyCardPage from './pages/myCard/MyCardPage';
import CardWalletPage from './pages/cardWallet/CardWalletPage.jsx';
import SharedCardView from './pages/share/SharedCardView';

import Navbar from './components/Navbar';

import axios from 'axios';

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

function Layout() {
  const location = useLocation();

  const hideNavbarPaths = ['/', '/login'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <div className="App">
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-card" element={<MyCardPage />} />
        <Route path="/wallet" element={<CardWalletPage />} />
        <Route path="/cards/shared" element={<SharedCardView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;