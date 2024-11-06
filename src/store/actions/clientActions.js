import api from "../../api/axios";

// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';


// Action Creators
export const setUser = (user) => {
    console.log('setUser action creator called with:', user);
    return { type: SET_USER, payload: user };
  };
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const setLoading = (isLoading) => ({ type: SET_LOADING, payload: isLoading });
export const setError = (error) => ({ type: SET_ERROR, payload: error });

// Action to initialize user state from localStorage on app startup
export const initializeUser = () => async (dispatch) => {
    console.log('initializeUser thunk started');
    try {
      dispatch(setLoading(true));
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        throw new Error('No authentication data found');
      }
  
      // Set the stored user data in Redux
      console.log('About to dispatch stored user data');
      const parsedUser = JSON.parse(storedUser);
      
      // First dispatch
      dispatch(setUser(parsedUser));
  
      // Verify token with backend
      console.log('Making verify request');
      const response = await api.get('/verify', {
        headers: { Authorization: token },
      });
      
      const userData = response.data;
      console.log('Received verified user data:', userData);
      
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error initializing user:', error);
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      dispatch(setUser({}));
    }
  };

  export const loginUser = (userData, rememberMe) => (dispatch) => {
    if (rememberMe) {
      // No expiration time if "Remember Me" is checked
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      // Set an expiration time for 1 hour from now
      const expiration = new Date().getTime() + 3600 * 1000; // 1 hour in milliseconds
      localStorage.setItem('authToken', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userExpiration', expiration);
    }
  
    dispatch(setUser(userData));
  };

// Thunk action to fetch roles
export const fetchRolesIfNeeded = () => (dispatch, getState) => {
    const { roles } = getState().client;
    if (roles.length === 0) {
        // Fetch roles if not already fetched
        fetch('/api/roles')
            .then((res) => res.json())
            .then((data) => dispatch(setRoles(data)))
            .catch((error) => console.error('Failed to fetch roles:', error));
    }
};
