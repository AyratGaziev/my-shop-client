import React from "react";
import "./Footer.css";
import { ReactComponent as Gmail } from "./gmail.svg";
import { ReactComponent as Telegram } from "./telegram.svg";
import { ReactComponent as Github } from "./github.svg";

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="footer__text">
                    ©MyShop — интернет-магазин by Ayrat Gaziev
                </div>
            </div>
            <div className="footer__links">
                <a href="mailto:ayratgazievmail@gmail.com">
                    <Gmail className="footer__links-icon" />
                </a>
                <a href="https://t.me/gaziev_ayrat">
                    <Telegram className="footer__links-icon" />
                </a>
                <a href="https://github.com/AyratGaziev">
                    <Github className="footer__links-icon" />
                </a>
            </div>
        </div>
    );
};

export default Footer;
