import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './RegisterCardPage.css'; // CSS 파일 연결

function RegisterCardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    engName: '',
    companyName: '',
    teamName: '',
    position: '',
    companyImg: '',
    companyPhone: '',
    personalPhone: '',
    companyEmail: '',
    personalEmail: '',
    companyAddress: '',
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get('email');

    if (emailFromUrl) {
      localStorage.setItem('userEmail', emailFromUrl);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userEmail = localStorage.getItem('userEmail');
      
      if (!userEmail) {
        alert('로그인 정보가 없습니다.');
        return;
      }

      await axios.post(`http://localhost:8080/api/cards/register?email=${userEmail}`, formData);

      alert('명함이 성공적으로 등록되었습니다!');
      navigate('/my-card');
    } catch (error) {
      console.error('명함 등록 실패:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="wallet-container">
      <h2>명함 정보 입력</h2>
      
      <div className="register-card-wrapper">
        <div className="wallet-card register-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <span className="form-label">이름</span>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="홍길동" />
            </div>

            <div className="form-row">
              <span className="form-label">영문 이름</span>
              <input type="text" name="engName" value={formData.engName} onChange={handleChange} required placeholder="Gildong Hong" />
            </div>

            <div className="form-row">
              <span className="form-label">회사명</span>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>

            <div className="form-row">
              <span className="form-label">부서/팀</span>
              <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} />
            </div>

            <div className="form-row">
              <span className="form-label">직급</span>
              <input type="text" name="position" value={formData.position} onChange={handleChange} />
            </div>

            <div className="form-row">
              <span className="form-label">로고 URL</span>
              <input type="text" name="companyImg" value={formData.companyImg} onChange={handleChange} />
            </div>

            <div className="form-row">
              <span className="form-label">회사 전화</span>
              <input type="text" name="companyPhone" value={formData.companyPhone} onChange={handleChange} />
            </div>

            <div className="form-row">
              <span className="form-label">휴대폰</span>
              <input type="tel" name="personalPhone" value={formData.personalPhone} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <span className="form-label">회사 이메일</span>
              <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleChange} />
            </div>

            <div className="form-row">
              <span className="form-label">개인 이메일</span>
              <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <span className="form-label">회사 주소</span>
              <input type="text" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />
            </div>

            <button type="submit" className="register-submit-btn">명함 등록하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterCardPage;