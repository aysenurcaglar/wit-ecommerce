import api from "../../api/axios";

// Action Types
export const SET_USER = 'SET_USER';
export const SET_ROLES = 'SET_ROLES';
export const SET_THEME = 'SET_THEME';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const GET_ADDRESSES = 'GET_ADDRESSES';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const GET_CARDS = 'GET_CARDS';
export const ADD_CARD = 'ADD_CARD';
export const UPDATE_CARD = 'UPDATE_CARD';
export const DELETE_CARD = 'DELETE_CARD';


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
export const getAddresses = (addresses) => ({ type: GET_ADDRESSES, payload: addresses });
export const addAddress = (address) => ({ type: ADD_ADDRESS, payload: address });
export const updateAddress = (address) => ({ type: UPDATE_ADDRESS, payload: address });
export const deleteAddress = (addressId) => ({ type: DELETE_ADDRESS, payload: addressId });

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
export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { roles } = getState().client;
  if (roles.length === 0) {
    try {
      // Fetch roles if not already fetched
      const response = await api.get('/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Failed to fetch roles:', error);
    }
  }
};

export const fetchAddresses = () => async (dispatch) => {
  try {
    const response = await api.get('/user/address');
    dispatch(getAddresses(response.data));
  } catch (error) {
    console.error('Error fetching addresses:', error);
  }
};

export const addNewAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.post('/user/address', addressData);
    dispatch(addAddress(response.data));
    dispatch(fetchAddresses());
  } catch (error) {
    console.error('Error adding new address:', error);
  }
};

export const updateExistingAddress = (addressData) => async (dispatch) => {
  try {
    const response = await api.put(`/user/address`, addressData);
    dispatch(updateAddress(response.data));
    dispatch(fetchAddresses());
  } catch (error) {
    console.error('Error updating address:', error);
  }
};

export const deleteExistingAddress = (addressId) => async (dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch(deleteAddress(addressId));
    dispatch(fetchAddresses());
  } catch (error) {
    console.error('Error deleting address:', error);
  }
};


export const getCards = () => async (dispatch) => {
  try {
    const response = await api.get('/user/card');
    dispatch({ type: GET_CARDS, payload: response.data });
  } catch (error) {
    console.error('Error fetching user cards:', error);
    // Handle error
  }
};

export const addCard = (cardData) => async (dispatch) => {
  try {
    const response = await api.post('/user/card', cardData);
    // Access the card data using the key "0"
    const card = response.data["0"];

    // Dispatch the action with the correctly accessed card data
    dispatch({ type: ADD_CARD, payload: card });
    dispatch(getCards());
  } catch (error) {
    console.error('Error adding user card:', error);
    // Handle error
  }
};

export const updateCard = (cardData) => async (dispatch) => {
  try {
    const response = await api.put('/user/card', cardData);
    dispatch({ type: UPDATE_CARD, payload: response.data });
    dispatch(getCards());
  } catch (error) {
    console.error('Error updating user card:', error);
    // Handle error
  }
};

export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await api.delete(`/user/card/${cardId}`);
    dispatch({ type: DELETE_CARD, payload: cardId });
    dispatch(getCards());
  } catch (error) {
    console.error('Error deleting user card:', error);
    // Handle error
  }
};