import './Styles/Breaches.css';
import Header from './Header';
import Data from './Data/Data.json'; // Make sure this is an array!
 
export default function Breaches() {
  console.log("Data", Data);
  console.log("Data.results", Data.result);
  return (
    <>
    <Header />
    <div className="breaches">
      <h1>Compromised Credentials</h1>
      <ul className="breach-list">
      
      {Array.isArray(Data.result) && Data.result.map((item, index) => (
        <CredentialItem
        key={index}
        email={item.email}
        password={item.password}
        sources={item.sources[0]}
        />
      )
    )}
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
        {/* Only show button if source is valid */}
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


