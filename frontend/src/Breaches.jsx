import './Styles/Breaches.css';
import Header from './Header';
export default function Breaches() {
  
  const fakeData = [
    { 
      site: 'example.com',
      email: 'user1@example.com',
      password: '123456' 
    },
    { 
      site: 'coolapp.io',
      email: 'hacker@coolmail.com', 
      password: 'p@ssw0rd' 
    },
    { 
      site: 'oldsite.net', 
      email: 'john@old.net', 
      password: 'qwerty' 
    },
  ];

  return (
    <div className="breaches">
      <h1>Compromised Credentials</h1>
      <ul className="breach-list">
        {fakeData.map((item, index) => (
          <CredentialItem
            key={index}
            site={item.site}
            email={item.email}
            password={item.password}
          />
        ))}
      </ul>
    </div>
  );
}

function CredentialItem({ site, email, password }) {
  return (
    <>
    <Header/>
    <li className="credential-item">
      <div className="credential-block">
        <p><strong>Website:</strong> {site}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Password:</strong> {password}</p>
        <ChangepswdBtn/>
      </div>
    </li>
    </>
  );
}

function ChangepswdBtn(){

  const handleChangePassword = (e) => {
    console.log('Change Password button clicked!');
  }
  return (
    <button className="change-password-btn">Change Password</button>
  );
}