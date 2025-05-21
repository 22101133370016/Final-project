// Store user data in localStorage
export const setUserData = (userData, token) => {
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('token', token);
};

// Get user data from localStorage
export const getUserData = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Clear user data (logout)
export const clearUserData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Check user type
export const getUserType = () => {
  const user = getUserData();
  return user ? user.user_type : null;
};

// Check if user is a specific type
export const isFarmer = () => getUserType() === 'farmer';
export const isFarmerAdmin = () => getUserType() === 'farmer_admin';
export const isAdmin = () => getUserType() === 'admin';
export const isDistributor = () => getUserType() === 'distributor';