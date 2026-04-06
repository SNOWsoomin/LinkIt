import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CardWalletPage.css';

function CardWalletPage() {
  const [friendCards, setFriendCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      axios.get(`http://localhost:8080/api/wallet?email=${userEmail}`)
        .then(response => {
          setFriendCards(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('명함첩 조회 실패:', error);
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <div className="wallet-container">명함을 불러오는 중입니다...</div>;

  return (
    <div className="wallet-container">
      <h2>내 명함첩</h2>
      <div className="card-grid">
        {friendCards.map((card, index) => (
          <div key={index} className="wallet-card">
            <h3>
              {card.name} 
              <small style={{fontSize: '12px', color: 'var(--accent)', marginLeft: '8px'}}>
                {card.eng_name || card.engName || '-'}
              </small>
            </h3>
            <div className="wallet-info">
              <p><strong>소속:</strong> {card.company_name || card.companyName } | {card.team_name || card.teamName }</p>
              <p><strong>직급:</strong> {card.position }</p>
              <p><strong>연락처:</strong> {card.company_phone || card.companyPhone } | {card.personal_phone || card.personalPhone }</p>
              <p><strong>이메일:</strong> {card.company_email || card.companyEmail } | {card.personal_email || card.personalEmail }</p>
            </div>
          </div>
        ))}
        {friendCards.length === 0 && (
          <p className="empty-msg">아직 저장된 명함이 없습니다.<br />QR 코드를 통해 명함을 추가해보세요!</p>
        )}
      </div>
    </div>
  );
}

export default CardWalletPage;