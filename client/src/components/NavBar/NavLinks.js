import './NavBar.css';

const NavLinks = ({ isClicked, closeMenu, hospitalSite }) => {
    const handleClick = () => {
        if (isClicked) {
            closeMenu();
        }
    };

    const currentUrl = window.location.href;
    const baseUrl = new URL(currentUrl).origin; // Base URL like 'https://www.wayfinder.ca'
    const hospitalName = hospitalSite.charAt(0).toUpperCase() + hospitalSite.slice(1);

    // Helper function to determine if a link is active
    const isActive = (path) => currentUrl === `${baseUrl}/${hospitalSite}${path}`;

    return (
        <nav className="NavLinks">
            <ul>
                <li onClick={handleClick}>
                    <a href={`${baseUrl}/${hospitalSite}`} className={isActive('') ? 'active' : ''}>
                        <span className="notranslate">{hospitalName}</span>
                    </a>
                </li>
                <li onClick={handleClick}>
                    <a href={`${baseUrl}/${hospitalSite}/faqs`} className={isActive('/faqs') ? 'active' : ''}>
                        FAQs
                    </a>
                </li>
                <li onClick={handleClick}>
                    <a href={`${baseUrl}/${hospitalSite}/directory`} className={isActive('/directory') ? 'active' : ''}>
                        Directory
                    </a>
                </li>
                <li onClick={handleClick}>
                    <a href={`${baseUrl}/${hospitalSite}/map`} className={isActive('/map') ? 'active' : ''}>
                        Map
                    </a>
                </li>
                <li onClick={handleClick}>
                    <a href={`${baseUrl}/${hospitalSite}/feedback`} className={isActive('/feedback') ? 'active' : ''}>
                        Feedback
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default NavLinks;