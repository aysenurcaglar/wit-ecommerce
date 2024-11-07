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
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (!token || !storedUser) {
      throw new Error('No authentication data found');
    }

    // Verify token with backend
    const response = await api.get('/verify', {
      headers: { Authorization: token },
    });

    const userData = response.data;
    console.log('Verified user data:', userData);

    // Merge any additional data from storedUser (like the avatar)
    const parsedUser = JSON.parse(storedUser);
    const completeUserData = JSON.parse(JSON.stringify({ ...userData, avatarUrl: parsedUser.avatarUrl }));

    // Update Redux state with the complete user data
    dispatch(setUser(completeUserData));

    // Update token in axios
    api.defaults.headers.common['Authorization'] = token;

    dispatch(setLoading(false));
  } catch (error) {
    console.error('Error initializing user:', error);
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    api.defaults.headers.common['Authorization'] = null;
    dispatch(setUser({}));
  }
};

export const loginUser = (userData, rememberMe) => (dispatch) => {
  if (rememberMe) {
    // No expiration time if "Remember Me" is checked, use localStorage
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));
  } else {
    // Use sessionStorage instead of localStorage
    sessionStorage.setItem('authToken', userData.token);
    sessionStorage.setItem('user', JSON.stringify(userData));
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
