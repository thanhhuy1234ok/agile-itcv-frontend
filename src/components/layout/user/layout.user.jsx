import ScrollToTop from '@/components/foundation/ScrollToTop';
import Footer from '@/page/user/home/components/Footer';
import Header from '@/page/user/home/components/Header';
import SearchJob from '@/page/user/home/components/SearchJob';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
const LayoutUser = () =>{
    const location = useLocation(); 
    const showSearchJob =
        location.pathname === '/' || location.pathname.startsWith('/it-jobs');
    return (
        <div className="itviec-clone">
            <ScrollToTop/>
            <Header/>
            {showSearchJob && <SearchJob />}
            <Outlet/>
            <Footer />
        </div>
    )
}

export default LayoutUser;