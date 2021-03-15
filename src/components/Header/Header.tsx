import React from "react";
import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";
import { ReactComponent as Shop } from "./shop.svg";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__wrap">
                    <Link className="header__logo-link" to="/">
                        <Shop className="header__logo" />
                        <span className="header__logo-mobile">MyShop</span>
                    </Link>
                    <div className="header__content">
                        <Navigation />
                        <SearchBar />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
