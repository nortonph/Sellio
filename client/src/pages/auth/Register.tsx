import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm';

function Register() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <RegisterForm onSwitchToLogin={() => navigate('/login')} />
      </div>
    </div>
  );
}

export default Register;