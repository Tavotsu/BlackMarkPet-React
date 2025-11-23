import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaAdmin = ({ children }) => {
  
  const user = JSON.parse(localStorage.getItem('currentUser'));

  
  if (!user || user.role !== 'admin') {
    
    return <Navigate to="/" replace />;
  }

  
  return children;
};

export default RutaAdmin;