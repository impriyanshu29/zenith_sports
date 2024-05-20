import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

function Private_Route() {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
}

export default Private_Route;
