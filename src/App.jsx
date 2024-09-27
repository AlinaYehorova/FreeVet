import './App.css';
import { Route, Routes } from 'react-router-dom';
import L_authorizationPage from './pages/login/l_authorizationPage/L_authorizationPage';
import L_registrationPage from './pages/login/l_registrationPage/L_registrationPage';
import L_verificationPage from './pages/login/l_verificationPage/L_verificationPage';
import L_userRolePage from './pages/login/l_userRolePage/L_userRolePage';
import L_createVetBookPage from './pages/login/l_createVetBookPage/L_createVetBookPage';
import L_vetVerificationPage from './pages/login/l_vetVerificationPage/L_vetVerificationPage';
import MainPage from './pages/mainPage/MainPage';






function App() {
  return (
    <div className='globalContainer'>
      <Routes>
        <Route path="/" element={<L_authorizationPage/>} />
        <Route path="/register" element={<L_registrationPage/>} />
        <Route path="/verification" element={<L_verificationPage/>} />
        <Route path="/verification/role" element={<L_userRolePage/>} />
        <Route path="/verification/role/user/create-vetbook" element={<L_createVetBookPage/>} />
        <Route path="/verification/role/vet/vet-verification" element={<L_vetVerificationPage/>} />
        <Route path="/main" element={<MainPage/>} />
      </Routes>
    </div>
   
  );
}

export default App;

