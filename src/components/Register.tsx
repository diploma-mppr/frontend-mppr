import React, {MouseEventHandler, useState} from "react";

export const Register: React.FC = () => {
    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');

    // const Login:MouseEventHandler<HTMLButtonElement> = async (event)=>{
    //     event.preventDefault();
    //     const response = await fetch('http://127.0.0.1:8000/api/login',{
    //         method:'POST',
    //         credentials: 'include',
    //         headers:{
    //             "Content-Type": "application/json; charset=UTF-8"
    //         },
    //         body: JSON.stringify({
    //             "username": inputOne,
    //             "password": inputTwo
    //         })
    //     })
    //     if(response.ok){
    //         console.log('success')
    //         const responseBody = await response.json();
    //         console.log(responseBody)
    //     } else{
    //         console.log('prosas')
    //     }
    // }

    const Register:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/register',{
            method:'POST',
            credentials: 'include',
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "username": inputOne,
                "password": inputTwo
            })
        })
        if(response.ok){
            console.log('success')
            const responseBody = await response.json();
            console.log(responseBody)
        } else{
            console.log('prosas')
        }

    }

    // const Logout:MouseEventHandler<HTMLButtonElement> = async (event)=>{
    //     event.preventDefault();
    //     const response = await fetch('http://127.0.0.1:8000/api/logout',{
    //         method:'GET',
    //         headers:{
    //             "Content-Type": "application/json; charset=UTF-8"
    //         },
    //     })
    //     if(response.ok){
    //         console.log('success')
    //         const responseBody = await response.json();
    //         console.log(responseBody)
    //     } else{
    //         console.log('prosas')
    //     }
    // }

    return(
        <div className="Base">
            <div className="mb-3">
                <input id="username" value={inputOne} type="text" name="message" placeholder="username" onChange={(event) => setInputOne(event.target.value)}/>
            </div>
            <div className="mb-3">
                <input id="password" type="text" name="message" placeholder="password" value={inputTwo} onChange={(event) => setInputTwo(event.target.value)}/>
            </div>

            {/*<div className="mb-3">*/}
            {/*    <button onClick={Login} type="button" className="btn btn-primary" id="button-addon2">Войти</button>*/}
            {/*</div>*/}

            <div className="mb-3">
                <button onClick={Register} type="button" className="btn btn-primary" id="button-addon2">Зарегестрироваться</button>
            </div>

            {/*<div className="mb-3">*/}
            {/*    <button onClick={Logout} type="button" className="btn btn-primary" id="button-addon2">Выйти</button>*/}
            {/*</div>*/}
        </div>
    )
};