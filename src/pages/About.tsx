import React from "react";
import bauman_big from "../images/bauman_big.png";

export const About = () => {
    return (
        <div className="container-fluid" >
            <div className = "text-center">
                <h1 className="display-6">
                    О приложении
                </h1>
            </div>
            <div className = "text-center">
                <p className="lead" >
                    Данное веб-приложение разработано
                    <strong> Ларичевой Марией </strong>
                    в рамках выполнения ВКРБ
                </p>
            </div>
            <div className="text-center">
                <a className="navbar-brand">
                    <img src={bauman_big} alt="" width="400" height="450"/>
                </a>
            </div>
            <div className = "text-center">
                <p className="lead" >
                    Москва, 2022 г.
                </p>
            </div>
        </div>
    )
}

