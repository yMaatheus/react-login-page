export const getToken = () => localStorage.getItem('@token');

export const setToken = (token: string) => localStorage.setItem('@token', token);

export const clearToken = () => localStorage.removeItem('@token');

export const getUser = () => {
  const user = localStorage.getItem('user');
  if (!user) return null;
  return JSON.parse(user)
};

export const setUserLocal = (user: string) => localStorage.setItem('user', JSON.stringify(user));

export const clearUser = () => localStorage.removeItem('user');
