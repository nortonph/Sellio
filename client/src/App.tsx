import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import SinglePage from './pages/SinglePage';
import AdminHomePage from './pages/admin/AdminHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<SinglePage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App
