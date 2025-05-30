import ScrollToTop from '@/components/foundation/ScrollToTop';
import Footer from '@/page/user/home/components/Footer';
import Header from '@/page/user/home/components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
const LayoutUser = () =>{
    return (
        <div className="itviec-clone">
            <ScrollToTop/>
            <Header/>
            <Outlet/>
            <Footer />
        </div>
    )
}

export default LayoutUser;