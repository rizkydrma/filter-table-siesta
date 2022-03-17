import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './pages/Dashboard';
import './assets/css/style.css';
import DaftarHadir from './pages/DaftarHadir';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/daftar-hadir" element={<DaftarHadir />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
