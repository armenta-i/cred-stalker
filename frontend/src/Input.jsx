import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ⬅️ import this
import './Styles/Input.css';


export default function Input() {
  const [credential, setCredential] = useState('');
  const [inputType, setInputType] = useState('password');
  const navigate = useNavigate(); // ⬅️ initialize it

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

      if (inputType === "password") {
        // ⬇️ navigate to Breaches and pass data
        navigate('/pswdutils', { state: result });
      } else {
        navigate('/breaches', { state: result});
      }

    } catch (error) {
      console.log("Error fetching data: ", error);
    }
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
