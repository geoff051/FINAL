import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import isAuthenticated from './AuthUtils';

const PrivateRoute = ({ element, ...props }) => {
  return isAuthenticated() ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;