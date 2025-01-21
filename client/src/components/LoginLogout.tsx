import React from 'react';
import { useNavigate } from 'react-router-dom';

function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

interface LoginLogoutProps {
  onOpenLoginForm: () => void;
}

function LoginLogout({ onOpenLoginForm }: LoginLogoutProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const user = token ? parseJwt(token) : null;

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    window.location.reload();
  };

  if (user) {
    return (
      <div className='flex flex-row items-center font-bold'>
        <a href={`/profile/${user._id}`} className='flex flex-row items-center hover:text-gray-900 cursor-pointer'>
          <span>
            Profile
          </span>
          <span>{user.email}</span>
        </a>
        <span className='mx-2'>|</span>
        <div onClick={handleLogout} className='hover:text-gray-900 cursor-pointer'>
          Logout
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-row items-center hover:text-gray-900 cursor-pointer font-bold' onClick={onOpenLoginForm}>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
          </svg>
        </span>
        <span>Login / Sign up</span>
      </div>
    );
  }
}

export default LoginLogout;