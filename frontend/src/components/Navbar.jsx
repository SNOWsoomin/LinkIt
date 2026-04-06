import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.google?.accounts.id.disableAutoSelect();

    localStorage.clear();
    sessionStorage.clear();

    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">LinkIt</h2>

      <ul className="menu">
        <li><Link to="/my-card">내 명함</Link></li>
        <li><Link to="/wallet">명함첩</Link></li>
        <li>
          <button className="logout-btn" onClick={handleLogout}>
            로그아웃
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;