import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from './Context/AuthContext';
import RobotLoader from './RobotLoader/RobotLoader';
import './RobotLoader/RobotLoader.css';


const PrivateRoute = ({ children }) => {

    const { user, loading } = use(AuthContext)

    const location = useLocation();


    if (loading) {
        return <RobotLoader></RobotLoader>
    }

    if (user && user?.email) {
        return children
    }
    return <Navigate state={location.pathname} to='/'></Navigate>

};

export default PrivateRoute;