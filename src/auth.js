// src/auth.js
import api from './api/axios';
import { getGravatarUrl } from './utils/gravatarUtils';
import { setUser } from './store/actions/clientActions';

// Initialize authentication and verify token
export const initializeAuth = async (dispatch) => {
  const token = localStorage.getItem('authToken');
  
  if (token) {
    try {
      // Set token in axios headers
      api.defaults.headers.common['Authorization'] = token;

      // Verify token and get user data
      const response = await api.get('/verify');
      const userData = response.data;

      // Generate and attach avatar URL
      const gravatarUrl = await getGravatarUrl(userData.email);
      const userWithAvatar = { ...userData, avatarUrl: gravatarUrl };

      // Dispatch to store
      dispatch(setUser(userWithAvatar));

      // Renew token
      const newToken = response.headers['new-token'];
      localStorage.setItem('authToken', newToken);
      api.defaults.headers.common['Authorization'] = newToken;
    } catch (error) {
      console.error('Token verification failed:', error);

      // Remove invalid token
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
    }
  }
};

// Function to check token expiration
export const checkTokenExpiration = () => {
  const expiration = localStorage.getItem('userExpiration');
  
  if (expiration && new Date().getTime() > expiration) {
    // Token expired, remove from storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userExpiration');
    delete api.defaults.headers.common['Authorization'];
  }
};
