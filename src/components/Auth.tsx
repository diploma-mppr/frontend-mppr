import React, {MouseEventHandler, useState} from "react";

export const Auth: React.FC = () => {
    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');

    const [che, setChe] = useState(false);

    const Login:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();
        const response = await fetch('https://study-ai.online/api/login',{
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
            window.location.href = "/";
        } else{
            console.log('error')
            setChe(true)
        }
    }

    return(
        <div className="Base">
            {
                che && (
                    <div>
                        <h5 style={{color: "red"}}>Ошибка авторизации</h5>
                        <h5 style={{color: "red"}}>Попробуйте снова</h5>
                    </div>
                )
            }
            <div className="mb-3">
                <input id="username" value={inputOne} type="text" name="message" placeholder="username" onChange={(event) => setInputOne(event.target.value)}/>
            </div>
            <div className="mb-3">
                <input id="password" type="text" name="message" placeholder="password" value={inputTwo} onChange={(event) => setInputTwo(event.target.value)}/>
            </div>
            <div className="mb-3">
                <button onClick={Login} type="button" className="btn btn-primary" id="button-addon2">Войти</button>
            </div>
        </div>
    )
};