import './Styles/Header.css';
export default function Header(){
    return(
        <header>
            <img src="/CredStalkerLogo.png" alt="Logo" style={{ width: '100px' }} />
            <h1>CredStalker</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );

}
