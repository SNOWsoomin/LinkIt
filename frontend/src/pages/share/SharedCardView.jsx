import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './SharedCardView.css';

const SharedCardView = () => {
  const location = useLocation();
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  useEffect(() => {
    if (!token) {
      setErrorMsg('유효한 공유 토큰이 없습니다.');
      setLoading(false);
      return;
    }

    axios.get(`http://localhost:8080/api/shared-view`, {
      params: { token: token }
    })
    .then(response => {
      if (response.data) {
        setCardData(response.data);
      } else {
        setErrorMsg('명함 정보를 찾을 수 없습니다.');
      }
      setLoading(false);
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        setErrorMsg('서버에서 페이지를 찾을 수 없습니다(404).');
      } else {
        setErrorMsg('서버와 통신 중 오류가 발생했습니다.');
      }
      setLoading(false);
    });
  }, [token]);

  const handleSaveToWallet = async () => {
    const myEmail = localStorage.getItem('userEmail');
    if (!myEmail) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/api/wallet/save`, {
        owner_email: myEmail,
        share_token: token
      });
      alert("명함첩에 저장되었습니다!");
    } catch (error) {
      const msg = error.response?.data || "저장에 실패했습니다. 이미 저장되었거나 서버 오류입니다.";
      alert(msg);
    }
  };

  if (loading) return <div className="shared-view-container">정보를 불러오는 중입니다...</div>;
  if (errorMsg) return <div className="shared-view-container">{errorMsg}</div>;
  if (!cardData) return null;

  return (
    <div className="shared-view-container">
      <div className="card-wrapper">
        <div className="card-content">
          <div>
            <h1>{cardData.name || '-'}</h1>
            <p className="eng-name">{cardData.eng_name || cardData.engName || '-'}</p>
          </div>
          <hr />
          <div className="info-grid">
            <p><strong>소속:</strong> {cardData.company_name || cardData.companyName || '-'} / {cardData.team_name || cardData.teamName || '-'}</p>
            <p><strong>직급:</strong> {cardData.position || '-'}</p>
            <p><strong>연락처:</strong> {cardData.company_phone || cardData.companyPhone || '-'} / {cardData.personal_phone || cardData.personalPhone || '-'}</p>
            <p><strong>이메일:</strong> {cardData.company_email || cardData.companyEmail || '-'} / {cardData.personal_email || cardData.personalEmail || '-'}</p>
            <p><strong>주소:</strong> {cardData.company_address || cardData.companyAddress || '-'}</p>
          </div>
        </div>
      </div>
      <div className="share-section">
        <button onClick={handleSaveToWallet} className="btn-primary">
          내 명함첩에 저장하기
        </button>
      </div>
    </div>
  );
};

export default SharedCardView;