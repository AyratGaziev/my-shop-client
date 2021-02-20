import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import "./Navigation.css"

const Navigation = () => {
    const [actice, setActive] = useState<string>('all')
    const select = (e: React.MouseEvent<HTMLElement>) => {
        setActive(e.currentTarget.id)
    }
    const linkClassName = (name: string): string => {
        const isActive = (name === actice) ? 'active' : 'link'
        return isActive
    }
    
    return (
        <nav className="navigation">
            
            <ul className="navigation__items">
                <li  className="navigation__item">
                    <Link
                        id = 'all'
                        className = {linkClassName('all')} 
                        onClick = {select}
                        to='/'>Все категории
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link
                        id = 'notebooks'
                        className = {linkClassName('notebooks')}
                        onClick = {select} 
                        to='/notebooks'>Ноутбуки
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link
                        id = 'phones'
                        className={linkClassName('phones')} 
                        onClick = {select} 
                        to='/phones'>Смартфоны
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link
                        id = 'tvs'
                        className = {linkClassName('tvs')} 
                        onClick = {select}
                        to='/tvs'>Телевизоры
                    </Link>
                </li>
            </ul>
                   
        </nav>
    );
}

export default Navigation;
