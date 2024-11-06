import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = ({ component: Component, render, ...rest }) => {
  const isAuthenticated = () => {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  };

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated()) {
          return Component ? <Component {...props} /> : render(props);
        } else {
          // Show a toast notification when redirecting
          toast.info('Please log in to start shopping!', {
            autoClose: 3000,
            theme: 'colored',
          });
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateRoute;