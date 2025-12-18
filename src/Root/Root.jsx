import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router';
import Footer from '../Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster position="top-center"
                reverseOrder={false}></Toaster>
        </div>
    );
};

export default Root;