import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import AnamneseInfoPage from './pages/AnamneseInfoPage';
import LoginPage from './pages/LoginPage';
import { useContext} from 'react';
import AuthContext from './stores/AuthContext';

function App() {
  const {isLogged} = useContext(AuthContext)

  const isUserLogged = sessionStorage.getItem("tokenId") || isLogged

  return (
    <div>
      <Header/>
        <Routes>
          <Route path="/" element={isUserLogged ? <HomePage/> : <Navigate to="login"/>}/>
          <Route path="/anamnese/:anamneseId" element={isUserLogged ? <AnamneseInfoPage/> : <Navigate to="/"/>}/>
          <Route path='/login' element={!isUserLogged ? <LoginPage/> : <Navigate to="/"/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    </div>
  );
}

export default App;
