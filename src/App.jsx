
import './App.css';
import Form from './components/form/form';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className='globalContainer'>
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
