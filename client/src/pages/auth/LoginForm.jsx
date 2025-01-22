import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function LoginForm({ onClose, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error login in');
      }

      const data = await response.json();
      const { accessToken } = data;
      localStorage.setItem('accessToken', accessToken);

      if (onClose) {
        onClose();
      }
      // Redirect to the home page? Or where? There is no profile id when loggin in
      // navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {errorMessage && (
        <div className="mb-4 text-red-500 text-center">
          {errorMessage}
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="w-full border border-gray-300 p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="password">Passwort</label>
        <input
          type="password"
          id="password"
          className="w-full border border-gray-300 p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="w-full bg-green-900 text-white py-2 rounded hover:bg-green-600 transition-colors">
        Login
      </button>
      <div className="mt-4 text-center text-sm">
        No Account? {' '}
        <span onClick={onSwitchToRegister} className="text-blue-500 underline cursor-pointer">
          Register
        </span>
      </div>
    </form>
  );
}

export default LoginForm;