import { unwrapResult } from "@reduxjs/toolkit";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    loginUser,
    regNewUser,
    setShowLogin,
    setShowRegister
} from "../../redux/slices/userSlice";
import { AppDispatch, RootState } from "../../redux/store/store";
import "./Registration.css";

//ПОФИКСИТЬ ANY В РЕФАХ!!!!!!!!!!!!!!!!!!!!

const Registration: React.FC = () => {
    const showRegister = useSelector(
        (state: RootState) => state.user.showRegister
    );
    const showLogin = useSelector((state: RootState) => state.user.showLogin);

    const dispatch = useDispatch<AppDispatch>();

    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /**
         * Dispatch if clicked on outside of element
         */
        function handleClickOutside(
            event: MouseEvent<HTMLElement> | any
        ): void {
            if (
                (showRegister === true || showLogin === true) &&
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target)
            ) {
                if (showRegister) {
                    dispatch(setShowRegister());
                } else if (showLogin) {
                    dispatch(setShowLogin());
                }
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef, showLogin, showRegister]);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const canSubmit = [username, password].every((value) => value !== "");

    const regUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (canSubmit) {
            try {
                let resultAction;
                if (showRegister) {
                    dispatch(setShowRegister());
                } else {
                    dispatch(setShowLogin());
                }
                if (showRegister) {
                    resultAction = await dispatch(
                        regNewUser({ username, password })
                    );
                } else {
                    resultAction = await dispatch(
                        loginUser({ username, password })
                    );
                }
                unwrapResult(resultAction);
                setPassword("");
                setUsername("");
            } catch (err) {
                console.error("Не удалось зарегистрироваться ", err);
            }
        }
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className={
                    showRegister === false && showLogin === false
                        ? "registration"
                        : "registration show"
                }>
                <h2 className="registration__title">
                    {showRegister ? "Регистрация" : "Войти"}
                </h2>
                <div
                    onClick={() => {
                        if (showRegister) {
                            dispatch(setShowRegister());
                        } else if (showLogin) {
                            dispatch(setShowLogin());
                        }
                    }}
                    className="registration__close">
                    &times;
                </div>
                <form onSubmit={regUser} className="registration__form">
                    <label className="registration__label">
                        Введите имя
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="registration__input"
                            type="text"
                        />
                    </label>
                    <label className="registration__label">
                        Введите пароль
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="registration__input"
                            type="text"
                        />
                    </label>
                    <button className="registration__submit" type="submit">
                        {showRegister ? "Зарегистрироваться" : "Войти"}
                    </button>
                </form>
            </div>
            <div
                className={
                    showRegister === false && showLogin === false
                        ? "registration__background"
                        : "registration__background registration__background_show"
                }></div>
        </>
    );
};

export default Registration;
