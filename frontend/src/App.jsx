import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Breaches from './Breaches.jsx';
import PswdUtils from './PswdUtils.jsx';
export default function App() {
  return(
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/breaches" element={<Breaches/>}/>
      <Route path="/pswdutils" element={<PswdUtils/>}/>
    </Routes>
    
    </>
  );
} 