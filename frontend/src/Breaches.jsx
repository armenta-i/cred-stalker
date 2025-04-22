import './Styles/Breaches.css';
import Header from './Header';
import { useLocation } from 'react-router-dom';

export default function Breaches() {
  const location = useLocation();
  const Data = location.state;

  // console.log("Data", Data);

  return (
    <>
      <Header />
      <div className="breaches">
        <h1>Compromised Credentials</h1>
        <ul className="breach-list">
          {Array.isArray(Data?.result) &&
            Data.result.map((item, index) => (
              <CredentialItem
                key={index}
                email={item.email}
                password={item.password}
                sources={item.sources}
              />
            ))}
        </ul>
      </div>
    </>
  );
}

function CredentialItem({ email, password, sources }) {
  const showChangeButton = sources && sources.toLowerCase() !== 'unknown';

  return (
    <li className="credential-item">
      <div className="credential-block">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Password:</strong> {password}</p>
        <p><strong>Sources:</strong> {sources}</p>
        {showChangeButton && <ChangepswdBtn source={sources} />}
      </div>
    </li>
  );
}

function ChangepswdBtn({ source }) {
  const handleChangePassword = async () => {
    try {
      const response = await fetch(`http://localhost:8000/search_company_site?company=${encodeURIComponent(source)}&query=change password`);
      const data = await response.json();

      if (data.link) {
        window.open(data.link, '_blank');
      } else {
        alert('No change password page found for this company.');
      }
    } catch (error) {
      console.error('Error fetching change password page:', error);
      alert('An error occurred while searching for the change password page.');
    }
  };

  return (
    <button className="CPDbutton" onClick={handleChangePassword}>
      Change Password
    </button>
  );
}
