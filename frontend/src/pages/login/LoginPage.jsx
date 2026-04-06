import React from 'react';
import "./LoginPage.css";
import googleLogo from '../../assets/googleLogo.png';
import './LoginPage.css';

const LoginPage = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Link-It!</h1>
        <p>단 한 번의 로그인으로  <br />
           평생 사용할 명함을  <br />
           디지털으로 옮겨보세요!
        </p>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src={googleLogo} alt="Google Logo" />
          Google 계정으로 로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;