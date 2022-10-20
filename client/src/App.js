import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import AnamneseInfoPage from './pages/AnamneseInfoPage';

function App() {
  return (
    <div>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/anamnese/:anamneseId" element={<AnamneseInfoPage/>}/>
          <Route path="*" element={<HomePage/>}/>
        </Routes>
    </div>
  );
}

export default App;
