import React from 'react';
import Navbar from '../Navbar';
import { Outlet, useNavigation } from 'react-router';
import Footer from '../Footer';
import { Toaster } from 'react-hot-toast';
import RobotLoader from '../RobotLoader/RobotLoader';
import '../RobotLoader/RobotLoader.css';

const Root = () => {

    const { state } = useNavigation();

    return (
        <div>
            <Navbar></Navbar>
            {state == "loading" ? <RobotLoader></RobotLoader> : <Outlet></Outlet>}
            <Footer></Footer>
            <Toaster position="top-center"
                reverseOrder={false}></Toaster>
        </div>
    );
};

export default Root;