import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import L_authorizationPage from "./pages/login/l_authorizationPage/L_authorizationPage";
import L_registrationPage from "./pages/login/l_registrationPage/L_registrationPage";
import L_verificationPage from "./pages/login/l_verificationPage/L_verificationPage";
import L_userRolePage from "./pages/login/l_userRolePage/L_userRolePage";
import L_createVetBookPage from "./pages/login/l_createVetBookPage/L_createVetBookPage";
import L_vetVerificationPage from "./pages/login/l_vetVerificationPage/L_vetVerificationPage";
import MainPage from "./pages/mainPage/MainPage";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import L_vetCodePage from "./pages/login/l_vetCodePage/L_vetCodePage";
import Q_choiceAnimalPage from "./pages/addQuestion/q_choiceAnimalPage/Q_choiceAnimalPage";
import Q_closeQuestionPage from "./pages/addQuestion/q_closeQuestionPage/Q_closeQuestionPage";
import VetBookPage from "./pages/vetBookPage/VetBookPage";
import Q_descriptionAnimalPage from './pages/addQuestion/q_descriptionAnimalPage/Q_descriptionAnimalPage';
import Q_sendQuestionPage from './pages/addQuestion/q_sendQuestionPage/Q_sendQuestionPage';
import Q_confirmationPage from './pages/addQuestion/q_confirmationPage/Q_confirmationPage';

import Loader from "./components/loader/Loader"; 


function App() {
  const [isLoading, setIsLoading] = useState(true); 

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 3000); 

  
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />; 
  }

 
  return (
    <div className="globalContainer">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<L_authorizationPage />} />
        <Route path="/register" element={<L_registrationPage />} />
        <Route path="/verification" element={<L_verificationPage />} />
        <Route path="/verification/role" element={<L_userRolePage />} />
        <Route path="/verification/role/user/create-vetbook" element={<L_createVetBookPage />} />
        <Route path="/verification/role/vet/vet-verification" element={<L_vetVerificationPage />} />
        <Route path="/verification/role/vet/vet-verification/code" element={<L_vetCodePage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/question/choice" element={<Q_choiceAnimalPage />} />
        <Route path="/main/question/description-animal" element={<Q_descriptionAnimalPage />} />
        <Route path="/main/question/description-animal/send" element={<Q_sendQuestionPage />} />
        <Route path="/main/question/confirm" element={<Q_confirmationPage />} />
        <Route path="/main/question/close" element={<Q_closeQuestionPage />} />
        <Route path="/vetbook" element={<VetBookPage />} />
      </Routes>
    </div>
  );
}

export default App;
