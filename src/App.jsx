import './App.css';
import { Route, Routes } from 'react-router-dom';
import L_authorizationPage from './pages/login/l_authorizationPage/L_authorizationPage';
import L_registrationPage from './pages/login/l_registrationPage/L_registrationPage';
import L_verificationPage from './pages/login/l_verificationPage/L_verificationPage';
import L_userRolePage from './pages/login/l_userRolePage/L_userRolePage';
import L_createVetBookPage from './pages/login/l_createVetBookPage/L_createVetBookPage';
import L_vetVerificationPage from './pages/login/l_vetVerificationPage/L_vetVerificationPage';
import MainPage from './pages/mainPage/MainPage';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import L_vetCodePage from './pages/login/l_vetCodePage/L_vetCodePage';
import Q_choiceAnimalPage from './pages/addQuestion/q_choiceAnimalPage/q_choiceAnimalPage';



function App() {
  return (
    <div className='globalContainer'>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<L_authorizationPage/>} />
        <Route path="/register" element={<L_registrationPage/>} />
        <Route path="/verification" element={<L_verificationPage/>} />
        <Route path="/verification/role" element={<L_userRolePage/>} />
        <Route path="/verification/role/user/create-vetbook" element={<L_createVetBookPage/>} />
        <Route path="/verification/role/vet/vet-verification" element={<L_vetVerificationPage/>} />
        <Route path="/verification/role/vet/vet-verification/code" element={<L_vetCodePage/>} />
        <Route path="/main" element={<MainPage/>} />
        <Route path="/main/question/choice" element={<Q_choiceAnimalPage/>} />
      </Routes>
    </div>
   
  );
}

export default App;

