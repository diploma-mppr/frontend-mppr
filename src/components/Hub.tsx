import React from "react";

export const Hub = ( ) => (

    <ul className="nav flex-column alert alert-primary" style={{maxWidth: "38rem"}}>
        <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/pareto">Парето</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/baseCriteria">Базовый критерий</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pointScore">Балльный критерий</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/pairComparisonCriteria">Парное сравнение</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/borda">Борда</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/nanson">Нансон</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" href="/weightedSum">Взвешенная сумма</a>
        </li>
    </ul>



)

/*

export const Hub = ( ) => (
            <ul className="nav flex-column">
            <NavLink to="/pareto" end >
                Парето
            </NavLink>
            <NavLink to="/baseCriteria" end >
                Базовый критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            <NavLink to="/pointScore" end >
                Балльный критерий
            </NavLink>
            </ul>
)

 */