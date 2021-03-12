import React, { useEffect, useState } from "react";
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
            <Link to="/user-page">
                <button className="registration-link">{user.username}</button>
            </Link>
        </li>
    );

    const logOutBtn = (
        <li className="navigation__item">
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
        </li>
    );

    const showLogOut = user.username === "" ? null : logOutBtn;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(authCheck());
        }
    }, []);

    const showUser = user.username ? userBtn : authLoginBtns;

    return (
        <nav className="navigation">
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
        </nav>
    );
};

export default Navigation;
