import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FinancialPage from './pages/FinancialPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/financials" element={<FinancialPage />} />
      </Routes>
    </Router>
  );
}

export default App;