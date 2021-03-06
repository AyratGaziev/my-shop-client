import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    authCheck,
    setShowLogin,
    setShowRegister,
    userLogout
} from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store/store";
import "./Navigation.css";
import { ReactComponent as Exit } from "./exit.svg";

const Navigation = () => {
    const [actice, setActive] = useState<string>("all");
    const select = (e: React.MouseEvent<HTMLElement>) => {
        setActive(e.currentTarget.id);
    };
    const linkClassName = (name: string): string => {
        const isActive = name === actice ? "active" : "link";
        return isActive;
    };

    const showLogin = useSelector((state: RootState) => state.user.showLogin);
    const showRegister = useSelector(
        (state: RootState) => state.user.showRegister
    );

    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.user);

    const authLoginBtns = (
        <>
            <li className="navigation__item">
                <button
                    onClick={() => {
                        if (!showRegister) {
                            setBurgerActive(!burgerActive);
                            dispatch(setShowLogin());
                        }
                    }}
                    className="registration-link">
                    Войти
                </button>
            </li>
            <li className="navigation__item">
                <button
                    onClick={() => {
                        if (!showLogin) {
                            setBurgerActive(!burgerActive);
                            dispatch(setShowRegister());
                        }
                    }}
                    className="registration-link">
                    Зарегистрироваться
                </button>
            </li>
        </>
    );

    const userBtn = (
        <li className="navigation__item">
            <Link
                onClick={() => setBurgerActive(!burgerActive)}
                className="registration-link"
                to="/user-page">
                {user.username}
            </Link>
        </li>
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(authCheck());
        }
    }, []);

    const showUser = user.username ? userBtn : authLoginBtns;

    const [burgerActive, setBurgerActive] = useState(false);

    const burgerBtn = (
        <div
            onClick={() => setBurgerActive(!burgerActive)}
            className={
                burgerActive
                    ? "burger-wrapper burger-wrapper_active"
                    : "burger-wrapper"
            }>
            <div className={burgerActive ? "burger active" : "burger"}></div>
        </div>
    );

    const logOutBtn = (
        <li className="navigation__item">
            {!burgerActive ? (
                <Link to="/">
                    <Exit
                        onClick={() => {
                            localStorage.setItem("token", "");
                            localStorage.setItem("id", "");
                            dispatch(userLogout());
                        }}
                        className="navigation__exit"
                    />
                </Link>
            ) : (
                <Link
                    className="navigation__exit-burger"
                    onClick={() => {
                        setBurgerActive(!burgerActive);
                        localStorage.setItem("token", "");
                        localStorage.setItem("id", "");
                        dispatch(userLogout());
                    }}
                    to="/">
                    Выйти
                </Link>
            )}
        </li>
    );
    const showLogOut = user.username === "" ? null : logOutBtn;

    const burgerMenu = (
        <>
            <div
                className={
                    burgerActive
                        ? "burger-menu-bg burger-menu-bg_active"
                        : "burger-menu-bg"
                }></div>
            <ul
                className={
                    burgerActive
                        ? "navigation__items-burger navigation__items-burger_show"
                        : "navigation__items-burger"
                }>
                <li className="navigation__item-burger">
                    <Link
                        id="main"
                        onClick={(e) => {
                            setBurgerActive(!burgerActive);
                            select(e);
                        }}
                        to="/">
                        MyShop
                    </Link>
                </li>
                <li className="navigation__item-burger">
                    <Link
                        id="all"
                        onClick={(e) => {
                            setBurgerActive(!burgerActive);
                            select(e);
                        }}
                        className={linkClassName("all")}
                        to="/products/allProducts">
                        Все категории
                    </Link>
                </li>
                <li className="navigation__item-burger">
                    <Link
                        id="notebooks"
                        className={linkClassName("notebooks")}
                        onClick={(e) => {
                            setBurgerActive(!burgerActive);
                            select(e);
                        }}
                        to="/products/notebooks">
                        Ноутбуки
                    </Link>
                </li>
                <li className="navigation__item-burger">
                    <Link
                        id="phones"
                        className={linkClassName("phones")}
                        onClick={(e) => {
                            setBurgerActive(!burgerActive);
                            select(e);
                        }}
                        to="/products/phones">
                        Смартфоны
                    </Link>
                </li>
                <li className="navigation__item-burger">
                    <Link
                        id="tvs"
                        className={linkClassName("tvs")}
                        onClick={(e) => {
                            setBurgerActive(!burgerActive);
                            select(e);
                        }}
                        to="/products/tvs">
                        Телевизоры
                    </Link>
                </li>
                {showUser}
                {showLogOut}
            </ul>
        </>
    );

    return (
        <nav className="navigation">
            {burgerBtn}
            <ul className="navigation__items">
                <li className="navigation__item">
                    <Link
                        id="all"
                        className={linkClassName("all")}
                        onClick={select}
                        to="/products/allProducts">
                        Все категории
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link
                        id="notebooks"
                        className={linkClassName("notebooks")}
                        onClick={select}
                        to="/products/notebooks">
                        Ноутбуки
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link
                        id="phones"
                        className={linkClassName("phones")}
                        onClick={select}
                        to="/products/phones">
                        Смартфоны
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link
                        id="tvs"
                        className={linkClassName("tvs")}
                        onClick={select}
                        to="/products/tvs">
                        Телевизоры
                    </Link>
                </li>
                {showUser}
                {showLogOut}
            </ul>
            {burgerMenu}
        </nav>
    );
};

export default Navigation;
