import Header from "./Header";
import './Styles/PswdUtils.css';
import { useLocation } from "react-router-dom";

export default function PswdUtils() {
    const location = useLocation();
    const result = location.state;

    return (
        <div className="page-wrapper">
            <Header />

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
        </div>
);
}