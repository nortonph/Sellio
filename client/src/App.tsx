import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import AddItem from './pages/AddItem';
import SinglePage from './pages/SinglePage';
import AdminHomePage from './pages/admin/AdminHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminHomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/" element={<Home />} />
        <Route path="/item" element={<SinglePage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App
