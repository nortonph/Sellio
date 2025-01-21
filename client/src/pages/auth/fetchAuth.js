// This file fetches the acessToken and sends it to the server for authentication
export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem('accessToken');
  const authOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...(options.headers || {})
    }
  };
  return fetch(url, authOptions);
};