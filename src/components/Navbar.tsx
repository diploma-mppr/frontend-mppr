import React, {MouseEventHandler, useEffect, useState} from "react";

export interface UserData {
    Id:         number;
    Username:   string;
}

export type UserDataI = UserData[]|null

export const Navbar = () => {

    const [userData, setUserDataData] = useState<UserDataI>(null)

    useEffect(() => {
            if (userData) {
                return
            }
            (async ()=> {

                const response = await fetch(`http://127.0.0.1:8000/api/get_user`,{
                    method:'GET',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
                if(response.ok){
                    console.log('success')
                    const responseBody = await response.json();
                    setUserDataData(responseBody)
                } else{
                    console.log('prosas')
                }

            }) ()
        },
    )

    const Logout:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/logout',{
            method:'GET',
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
        if(response.ok){
            console.log('success')
            const responseBody = await response.json();
            console.log(responseBody)
        } else{
            console.log('prosas')
        }
    }

    return  (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{width: "100%"}}>
                        <span className="navbar-brand mb-0 h1">МГТУ</span>
                        <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/">Главная</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link " href={"/Theory"}>Теория</a>
                        </li>
                        {
                            userData && (
                                <li className="nav-item">
                                    <a className="nav-link " href={"/method"}>Мои методы</a>
                                </li>
                            )
                        }

                        {
                            !userData && (
                                <div style={{marginLeft: "auto", display: "flex"}}>
                                    <li className="nav-item">
                                        <a className="nav-link " href={"/auth"}>Войти</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link " href={"/register"}>Зарегестрироваться</a>
                                    </li>
                                </div>

                            )
                        }
                        {
                            userData && (
                                <li className="nav-item" style={{marginLeft: "auto"}}>
                                    <div className="mb-3">

                                        <button onClick={Logout} type="button" className="btn btn-primary" id="button-addon2">Выйти</button>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

    /*

    <nav className={"navbar navbar-dark navbar-expand-lg bg-dark container-fluid"}>

    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    <li className="nav-item">
    <NavLink
className="nav-link" aria-current="page"
to="/">Главная</NavLink>
</li>
<li className="nav-item">
    <NavLink
        className="nav-link"
        to="/theory">Теория</NavLink>
</li>
<li className="nav-item">
    <NavLink
        className="nav-link"
        to="/about">О приложении</NavLink>
</li>
</ul>
</div>

</nav>

*/