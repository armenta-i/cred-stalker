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
          <li><button onClick={() => navigate('/')}>Home</button></li>
          <li><button onClick={() => navigate('/Breaches')}>Breaches</button></li>
          <li><button onClick={() => navigate('/PswdUtils')}>Pasword Utility</button></li>
        </ul>
      </nav>
    </header>
  );
}
