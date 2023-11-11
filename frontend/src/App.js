import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './page/Auth';
import HomePage from './page/Main';
import DetailPage from './page/Detail';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
