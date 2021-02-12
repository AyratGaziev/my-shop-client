import React from 'react';
import {Link} from 'react-router-dom'
import "./Navigation.css"

const Navigation = () => {
    return (
        <nav className="navigation">
            
            <ul className="navigation__items">
                <li className="navigation__item">
                    <Link to='/all'>Все категории</Link>
                </li>
                <li className="navigation__item">
                    <Link to='/electronics'>Электроника</Link>
                </li>
                <li className="navigation__item">
                    <Link to='/sport'>Товары для спорта</Link>
                </li>
                <li className="navigation__item">
                    <Link to='/wear'>Одежда</Link>
                </li>
            </ul>
                   
        </nav>
    );
}

export default Navigation;
