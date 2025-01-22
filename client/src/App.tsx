import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import AddItem from './pages/AddItem';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SinglePage from './pages/SinglePage';
import AdminHomePage from './pages/admin/AdminHomePage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/About';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<SinglePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/admin" element={<AdminHomePage />} />
      </Routes>
    </Router>
  );
}



export default App
