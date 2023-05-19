import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";
import {useSearchParams} from "react-router-dom";

export interface WeightedSumData {
    Id:         number;
    Name:       string;
    Var1:       string[];
    Var2:       number[];
    Var3:       number[];
    Var4:       number[];
    Var5:       number[];
}

export type WeightedSumDataI = WeightedSumData[]|null

export const WeightedSum: React.FC = () => {

    const [weightedSumData, setWeightedSumData] = useState<WeightedSumDataI>(null)
    const [searchParams] = useSearchParams();

    const [inputOne, setInputOne] = useState('');

    const [rowData, setRowData] = useState<any[]>(
        [
            {"crits":"Критерий 1", "weights": 0.157, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 2", "weights": 0.095, "var1": 1,"var2": 1, "var3": 0.75},
            {"crits":"Критерий 3", "weights": 0.095, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 4", "weights": 0.095, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 5", "weights": 0.095, "var1": 1,"var2": 0.89, "var3": 0.83},
            {"crits":"Критерий 6", "weights": 0.05,  "var1": 0.5,"var2": 1, "var3": 1},
            {"crits":"Критерий 7", "weights": 0.157, "var1": 0.67,"var2": 0.83, "var3": 1},
            {"crits":"Критерий 8", "weights": 0.157, "var1": 0.667,"var2": 0.833, "var3": 0},
            {"crits":"Критерий 9", "weights": 0.05,  "var1": 1,"var2": 0.8, "var3": 0.9},
            {"crits":"Критерий 10", "weights": 0.05,  "var1": 1,"var2": 0.9, "var3": 0.9}
        ]
    );

    useEffect(() => {
            if (weightedSumData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_weighted_sum?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setWeightedSumData(responseBody)
                        console.log(responseBody)

                        if (
                            responseBody.name &&
                            responseBody.var1 &&
                            responseBody.var2 &&
                            responseBody.var3 &&
                            responseBody.var4 &&
                            responseBody.var5
                        ) {
                            setInputOne(responseBody.name)

                            const test = [
                                {"crits": responseBody.var1[0], "weights": responseBody.var2[0], "var1": responseBody.var3[0],"var2": responseBody.var4[0], "var3": responseBody.var5[0]},
                                {"crits": responseBody.var1[1], "weights": responseBody.var2[1], "var1": responseBody.var3[1],"var2": responseBody.var4[1], "var3": responseBody.var5[1]},
                                {"crits": responseBody.var1[2], "weights": responseBody.var2[2], "var1": responseBody.var3[2],"var2": responseBody.var4[2], "var3": responseBody.var5[2]},
                                {"crits": responseBody.var1[3], "weights": responseBody.var2[3], "var1": responseBody.var3[3],"var2": responseBody.var4[3], "var3": responseBody.var5[3]},
                                {"crits": responseBody.var1[4], "weights": responseBody.var2[4], "var1": responseBody.var3[4],"var2": responseBody.var4[4], "var3": responseBody.var5[4]},
                                {"crits": responseBody.var1[5], "weights": responseBody.var2[5], "var1": responseBody.var3[5],"var2": responseBody.var4[5], "var3": responseBody.var5[5]},
                                {"crits": responseBody.var1[6], "weights": responseBody.var2[6], "var1": responseBody.var3[6],"var2": responseBody.var4[6], "var3": responseBody.var5[6]},
                                {"crits": responseBody.var1[7], "weights": responseBody.var2[7], "var1": responseBody.var3[7],"var2": responseBody.var4[7], "var3": responseBody.var5[7]},
                                {"crits": responseBody.var1[8], "weights": responseBody.var2[8], "var1": responseBody.var3[8],"var2": responseBody.var4[8], "var3": responseBody.var5[8]},
                                {"crits": responseBody.var1[9], "weights": responseBody.var2[9], "var1": responseBody.var3[9],"var2": responseBody.var4[9], "var3": responseBody.var5[9]}
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

    let dataWeightedSumVar1: any[] = [];
    let dataWeightedSumVar2: any[] = [];
    let dataWeightedSumVar3: any[] = [];
    let dataWeightedSumVar4: any[] = [];
    let dataWeightedSumVar5: any[] = [];

    const handlerSetWeightedSum:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();

        for (let i = 0; i < 10; i++) {
            dataWeightedSumVar1.push(String(rowData[i].crits))
            dataWeightedSumVar2.push(Number(rowData[i].weights))
            dataWeightedSumVar3.push(Number(rowData[i].var1))
            dataWeightedSumVar4.push(Number(rowData[i].var2))
            dataWeightedSumVar5.push(Number(rowData[i].var3))
        }

        console.log(dataWeightedSumVar1)
        console.log(dataWeightedSumVar2)
        console.log(dataWeightedSumVar3)
        console.log(dataWeightedSumVar4)
        console.log(dataWeightedSumVar5)

        const response = await fetch('http://127.0.0.1:8000/api/set_weighted_sum',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [
                    dataWeightedSumVar1[0],
                    dataWeightedSumVar1[1],
                    dataWeightedSumVar1[2],
                    dataWeightedSumVar1[3],
                    dataWeightedSumVar1[4],
                    dataWeightedSumVar1[5],
                    dataWeightedSumVar1[6],
                    dataWeightedSumVar1[7],
                    dataWeightedSumVar1[8],
                    dataWeightedSumVar1[9],
                ],
                "var2": [
                    dataWeightedSumVar2[0],
                    dataWeightedSumVar2[1],
                    dataWeightedSumVar2[2],
                    dataWeightedSumVar2[3],
                    dataWeightedSumVar2[4],
                    dataWeightedSumVar2[5],
                    dataWeightedSumVar2[6],
                    dataWeightedSumVar2[7],
                    dataWeightedSumVar2[8],
                    dataWeightedSumVar2[9],
                ],
                "var3": [
                    dataWeightedSumVar3[0],
                    dataWeightedSumVar3[1],
                    dataWeightedSumVar3[2],
                    dataWeightedSumVar3[3],
                    dataWeightedSumVar3[4],
                    dataWeightedSumVar3[5],
                    dataWeightedSumVar3[6],
                    dataWeightedSumVar3[7],
                    dataWeightedSumVar3[8],
                    dataWeightedSumVar3[9],
                ],
                "var4": [
                    dataWeightedSumVar4[0],
                    dataWeightedSumVar4[1],
                    dataWeightedSumVar4[2],
                    dataWeightedSumVar4[3],
                    dataWeightedSumVar4[4],
                    dataWeightedSumVar4[5],
                    dataWeightedSumVar4[6],
                    dataWeightedSumVar4[7],
                    dataWeightedSumVar4[8],
                    dataWeightedSumVar4[9],
                ],
                "var5": [
                    dataWeightedSumVar5[0],
                    dataWeightedSumVar5[1],
                    dataWeightedSumVar5[2],
                    dataWeightedSumVar5[3],
                    dataWeightedSumVar5[4],
                    dataWeightedSumVar5[5],
                    dataWeightedSumVar5[6],
                    dataWeightedSumVar5[7],
                    dataWeightedSumVar5[8],
                    dataWeightedSumVar5[9],
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
    const containerStyle = useMemo(() => ({ width: '78%', height: '95%'}), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);


    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crits', headerName: "Критерий" },
        { field: 'weights', headerName: "Вес критерия" },
        { field: 'var1', headerName: "Вариант 1" },
        { field: 'var2', headerName: "Вариант 2" },
        { field: 'var3', headerName: "Вариант 3" },
    ]);

    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            width: 140
        };
    }, []);

    let criteriasNum: number = 10;

    function criteriasWeight() {

        let criteriasWeight: Array<number> = [0.157, 0.095, 0.095, 0.095, 0.095, 0.05, 0.157, 0.157, 0.05, 0.05];

        for (let i = 0; i< 10; i++){
            criteriasWeight[i] = rowData[i].weights;
        }
        return criteriasWeight
    }

    function critVars() {
        let critVars: Array<Array<number>> = [
            [1, 0.89, 0.83],
            [1, 1, 0.75],
            [1, 0.89, 0.83],
            [1, 0.89, 0.83],
            [1, 0.89, 0.83],
            [0.5, 1, 1],
            [0.67, 0.83, 1],
            [0.667, 0.833, 1],
            [1, 0.8, 0.9],
            [1, 0.9, 0.9]];

        for (let i = 0; i<10; i++){
            critVars[i][0] = rowData[i].var1;
            critVars[i][1] = rowData[i].var2;
            critVars[i][2] = rowData[i].var3;
        }
        return critVars;
    }

    const columns = [
        { key: 'crits', name: "Критерии" },
        { key: 'var1', name: "Вариант 1" },
        { key: 'var2', name: "Вариант 2" },
        { key: 'var3', name: "Вариант 3" }];

    const rows = [
        { 'crits' : "Критерий 1", 'var1' :  NormingCrits(critVars())[0][0], 'var2' :  NormingCrits(critVars())[0][1],  'var3' : NormingCrits(critVars())[0][2]},
        { 'crits' : "Критерий 2", 'var1' :  NormingCrits(critVars())[1][0], 'var2' :  NormingCrits(critVars())[1][1],  'var3' : NormingCrits(critVars())[1][2]},
        { 'crits' : "Критерий 3", 'var1' :  NormingCrits(critVars())[2][0], 'var2' :  NormingCrits(critVars())[2][1],  'var3' : NormingCrits(critVars())[2][2]},
        { 'crits' : "Критерий 4", 'var1' :  NormingCrits(critVars())[3][0], 'var2' :  NormingCrits(critVars())[3][1],  'var3' : NormingCrits(critVars())[3][2]},
        { 'crits' : "Критерий 5", 'var1' :  NormingCrits(critVars())[4][0], 'var2' :  NormingCrits(critVars())[4][1],  'var3' : NormingCrits(critVars())[4][2]},
        { 'crits' : "Критерий 6", 'var1' :  NormingCrits(critVars())[5][0], 'var2' :  NormingCrits(critVars())[5][1],  'var3' : NormingCrits(critVars())[5][2]},
        { 'crits' : "Критерий 7", 'var1' :  NormingCrits(critVars())[6][0], 'var2' :  NormingCrits(critVars())[6][1],  'var3' : NormingCrits(critVars())[6][2]},
        { 'crits' : "Критерий 8", 'var1' :  NormingCrits(critVars())[7][0], 'var2' :  NormingCrits(critVars())[7][1],  'var3' : NormingCrits(critVars())[7][2]},
        { 'crits' : "Критерий 9", 'var1' :  NormingCrits(critVars())[8][0], 'var2' :  NormingCrits(critVars())[8][1],  'var3' : NormingCrits(critVars())[8][2]},
        { 'crits' : "Критерий 10", 'var1' :  NormingCrits(critVars())[9][0], 'var2' :  NormingCrits(critVars())[9][1],  'var3' : NormingCrits(critVars())[9][2]}
    ]

    const columns2 = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" },
    ];

    const rows2 = [
        { 'crit1': countWeight(NormingCrits(critVars()),criteriasWeight() )[0],
            'crit2': countWeight(NormingCrits(critVars()),criteriasWeight() )[1],
            'crit3': countWeight(NormingCrits(critVars()),criteriasWeight() )[2]}
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
                <h2>Принятие решений с использованием интегрального критерия взвешенной суммы показателей сравнения</h2>

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
                            Составляется таблица, строки которой отвечают за критерии, а столбцы - за варианты.
                            Дополнительный столбец заполняется весовыми значениями коэффициентов.
                            Значения критериев нормализуются, т.е. приводятся в единую шкалу - от 0 до 1.
                            После чего суммируются произведения нормализованных критериев на соответствующие
                            весовые коэффициенты.
                            Вариант, набравший максимальную сумму, считается наилучшим.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="4" step="1"
                               onChange={(e) =>setRange(e.target.value) }
                               value = {range}
                               id="customRange"/>
                        <strong>{range}</strong>
                    </div>

                    <div className="input-group mb-3 col p-1">
                        <span className="input-group-text">Название: </span>
                        <input value={inputOne} type="text" className="form-control" onChange={(event) => setInputOne(event.target.value)}/>
                        <button onClick={handlerSetWeightedSum} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>Таблица для ввода значений критериев</h3>
                <div style={{height: "496px"}}>
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
                    <h3>Таблица с нормированными значениями</h3>
                    <DataGrid columns={columns} rows={rows}/>
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Одномерная таблица с подсчитанной взвешенной суммой для каждого варианта</h3>
                    <DataGrid columns={columns2} rows={rows2}/>
                </div>

                <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вывод номера лучшего варианта</h3>
                    {findBestOption(countWeight(NormingCrits(critVars()),criteriasWeight() ))}
                </div>
            </div>
        </div>
    )
}


function NormingCrits (matrix: Array<Array<number>>){
    let maxPoint: number;
    for (let i = 0; i < matrix.length; i++)
    {
        maxPoint = 0;
        for (let j = 0; j < matrix[i].length; j++)
        {
            if (matrix[i][j] > maxPoint)
            {
                maxPoint = matrix[i][j];
            }
        }

        for (let j = 0; j < matrix[i].length; j++)
        {
            matrix[i][j] = matrix[i][j]/maxPoint;
        }
    }
    return matrix;
}


function countWeight (matrix: Array<Array<number>>, criteriasWeight: Array<number>)
{
    let totalPoints: Array<number> = [0,0,0]

    for (let i = 0; i < matrix.length; i++)
    {
        for (let j = 0; j < matrix[i].length; j++)
        {
            totalPoints[j] = totalPoints[j] + criteriasWeight[i]*matrix[i][j];
        }
    }
    return totalPoints;
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
