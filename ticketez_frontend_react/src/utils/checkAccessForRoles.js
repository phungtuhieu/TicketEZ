import React from 'react';
import { Navigate } from 'react-router-dom';
import { getRolesFromLocalStorage } from './authUtils';

const withAdminAccess = (Component) => {
  return (props) => {
    const userRoles = getRolesFromLocalStorage();
    const isAdmin = userRoles.includes('SUPER_ADMIN');

    if (!isAdmin) {
      // Chuyển hướng nếu không phải là quản trị viên
      return <Navigate to="/access-denied" />;
    }

    return <Component {...props} />;
  };
};

export default withAdminAccess;
