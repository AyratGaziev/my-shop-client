import React from 'react';
import './SearchBar.css'

const SearchBar = () => {
    return (
        <div className = "search">
            <form className="search__form">
                <input className="search__input" />
                <button className="search__btn">Найти</button>
            </form>
        </div>
    );
}

export default SearchBar;
