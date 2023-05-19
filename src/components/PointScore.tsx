import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";
import {ParetoData, ParetoDataI} from "./Pareto";
import {useSearchParams} from "react-router-dom";

export interface PointScoreData {
    Id:         number;
    Name:       string;
    Var1:       number[];
}

export type PointScoreDataI = PointScoreData[]|null

export const PointScore: React.FC = () => {

    const [pointScoreData, setPointScoreData] = useState<PointScoreDataI>(null)
    const [searchParams] = useSearchParams();

    const [inputOne, setInputOne] = useState('');

    const [rowData, setRowData] = useState<any[]>(
        [   {"crit1": 100, "crit2": 75,"crit3": 75,
            "crit4": 75,"crit5": 75,"crit6": 50,"crit7": 100,
            "crit8": 100,"crit9": 50,"crit10": 50} ]
    );

    useEffect(() => {
            if (pointScoreData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_point_score?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setPointScoreData(responseBody)
                        console.log(responseBody)
                        if (responseBody.name && responseBody.var1) {
                            setInputOne(responseBody.name)
                            const test = [
                                {
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
                                }
                            ]
                            console.log('test',test)
                            setRowData(test)

                        }

                    } else{
                        console.log('prosas')
                    }
                }
            }) ()
        },[searchParams]
    )

    let dataPointScore: any[] = [];


    const handleSetPointScore:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();

        dataPointScore.push(Number(rowData[0].crit1))
        dataPointScore.push(Number(rowData[0].crit2))
        dataPointScore.push(Number(rowData[0].crit3))
        dataPointScore.push(Number(rowData[0].crit4))
        dataPointScore.push(Number(rowData[0].crit5))
        dataPointScore.push(Number(rowData[0].crit6))
        dataPointScore.push(Number(rowData[0].crit7))
        dataPointScore.push(Number(rowData[0].crit8))
        dataPointScore.push(Number(rowData[0].crit9))
        dataPointScore.push(Number(rowData[0].crit10))

        console.log(dataPointScore)

        const response = await fetch('http://127.0.0.1:8000/api/set_point_score',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [
                    dataPointScore[0],
                    dataPointScore[1],
                    dataPointScore[2],
                    dataPointScore[3],
                    dataPointScore[4],
                    dataPointScore[5],
                    dataPointScore[6],
                    dataPointScore[7],
                    dataPointScore[8],
                    dataPointScore[9]
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

    const [range, setRange] = useState('1');

    const gridRef = useRef<AgGridReact>(null);
    // const containerStyle = useMemo(() => ({ width: '128%', height: '40%' }), []);
    // const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const containerStyle = useMemo(() => ({ width: '128%', height: '90%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%', overflow: 'scroll' }), []);

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

    let criteriasNum: number = 10;

    function criteriasPoints() {
        let criteriasPoints: Array<number> = [100, 75, 75, 75, 75, 50, 100, 100, 50, 50];

        criteriasPoints[0] = rowData[0].crit1;
        criteriasPoints[1] = rowData[0].crit2;
        criteriasPoints[2] = rowData[0].crit3;
        criteriasPoints[3] = rowData[0].crit4;
        criteriasPoints[4] = rowData[0].crit5;
        criteriasPoints[5] = rowData[0].crit6;
        criteriasPoints[6] = rowData[0].crit7;
        criteriasPoints[7] = rowData[0].crit8;
        criteriasPoints[8] = rowData[0].crit9;
        criteriasPoints[9] = rowData[0].crit10;

        return criteriasPoints;
    }

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            width: 120,
        };
    }, []);

    let pointWeight: number = 1/countSumPoints(criteriasPoints());


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
        { 'crit1': (countFinalPoints(criteriasPoints()))[0],
            'crit2': (countFinalPoints(criteriasPoints()))[1],
            'crit3': (countFinalPoints(criteriasPoints()))[2],
            'crit4': (countFinalPoints(criteriasPoints()))[3],
            'crit5': (countFinalPoints(criteriasPoints()))[4],
            'crit6': (countFinalPoints(criteriasPoints()))[5],
            'crit7': (countFinalPoints(criteriasPoints()))[6],
            'crit8': (countFinalPoints(criteriasPoints()))[7],
            'crit9': (countFinalPoints(criteriasPoints()))[8],
            'crit10':(countFinalPoints(criteriasPoints()))[9]}
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
                <h2>Определение весовых коэффициентов методом бальной оценки</h2>

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
                            Каждому критерию даётся оценка по стобалльной шкале. Затем
                            оценки складываются, и итоговое значение весового коэффициента
                            получается путём умножения оценки на единицу, деленную на сумму всех оценок.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="4" step="1"
                               onChange={(e) => setRange(e.target.value) }
                               value = {range}
                               id="customRange"/>
                        <strong>{range}</strong>
                    </div>

                    <div className="input-group mb-3 col p-1">
                        <span className="input-group-text">Название: </span>
                        <input value={inputOne} type="text" className="form-control" onChange={(event) => setInputOne(event.target.value)}/>
                        <button onClick={handleSetPointScore} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>таблица для ввода значений критериев</h3>
                <div style={{height: "103px"}}>
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
                    <h3>вывод суммы всех баллов</h3>
                    {countSumPoints(criteriasPoints())}
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>вывод веса одного балла критерия</h3>
                    {pointWeight}
                </div>

                <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>вывод значений веса всех критериев</h3>
                    <DataGrid columns={columns} rows={rows}/>
                </div>
            </div>
        </div>
    )
}


function countSumPoints(points: Array<number>)
{
    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += Number(points[i]);
    }
    return sumPoints;
}


function countFinalPoints(critPoints: Array<number>)
{
    let sumPoints: number = 0;

    let criteriasFinalPoints: Array<number> = critPoints;

    for (let i = 0; i < critPoints.length; i++) {
        sumPoints += Number(critPoints[i]);
    }

    let pointWeight: number = 1/sumPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = critPoints[i] * pointWeight;
    }
    return  criteriasFinalPoints;
}

