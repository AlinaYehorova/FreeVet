import './App.css';
import { Route, Routes } from 'react-router-dom';
import L_authorizationPage from './pages/login/l_authorizationPage/l_authorizationPage';
import Form from './components/form/Form.jsx';
import CustomStickTitle from './components/customStickTitle/CustomStickTitle.jsx';





function App() {
  return (
    <div className='globalContainer'>
      <Routes>
        <Route path="/" element={<L_authorizationPage/>} />
        <Route path="/form" element={<Form/>} />
      </Routes>
      <CustomStickTitle 
      borderRadius='10px'
      border='1px solid var(--color-main)'
      color='var(--color main)'
      />
    </div>
   
  );
}

export default App;

