import React from 'react';

interface NavbarProps {
    className?: string;
    name?: string;
    onClick?: () => void;
    shref?: string;
}

const Navbar: React.FC<NavbarProps> = ({className, name, onClick, shref}) => {
    return(
        <div className={className} >
            <nav className={className}>
                <div className={className}>
                    <h1>CollaboraT</h1>
                </div>
                <ul>
                    <li><a href="#">Homework</a></li>
                    <li><a href="#">User admin</a></li>
                </ul>
                <div>
                    <button id='profile'>Profile</button>
                    <button id='logout'>Logout</button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;