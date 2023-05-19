import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from 'react-data-grid';
import {ParetoData, ParetoDataI} from "./Pareto";
import {useSearchParams} from "react-router-dom";

export interface BaseCriteriaData {
    Id:         number;
    Name:       string;
    Var1:       boolean[];
}

export type BaseCriteriaDataI = BaseCriteriaData[]|null

export const BaseCriteria: React.FC = () => {

    const [BaseCriteriaData, setBaseCriteriaData] = useState<BaseCriteriaDataI>(null)
    const [searchParams] = useSearchParams();

    const [inputOne, setInputOne] = useState('');

    const [rowData, setRowData] = useState<any[]>([
        {"crit1": false, "crit2": false,"crit3": true,
            "crit4": false,"crit5": true,"crit6": false,"crit7": false,
            "crit8": false,"crit9": true,"crit10": true}
    ]);

    useEffect(() => {
            if (BaseCriteriaData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_base_criteria?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setBaseCriteriaData(responseBody)
                        console.log(responseBody)
                        if (responseBody.var1 && responseBody.name) {
                            setInputOne(responseBody.name)
                            const test = [{
                                "crit1": responseBody.var1[0],
                                "crit2": responseBody.var1[1],
                                "crit3": responseBody.var1[2],
                                "crit4": responseBody.var1[3],
                                "crit5": responseBody.var1[4],
                                "crit6": responseBody.var1[5],
                                "crit7": responseBody.var1[6],
                                "crit8": responseBody.var1[7],
                                "crit9": responseBody.var1[8],
                                "crit10": responseBody.var1[9]
                            }]
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

    let dataBasicCriteria: any[] = [];

    const handleSetBasicCriteria:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();

        dataBasicCriteria.push(Boolean(rowData[0].crit1))
        dataBasicCriteria.push(Boolean(rowData[0].crit2))
        dataBasicCriteria.push(Boolean(rowData[0].crit3))
        dataBasicCriteria.push(Boolean(rowData[0].crit4))
        dataBasicCriteria.push(Boolean(rowData[0].crit5))
        dataBasicCriteria.push(Boolean(rowData[0].crit6))
        dataBasicCriteria.push(Boolean(rowData[0].crit7))
        dataBasicCriteria.push(Boolean(rowData[0].crit8))
        dataBasicCriteria.push(Boolean(rowData[0].crit9))
        dataBasicCriteria.push(Boolean(rowData[0].crit10))

        console.log(dataBasicCriteria)
        const response = await fetch('http://127.0.0.1:8000/api/set_base_criteria',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [
                    dataBasicCriteria[0],
                    dataBasicCriteria[1],
                    dataBasicCriteria[2],
                    dataBasicCriteria[3],
                    dataBasicCriteria[4],
                    dataBasicCriteria[5],
                    dataBasicCriteria[6],
                    dataBasicCriteria[7],
                    dataBasicCriteria[8],
                    dataBasicCriteria[9]
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
    // const containerStyle = useMemo(() => ({ width: '128%', height: '40%' }), []);
    // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crit1', headerName: "Критерий 1" },
        { field: 'crit2', headerName: "Критерий 2" },
        { field: 'crit3', headerName: "Критерий 3" },
        { field: 'crit4', headerName: "Критерий 4" },
        { field: 'crit5', headerName: "Критерий 5" },
        { field: 'crit6', headerName: "Критерий 6" },
        { field: 'crit7', headerName: "Критерий 7" },
        { field: 'crit8', headerName: "Критерий 8" },
        { field: 'crit9', headerName: "Критерий 9" },
        { field: 'crit10', headerName: "Критерий 10" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            width: 120,
        };
    }, []);


    let criteriasNum: number = 10;

    function criteriasBase() {
        let criteriasBase: Array<boolean> = [false, false, true, false, true ,false, false , false, true, true];

        criteriasBase[0] = rowData[0].crit1;
        criteriasBase[1] = rowData[0].crit2;
        criteriasBase[2] = rowData[0].crit3;
        criteriasBase[3] = rowData[0].crit4;
        criteriasBase[4] = rowData[0].crit5;
        criteriasBase[5] = rowData[0].crit6;
        criteriasBase[6] = rowData[0].crit7;
        criteriasBase[7] = rowData[0].crit8;
        criteriasBase[8] = rowData[0].crit9;
        criteriasBase[9] = rowData[0].crit10;

        return criteriasBase;
    }

    let pointWeight: number = 1/countSumPoints(fillPointsArray(criteriasBase()));

    const columns = [
        { key: 'crit1', name: "Критерий 1" },
        { key: 'crit2', name: "Критерий 2" },
        { key: 'crit3', name: "Критерий 3" },
        { key: 'crit4', name: "Критерий 4" },
        { key: 'crit5', name: "Критерий 5" },
        { key: 'crit6', name: "Критерий 6" },
        { key: 'crit7', name: "Критерий 7" },
        { key: 'crit8', name: "Критерий 8" },
        { key: 'crit9', name: "Критерий 9" },
        { key: 'crit10', name: "Критерий 10" },    ];

    const rows = [
        { 'crit1': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[0],
            'crit2': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[1],
            'crit3': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[2],
            'crit4': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[3],
            'crit5': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[4],
            'crit6': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[5],
            'crit7': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[6],
            'crit8': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[7],
            'crit9': countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[8],
            'crit10':countFinalPoints(fillPointsArray(criteriasBase()), pointWeight)[9]}
    ];

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
                <h2>Определение весовых коэффициентов методом базового критерия</h2>

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
                            Один или несколько критериев определяются как базовые - с весом, равным единице,
                            а вес остальных назначаются в зависимости от того, во сколько раз они важнее
                            базового. После чего вычисляется сумма весов. Итоговое значение весового коэффициента
                            для базовых критериев будет равно единице, деленной на полученную сумму,
                            остальные же получат значение, большее значения базового в то количество раз,
                            которое было определено на прошлом этапе.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="4" step="1"
                               onChange={(e) => setRange(e.target.value)  }
                               value = {range}
                               id="customRange"/>
                        <strong>{range}</strong>
                    </div>

                    <div className="input-group mb-3 col p-1">
                        <span className="input-group-text">Название: </span>
                        <input value={inputOne} type="text" className="form-control" onChange={(event) => setInputOne(event.target.value)}/>
                        <button onClick={handleSetBasicCriteria} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>Таблица, показывающая, сколько баллов весят небазовые критерии</h3>
                {"True - базовый критерий, false - небазовый, в 2 раза весомее базового"}
                <div style={{height: "92px", marginBottom: "10px"}}>
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

                <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вывод суммы всех баллов</h3>
                    {countSumPoints(fillPointsArray(criteriasBase())).toString()}
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вывод веса базового критерия</h3>
                    {pointWeight.toString()}
                </div>

                <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вывод значений веса всех критериев</h3>
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
        </div>

    )
}


function fillPointsArray(criteriasBase: Array<boolean>) {

    let criteriasPoints: Array<number> = [0,0,0,0,0,0,0,0,0,0];

    for (let i = 0; i < criteriasPoints.length; i++) {
        if (criteriasBase[i]) {
            criteriasPoints[i] = 1;
        } else {
            criteriasPoints[i] = 2;
        }
    }
    return criteriasPoints;
}

function announceBase(criteriasBase: Array<Boolean>) {
    let AnnounceMessage: String = "";

    for (let i = 0; i < criteriasBase.length; i++) {
        if (criteriasBase[i]) {
            AnnounceMessage += "Критерий " + (i + 1) + " базовый, весит 1 балл; \n";
        } else {
            AnnounceMessage +="Критерий " + (i + 1) + " небазовый, весит 2 балла; \n";
        }
    }

    return AnnounceMessage;
}


function countSumPoints(points: Array<number>) {

    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += points[i];
    }
    return sumPoints;
}



function countFinalPoints(criteriasPoints: Array<number>, pointWeight: number) {
    let criteriasFinalPoints: Array<number> = criteriasPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = criteriasPoints[i] * pointWeight;
    }

    return  criteriasFinalPoints;
}


