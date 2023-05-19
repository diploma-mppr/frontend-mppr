import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";
import {useSearchParams} from "react-router-dom";
import {ParetoDataI} from "./Pareto";

export interface BordaData {
    Id:         number;
    Name:       string;
    Var1:       number[];
    Var2:       string[];
    Var3:       string[];
    Var4:       string[];
}

export type BordaDataI = BordaData[]|null

export const Borda: React.FC = () => {

    const [bordaData, setBordaData] = useState<BordaDataI>(null)
    const [searchParams] = useSearchParams();

    const [inputOne, setInputOne] = useState('');

    const [rowData, setRowData] = useState<any[]>(
        [   {"count": 29, "place1": "Вариант 1", "place2": "Вариант 2", "place3": "Вариант 3"},
            {"count": 0, "place1": "Вариант 1", "place2": "Вариант 3", "place3": "Вариант 2"},
            {"count": 6, "place1": "Вариант 2", "place2": "Вариант 1", "place3": "Вариант 3"},
            {"count": 17, "place1": "Вариант 2", "place2": "Вариант 3", "place3": "Вариант 1"},
            {"count": 14, "place1": "Вариант 3", "place2": "Вариант 1", "place3": "Вариант 2"},
            {"count": 14, "place1": "Вариант 3", "place2": "Вариант 2", "place3": "Вариант 1"} ]
    );

    useEffect(() => {
            if (bordaData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_borda?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setBordaData(responseBody)
                        console.log(responseBody)

                        if (
                            responseBody.name &&
                            responseBody.var1
                        ) {
                            setInputOne(responseBody.name)

                            const test = [
                                {"count": responseBody.var1[0], "place1": "Вариант 1", "place2": "Вариант 2", "place3": "Вариант 3"},
                                {"count": responseBody.var1[1], "place1": "Вариант 1", "place2": "Вариант 3", "place3": "Вариант 2"},
                                {"count": responseBody.var1[2], "place1": "Вариант 2", "place2": "Вариант 1", "place3": "Вариант 3"},
                                {"count": responseBody.var1[3], "place1": "Вариант 2", "place2": "Вариант 3", "place3": "Вариант 1"},
                                {"count": responseBody.var1[4], "place1": "Вариант 3", "place2": "Вариант 1", "place3": "Вариант 2"},
                                {"count": responseBody.var1[5], "place1": "Вариант 3", "place2": "Вариант 2", "place3": "Вариант 1"}
                            ]
                            console.log('test: ',test)

                            setRowData(test)
                        }
                    } else{
                        console.log('prosas')
                    }
                }
            }) ()
        },[searchParams]
    )

    let dataBorda: any[] = [];

    const handlerSetBorda:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();

        for (let i = 0; i < 6; i++) {
            dataBorda.push(Number(rowData[i].count))
        }

        console.log(dataBorda)

        const response = await fetch('http://127.0.0.1:8000/api/set_nanson',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [
                    dataBorda[0],
                    dataBorda[1],
                    dataBorda[2],
                    dataBorda[3],
                    dataBorda[4],
                    dataBorda[5],
                ],
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

    const [range, setRange] = useState('1')

    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '92%', height: '95%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'count', headerName: "Кол-во экспертов", editable: true, width: 240 },
        { field: 'place1', headerName: "1 место" },
        { field: 'place2', headerName: "2 место" },
        { field: 'place3', headerName: "3 место" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 200,
        };
    }, []);

    let variants: number = 3; //количество вариантов


    let vars: Array<Array<number>> = [[3, 2, 1], [3, 1, 2],[2, 3, 1], [1, 3, 2], [2,1,3], [1,2,3]]; //все возможные варианты расстановки мест

    const columns = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" },
];

    const rows = [
        { 'crit1': countBordaPoints(expsVars(), vars)[0],
            'crit2': countBordaPoints(expsVars(), vars)[1],
            'crit3': countBordaPoints(expsVars(), vars)[2]}
    ];




    function expsVars(){
        let expertsTypes: number = 6; //факториал от количества вариантов

        let expsVars: Array<number> = [29, 0, 6, 17, 14, 14]; //длина массива - expertsTypes, т.е. факториал от кол-ва вариантов

        for (let i = 0; i< expertsTypes; i++){

            expsVars[i]= rowData[i].count;
        }
            return expsVars;
    }

    const [selected, setSelected] = useState(null);

    const toggle = (i: any) =>
    {
        if (selected === i) {
            return setSelected(null)
        }
        setSelected(i)
    }

    const myOpenedStyle = {maxHeight: "999px", transition: "all 0.3s cubic-bezier(1,0,1,0)"}
    const myClosedStyle = {maxHeight: "0px", overflow: "hidden", transition: "all 0.3s cubic-bezier(0,1,0,1)"}


    return(
        <div className="Base">
            <div>
                <h2>Прямой метод принятия решений процедурой Борда</h2>

                <div style={{margin: "10px"}} className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className={ (selected === 1) ? "accordion-button open" : "accordion-button collapsed" }
                                onClick={()=>  toggle((1)) }
                                style={{display: "flex", alignItems: "center", justifyContent: "center", width: 100, height: 30, border: "solid", borderRadius: 5}}
                                type="button" aria-expanded="true" aria-controls="collapseOne">
                            Теория
                        </button>
                    </h2>

                    <div id="collapseOne"
                         className={ (selected === 1) ? "accordion-collapse" : "accordion-collapse" }
                         style = {(selected === 1) ? myOpenedStyle : myClosedStyle }
                         aria-expanded={ (selected === 1) }
                         aria-labelledby="headingOne"
                    >
                        <div className="accordion-body" style={{width: 750}}>
                            Вначале приглашаются эксперты, которые расставляют варианты в порядке приоритета.
                            Затем считается, что если эксперт поставил вариант на последнее место, варианту
                            даётся один балл, на предпоследнее - два итд. Баллы от всех экспертов складываются.
                            Вариант, набравший наибольшее количество баллов, считается наилучшим.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="3" step="1"
                               onChange={(e) =>
                               {
                                   setRange(e.target.value);
                               }
                               }
                               value = {range}
                               id="customRange"/>
                        <strong>{range}</strong>
                    </div>

                    <div className="input-group mb-3 col p-1">
                        <span className="input-group-text">Название: </span>
                        <input value={inputOne} type="text" className="form-control" onChange={(event) => setInputOne(event.target.value)}/>
                        <button onClick={handlerSetBorda} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>Таблица для подсчёта мнений экспертов</h3>
                <div style={{height: "318px"}}>
                    <div style={containerStyle}>
                        <div style={gridStyle} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={rowData}
                                columnDefs={columnDefs}
                                defaultColDef={defaultColDef}
                            ></AgGridReact>
                        </div>
                    </div>
                </div>

                <div className="p-3"></div>
                    <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Таблица со значение подсчётов Yj (баллов для каждого варианта)</h3>
                    <DataGrid columns={columns} rows={rows}/>
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вывод номера лучшего варианта</h3>
                    {findBestOption(countBordaPoints(expsVars(), vars))}
                </div>
            </div>
        </div>
    )
}


function bordaPairComparison (vars: Array<Array<number>>, expsVars: Array<number>)
{
    let pairComparison: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

    for (let k = 0; k < 6; k++) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (vars[k][i] > vars[k][j]) {
                    pairComparison[i][j] = pairComparison[i][j] + expsVars[k];
                }
            }
        }
    }
    return pairComparison;
}


function countBordaPoints (expsVars: Array<number>, vars: Array<Array<number>>)
{
    let result: Array<number> = [0,0,0]; //длина массива - количество вариантов

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 3; j++) {
            result[j] = result[j] + expsVars[i] * vars[i][j];
        }
    }
    return result;
}


function findBestOption(pointArray: Array<number>) {
    let bestOption: number = 0;

    for (let i = 0; i < pointArray.length; i++) {
        if (pointArray[i] > pointArray[bestOption]) {
            bestOption = i;
        }
    }

    return ("Лучший вариант: " + (bestOption + 1));
}
