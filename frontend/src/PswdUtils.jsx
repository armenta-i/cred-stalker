import Header from "./Header";
import './Styles/PswdUtils.css';
import { useLocation } from "react-router-dom";

export default function PswdUtils() {
    const location = useLocation();
    const result = location.state;

    return (
        <div className="page-wrapper">
            <Header/>
            <div className="major-results-container">
                <div className="pswd-utils">
                    <h1>Password Check Results</h1>

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
                </div>
                    <div className="card-results-info">
                        <p className="text-info">
                            A brute force attack is when a hacker tries every possible combination of characters (letters, numbers, symbols) until the correct password is found. It doesn’t rely on any prior knowledge — just raw computing power.
                        </p>
                        <p className="text-info">
                        A dictionary attack is when a hacker uses a pre-made list of common or leaked passwords to guess yours quickly. These lists often come from real-world data breaches.
                        </p>
                    </div>
            </div>
            <div className="create-pswd-container">
                <h1>Create A New Strong Password</h1>
                
                <div className="input-pswd-container">
                <form action="" method="post" className="pswd-form">
                    <div className="checkbox-group">
                        <label>
                            <input type="checkbox" name="option" value="uppercase"/>
                            Upper Case Chars
                        </label>
                        <label>
                            <input type="checkbox" name="option" value="lowercase"/>
                            Lower Case Chars
                            </label>
                        <label>
                            <input type="checkbox" name="option" value="digits" />
                            Digits
                        </label>
                        <label>
                            <input type="checkbox" name="option" value="symbols"/>
                            Symbols
                        </label>
                    </div>

                    <button type="submit" className="button">
                        Generate Password
                    </button>
                </form>

                <div className="result-card">
                    <h2>Password Result:</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor nesciunt cumque porro corporis consequuntur. Officia laborum unde provident, voluptatem veniam magnam neque, quas autem odit quasi eos repudiandae dolore deleniti.</p>
                </div>

                </div>
            </div>
        </div>
);
}