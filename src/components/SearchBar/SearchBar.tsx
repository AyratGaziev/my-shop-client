import React, {useState} from 'react';
import './SearchBar.css'
import Cart from './cart.png'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { setNewSearch } from '../../redux/slices/productsSlice';

const SearchBar: React.FC = () => {

    const[searchValue, setSearchValue] = useState('')
    
    const dispatch = useDispatch()

    return (
        <div className = "search">
            <form
                className="search__form">
                <input
                    onChange={(e)=> setSearchValue(e.target.value)}
                    className="search__input"
                    value={searchValue} />
                <Link
                    onClick={() => {
                        setSearchValue('')
                        dispatch(setNewSearch())
                    }}
                    to={`/search/search/${searchValue}`}>
                    <input
                        type = 'submit'
                        className="search__btn"
                        value = 'Поиск'/>  
                </Link>
                              
            </form>
            <Link className = 'search__cart-link' to ='/cart'>
                <img className='search__cart-link-img' src={Cart} alt="cart"/>
            </Link>
        </div>
    );
}

export default SearchBar;
