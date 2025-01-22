import React, { useState } from 'react';

function RegisterForm({ onSwitchToLogin, onClose }: { onSwitchToLogin: () => void, onClose?: () => void }) {
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, contactInfo })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error registering user');
      }

      if(onClose) onClose();
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {errorMessage && (
        <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
        <input type="email" id="email" className="w-full border border-gray-300 p-2 rounded"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="contactInfo">Contact Info</label>
        <input type="text" id="contactInfo" className="w-full border border-gray-300 p-2 rounded"
          value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
        <input type="password" id="password" className="w-full border border-gray-300 p-2 rounded"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
        <input type="password" id="confirmPassword" className="w-full border border-gray-300 p-2 rounded"
          value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      </div>
      <button type="submit" className="w-full bg-green-900 text-white py-2 rounded hover:bg-green-600 transition-colors">
        Register
      </button>
      <div className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} className="text-blue-500 underline cursor-pointer">
          Login
        </span>
      </div>
    </form>
  );
}

export default RegisterForm;