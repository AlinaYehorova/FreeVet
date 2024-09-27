import './App.css';
import { Route, Routes } from 'react-router-dom';
import L_authorizationPage from './pages/login/l_authorizationPage/L_authorizationPage';
import L_registrationPage from './pages/login/l_registrationPage/L_registrationPage';
import L_verificationPage from './pages/login/l_verificationPage/L_verificationPage';






function App() {
  return (
    <div className='globalContainer'>
      <Routes>
        <Route path="/" element={<L_authorizationPage/>} />
        <Route path="/register" element={<L_registrationPage/>} />
        <Route path="/verification" element={<L_verificationPage/>} />
      </Routes>
    </div>
   
  );
}

export default App;

