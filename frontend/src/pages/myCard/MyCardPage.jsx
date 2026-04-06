import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import html2canvas from 'html2canvas';
import './MyCardPage.css';

function MyCardPage() {
  const [myInfo, setMyInfo] = useState(null);
  const [shareToken, setShareToken] = useState('');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));
  const cardRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email');
    const currentEmail = emailParam || localStorage.getItem('userEmail');

    if (currentEmail) {
      localStorage.setItem('userEmail', currentEmail);
      setUserEmail(currentEmail);

      axios.get(`http://localhost:8080/api/cards/my?email=${currentEmail}`)
      .then(response => {
        setMyInfo(response.data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    }
  }, []);

  const handleGenerateShareToken = async () => {
    if (!userEmail) {
      alert("로그인 정보가 없습니다.");
      return;
    }
    
    try {
      const response = await axios.post(`http://localhost:8080/api/share/token?email=${userEmail}`, {});
      
      const token = response.data.share_token;
      
      if (token) {
        setShareToken(token);
        alert("공유 링크가 생성되었습니다.");
      } else {
        throw new Error("토큰이 비어있습니다.");
      }
    } catch (error) {
      console.error('Token error:', error);
      alert(`공유 링크 생성 실패: ${error.response?.data || "서버 응답 없음"}`);
    }
  };

  const downloadCardAsPng = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: null,
    });
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${myInfo.name}_명함.png`;
    link.click();
  };

  const shareUrl = shareToken ? `${window.location.origin}/cards/shared?token=${shareToken}` : '';

  if (!userEmail) return <div className="shared-view-container">로그인 정보가 없습니다.</div>;
  if (!myInfo) return <div className="shared-view-container">{userEmail}님의 정보를 불러오는 중입니다...</div>;

  return (
    <div className="shared-view-container">
      <div className="card-wrapper" ref={cardRef}>
        <div className="card-content">
          <div>
            <h1>{myInfo.name || '-'}</h1>
            <p className="eng-name">{myInfo.engName || myInfo.eng_name || '-'}</p>
          </div>
          <hr />
          <div className="info-grid">
            <p><strong>소속:</strong> {myInfo.companyName || myInfo.company_name || '-'} | {myInfo.teamName || myInfo.team_name || '-'}</p>
            <p><strong>직급:</strong> {myInfo.position || '-'}</p>
            <p><strong>연락처:</strong> {myInfo.companyPhone || myInfo.company_phone || '-'} | {myInfo.personalPhone || myInfo.personal_phone || '-'}</p>
            <p><strong>이메일:</strong> {myInfo.companyEmail || myInfo.company_email || '-'} | {myInfo.personalEmail || myInfo.personal_email || '-'}</p>
            <p><strong>주소:</strong> {myInfo.companyAddress || myInfo.company_address || '-'}</p>
          </div>
        </div>
      </div>

      <div className="share-section">
        <button 
          onClick={handleGenerateShareToken} 
          className="btn-primary btn-generate"
        >
          공유 링크 생성
        </button>

        {shareUrl && (
          <div className="card-wrapper share-result-box">
            <div className="qr-container">
              <QRCodeCanvas value={shareUrl} size={180} />
            </div>

            <div className="url-container">
              <p className="url-text">
                🔗 <a href={shareUrl} target="_blank" rel="noopener noreferrer">{shareUrl}</a>
              </p>
            </div>

            <hr className="share-divider" />

            <div className="action-buttons">
              <button 
                className="btn-secondary"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert('링크가 클립보드에 복사되었습니다.');
                }}
              >
                URL 복사
              </button>
              <button 
                className="btn-secondary"
                onClick={downloadCardAsPng}
              >
                명함 PNG 저장
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyCardPage;