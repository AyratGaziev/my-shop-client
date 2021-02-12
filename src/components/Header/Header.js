import React from 'react';
import Navigation from '../Navigation/Navigation';
import SearchBar from '../SearchBar/SearchBar';
import "./Header.css"
import Logo from './logo.png'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">
                    <Link to='/'>
                        <img className="header__logo" src={Logo} alt="logo" />
                    </Link>                    
                    <div className="header__content">
                        <Navigation />
                        <SearchBar/>
                    </div>
                    
                </div>                
            </div>            
        </header>
    );
}

export default Header;
