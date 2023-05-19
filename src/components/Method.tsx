import React, {useEffect, useState} from "react";

export interface Data {
    Id:         number;
    MethodName: string;
    Name:       string;
}

export type DataI = Data[]|null



export const Method: React.FC = () => {
    const [data, setData] = useState<DataI>(null)


    useEffect(() => {
            (async ()=> {

                const response = await fetch('http://127.0.0.1:8000/api/get_all',{
                    method:'GET',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8"
                    }
                })
                if(response.ok){
                    console.log('success')
                    const responseBody = await response.json();
                    setData(responseBody)
                    console.log(responseBody)
                } else{
                    console.log('prosas')
                }
            }) ()

        }
    ,[]
    )

    if (!data) {
        return <div>posos</div>
    }

    return (
        <div>
            {
                data.map((item, i)=>{
                    const url = "http://127.0.0.1:3000/" + item.Name + "?id=" + item.Id;
                // , justifyContent: "space-between"
                    return <div key={i} style={{width: "90%",display: "flex", margin: "10px", marginRight: "50px"}}>
                        <p style={{width: "20px", marginLeft: "20px", marginRight: "20px"}}>{i+1}</p>
                        {/*<p style={{width: "200px", marginLeft: "auto", marginRight: "auto"}}>{item.Id}</p>*/}
                        <p style={{width: "200px", marginLeft: "20px", marginRight: "auto"}}>{item.Name}</p>
                        <p style={{width: "200px", marginLeft: "auto", marginRight: "auto"}}>{item.MethodName}</p>
                        <a style={{width: "200px", marginLeft: "auto", marginRight: "auto"}} href={url}>Перейти к методу</a>
                    </div>
                })
            }
        </div>
    )
}
