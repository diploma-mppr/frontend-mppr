import React, {MouseEventHandler, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
export const Register: React.FC = () => {
    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');

    const navigate = useNavigate();

    const [shouldRedirect, setShouldRedirect] = useState(false);

    useEffect(() => {
        if (shouldRedirect) {
            navigate("/");
        }
    }, );

    const Register:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();
        const response = await fetch('https://study-ai.online/api/register',{
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
            setShouldRedirect(true)
        } else{
            console.log('error')
        }

    }

    return(
        <div className="Base">
            <div className="mb-3">
                <input id="username" value={inputOne} type="text" name="message" placeholder="username" onChange={(event) => setInputOne(event.target.value)}/>
            </div>
            <div className="mb-3">
                <input id="password" type="text" name="message" placeholder="password" value={inputTwo} onChange={(event) => setInputTwo(event.target.value)}/>
            </div>
            <div className="mb-3">
                <button onClick={Register} type="button" className="btn btn-primary" id="button-addon2">Зарегистрироваться</button>
            </div>
        </div>
    )
};