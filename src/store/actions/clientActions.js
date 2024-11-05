// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';

// Action Creators
export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });

// Action to initialize user state from localStorage on app startup
export const initializeUser = () => (dispatch) => {
  const expiration = localStorage.getItem('userExpiration');
  const now = new Date().getTime();

  // Check if there’s an expiration time and if it has expired
  if (expiration && now > expiration) {
    // If expired, clear the stored data
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('userExpiration');
  } else {
    // Load user data if still valid
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');

    if (token && user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }
};

export const loginUser = (userData, rememberMe) => (dispatch) => {
  if (rememberMe) {
    // No expiration time if "Remember Me" is checked
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.removeItem('userExpiration'); // No expiration needed
  } else {
    // Set an expiration time for 1 hour from now
    const expiration = new Date().getTime() + 3600 * 1000; // 1 hour in milliseconds

    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userExpiration', expiration);
  }

  dispatch(setUser(userData));
};
