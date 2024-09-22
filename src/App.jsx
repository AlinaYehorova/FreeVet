
import './App.css';
import Form from './components/form/form';
import { Route, Routes } from 'react-router-dom';
import LanguageSwitcher from "./components/LanguageSwitcher/LanguageSwitcher";



function App() {
  return (
    <div className='globalContainer'>
       <LanguageSwitcher />
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </div>
   
  );
}

export default App;

