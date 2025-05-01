import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Styles/Header.css';
import detective_svg from '../public/CredStalkerLogo_Updated.png';

export default function Header() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-logo">
        <img 
          src={detective_svg} 
          alt="CredStalker Logo" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        />
        <h1>CredStalker</h1>
      </div>
      <nav>
        <ul>
          <li>
            <button className="button" onClick={() => navigate('/')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Home
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}