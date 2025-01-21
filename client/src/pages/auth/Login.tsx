import React from 'react';
import LoginForm from './LoginForm';

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

export default Login;