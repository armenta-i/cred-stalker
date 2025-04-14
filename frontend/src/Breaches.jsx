import './Styles/Breaches.css';
import Header from './Header';
import { useLocation } from 'react-router-dom';

export default function Breaches() {
  const location = useLocation();
  const Data = location.state;

  console.log("Data", Data);

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
  const handleChangePassword = () => {
    const url = `https://${source}`;
    window.open(url, '_blank');
  };

  return (
    <button className="CPDbutton" onClick={handleChangePassword}>
      Change Password
    </button>
  );
}
