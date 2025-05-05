import React from 'react';
import {  Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token') ;
    const isAuthenticated = token !== null && token !== undefined && token !== '';
    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/register" replace />
    );
};

export default ProtectedRoute;