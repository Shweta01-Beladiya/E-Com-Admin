import { useState } from "react";
import Sideabr from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
    const [isOpen, setIsOpen] = useState();
    return (
        <div className='d-md-flex'>
            <Sideabr open={isOpen} setopen={setIsOpen} />
            <div className='flex-grow-1'>
                <Header open={isOpen} setopen={setIsOpen} />
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout;