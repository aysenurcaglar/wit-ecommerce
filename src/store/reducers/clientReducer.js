import { SET_USER, SET_ROLES, SET_THEME, SET_LANGUAGE } from '../actions/clientActions';
import { setRoles } from '../actions/clientActions';

const initialState = {
  user: {},
  addressList: [],
  creditCards: [],
  roles: [],
  theme: 'light',
  language: 'en',
};

export const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_ROLES:
      return { ...state, roles: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
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