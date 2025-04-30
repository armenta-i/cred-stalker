import { useNavigate } from 'react-router-dom';
import './Styles/Header.css';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <img src="/CredStalkerLogo.png" alt="Logo" style={{ width: '100px' }} />
      <h1>CredStalker</h1>
      <nav>
        <ul>
          <li><button className = "button" onClick={() => navigate('/')}>Home</button></li>
          </ul>
      </nav>
    </header>
  );
}
