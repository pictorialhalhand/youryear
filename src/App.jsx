import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GoalsApp from './pages/GoalsApp';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<GoalsApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
