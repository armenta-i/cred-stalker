import { useState } from 'react';
import './Styles/Input.css';

export default function Input() {
  const [credential, setCredential] = useState('');//Handle Credential input
  const [inputType, setInputType] = useState('password');//Handle input type (username or email)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const endpoint =
        inputType === "password"
          ? `http://localhost:8000/check/${encodeURIComponent(credential)}`
          : `http://localhost:8000/breach_directory/${encodeURIComponent(credential)}`;
  
      const res = await fetch(endpoint);
      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  
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
          placeholder="Enter password or email"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="inputType"
              value="password"
              checked={inputType === 'password'}
              onChange={() => setInputType('password')}
            />
            Password
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
