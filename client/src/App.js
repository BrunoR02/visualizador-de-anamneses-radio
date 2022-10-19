import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="*" element={<HomePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
