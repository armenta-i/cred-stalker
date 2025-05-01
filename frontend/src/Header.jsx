import { useNavigate } from 'react-router-dom';
import './Styles/Header.css';
// import detective_logo from './assets/detective_png.png';
import detective_svg from '../public/CredStalkerLogo_Updated.png';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <img src={detective_svg} alt="Logo" style={{ width: '100px' }} />
      <h1>CredStalker</h1>
      <nav>
        <ul>
          <li><button className = "button" onClick={() => navigate('/')}>Home</button></li>
          </ul>
      </nav>
    </header>
  );
}
