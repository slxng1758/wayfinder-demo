import NavLinks from "./NavLinks";
import './NavBar.css';
import { MdOutlineMenu, MdClose } from 'react-icons/md';
import { useState } from "react";

const MobileNavigation = ({ hospitalSite, displayNavBar }) => {
    const [click, setClick] = useState(false);
    
    // Check if the current path is the landing page ("/")
    const isLandingPage = window.location.pathname === "/";

    const Hamburger = (
        <MdOutlineMenu
            className="HamburgerMenu"
            size="30px"
            color="black"
            onClick={() => setClick(!click)}
        />
    );

    const Close = (
        <MdClose
            className="HamburgerMenu"
            size="30px"
            color="black"
            onClick={() => setClick(!click)}
        />
    );

    return (
        <nav className="MobileNavigation">
            <a className="logo notranslate" href="/">
                <img src="/images/logo.png" alt="SHN WayFinder" className="logo" />
                WayFinder
            </a>
            {/* Render the hamburger menu only if not on the landing page */}
            {!isLandingPage && (click ? Close : Hamburger)}
            {click && displayNavBar && (
                <NavLinks isClicked={true} closeMenu={() => setClick(false)} hospitalSite={hospitalSite} />
            )}
        </nav>
    );
};

export default MobileNavigation;
