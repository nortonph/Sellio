import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <LoginForm onSwitchToRegister={() => navigate('/register')} />
      </div>
    </div>
  );
}

export default Login;