import { useState } from 'react';
import './Styles/Input.css';

export default function Input() {
  const [credential, setCredential] = useState('');//Handle Credential input
  const [inputType, setInputType] = useState('username');//Handle input type (username or email)

  const handleSubmit = (e) => {
    e.preventDefault();//add missing implementation for calls to api to check breaches
    // Navigate(/)

    console.log(`Scanning ${inputType}: ${credential}`);
  };

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit} className="input-form">
        <label htmlFor="credential">Enter your Credential:</label>
        <input
          type="text"
          id="credential"
          name="credential"
          placeholder="Enter username or email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="inputType"
              value="username"
              checked={inputType === 'username'}
              onChange={() => setInputType('username')}
            />
            Username
          </label>

          <label>
            <input
              type="radio"
              name="inputType"
              value="email"
              checked={inputType === 'email'}
              onChange={() => setInputType('email')}
            />
            Email
          </label>
        </div>

        <button type="submit">Stalk</button>
      </form>
    </div>
  );
}
