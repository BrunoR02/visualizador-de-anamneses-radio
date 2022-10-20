import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import AnamneseInfoPage from './pages/AnamneseInfoPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/anamnese/:anamneseId" element={<AnamneseInfoPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </div>
  );
}

export default App;
