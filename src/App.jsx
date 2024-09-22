import './App.css';
import { Route, Routes } from 'react-router-dom';
import L_authorizationPage from './pages/login/l_authorizationPage/l_authorizationPage';
import Form from './components/form/Form';





function App() {
  return (
    <div className='globalContainer'>
      <Routes>
        <Route path="/" element={<L_authorizationPage/>} />
        <Route path="/form" element={<Form/>} />
      </Routes>
    </div>
   
  );
}

export default App;

