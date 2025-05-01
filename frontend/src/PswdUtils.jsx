import { useState } from "react";
import Header from "./Header";
import './Styles/PswdUtils.css';
import { useLocation } from "react-router-dom";

export default function PswdUtils() {
    const location = useLocation();
    const result = location.state;

    // Variables that will hold the form input to know which options to use to generate pswd.
    const [upperCase, setUpperCase] = useState(true);
    const [lowerCase, setLowerCase] = useState(true);
    const [digits, setDigits] = useState(true);
    const [symbols, setSymbols] = useState(false);
    const [length, setLength] = useState('45');
    const [passwordResult, setPasswordResult] = useState('');

    // Handle the input of the form and display on the page.
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            upperCase,
            lowerCase,
            digits,
            symbols,
            length,
        };

        try {
            const response = await fetch('http://localhost:8000/generate_password', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            setPasswordResult(data.password)
        } catch (err) {
            console.log("Error generating password: ", err);
        }
    };

    return (
        <div className="page-wrapper">
            <Header/>
            
            {/* Password Check Results Section */}
            <div className="pswd-utils">
                <h1>Password Check Results</h1>
                
                <div className="major-results-container">
                    <div className="result-card">
                        <div className="result-item">
                            <span className="label">Breached:</span>
                            <span className={result.breached ? 'danger' : 'safe'}>
                                {result.breached ? 'Yes' : 'No'}
                            </span>
                        </div>

                        <div className="result-item">
                            <span className="label">Breach Count:</span>
                            <span>{result.count}</span>
                        </div>

                        <div className="result-item">
                            <span className="label">Brute Force Time:</span>
                            <span>{result['Brute force estimated crack time']}</span>
                        </div>

                        <div className="result-item">
                            <span className="label">Worst Case Dictionary Attack:</span>
                            <span>{result['Worst Case Dict Atk']}</span>
                        </div>
                    </div>
                    
                    <div className="card-results-info">
                        <p className="text-info">
                            A brute force attack is when a hacker tries every possible combination of characters (letters, numbers, symbols) until the correct password is found. It doesn't rely on any prior knowledge — just raw computing power.
                        </p>
                        <p className="text-info">
                            A dictionary attack is when a hacker uses a pre-made list of common or leaked passwords to guess yours quickly. These lists often come from real-world data breaches.
                        </p>
                    </div>
                </div>
            </div>
            
            {/* Create New Password Section */}
            <div className="create-pswd-container">
                <h1>Create A New Strong Password</h1>
                
                <div className="input-pswd-container">
                    <form className="pswd-form" onSubmit={handleSubmit}>
                        <div className="checkbox-group">
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={upperCase} 
                                    onChange={(e) => setUpperCase(e.target.checked)}
                                />
                                Upper Case Chars
                            </label>
                            
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={lowerCase} 
                                    onChange={(e) => setLowerCase(e.target.checked)}
                                />
                                Lower Case Chars
                            </label>
                            
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={digits} 
                                    onChange={(e) => setDigits(e.target.checked)}
                                />
                                Digits
                            </label>
                            
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={symbols} 
                                    onChange={(e) => setSymbols(e.target.checked)}
                                />
                                Symbols
                            </label>
                            
                            <label>
                                Password Length
                                <input 
                                    type="number" 
                                    min="4" 
                                    max="45" 
                                    value={length} 
                                    onChange={(e) => setLength(e.target.value)}
                                />
                            </label>
                        </div>

                        <button type="submit" className="button">
                            Generate Password
                        </button>
                    </form>

                    <div className="result-card">
                        <h2>Password Result:</h2>
                        {passwordResult ? (
                            <p><strong>{passwordResult}</strong></p>
                        ) : (
                            <p>Click "Generate Password" to create a new password</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}