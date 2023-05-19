'use strict';

import React, {useState, useCallback, useMemo, useRef, MouseEventHandler, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import {
    ColDef,
    ColGroupDef,
    Grid,
    GridOptions,
    GridReadyEvent,
    ValueGetterParams
} from 'ag-grid-community';

export interface ParetoData {
    Id:         number;
    Name:       string;
    Var1:       number[];
    Var2:       number[];
    Var3:       number[];
}

export type ParetoDataI = ParetoData[]|null

export const Pareto: React.FC = () => {

    const [paretoData, setParetoData] = useState<ParetoDataI>(null)
    const [searchParams] = useSearchParams();

    const [inputOne, setInputOne] = useState('');

    const [rowData, setRowData] = useState<any[]>([
        {"crits":"Критерий 1", "var1": 0,"var2": 0, "var3": 0},
        {"crits":"Критерий 2", "var1": 0,"var2": 0, "var3": 0},
        {"crits":"Критерий 3", "var1": 0,"var2": 0, "var3": 0}
    ]);

    useEffect(()=>{
        console.log(JSON.stringify(rowData))
    },[rowData])

    useEffect(() => {
        if (paretoData) {
            return
        }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_pareto?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setParetoData(responseBody)
                        console.log(responseBody)
                        if (responseBody.var1 && responseBody.var2 && responseBody.var3 && responseBody.name) {
                            setInputOne(responseBody.name)
                            Object.keys(responseBody).map((item: any, i: number) => {
                                const test = [
                                    {"crits":"Критерий 1", "var1": responseBody.var1[0],"var2": responseBody.var1[1], "var3": responseBody.var1[2]},
                                    {"crits":"Критерий 2", "var1": responseBody.var2[0],"var2": responseBody.var2[1], "var3": responseBody.var2[2]},
                                    {"crits":"Критерий 3", "var1": responseBody.var3[0],"var2": responseBody.var3[1], "var3": responseBody.var3[2]}]
                                console.log('test222',test)
                                setRowData(test)
                            })
                        }
                    } else{
                        console.log('prosas')
                    }
                }
            }) ()
        },[searchParams]
    )

    let dataPareto: any[] = [];


    const handleSetPareto:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();
        for (let i=0; i<3; i++) {
            dataPareto.push(Number(rowData[i].var1))
            dataPareto.push(Number(rowData[i].var2))
            dataPareto.push(Number(rowData[i].var3))
        }
        console.log(dataPareto)
        const response = await fetch('http://127.0.0.1:8000/api/set_pareto',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [dataPareto[0],dataPareto[1],dataPareto[2]],
                "var2": [dataPareto[3],dataPareto[4],dataPareto[5]],
                "var3": [dataPareto[6],dataPareto[7],dataPareto[8]]
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

    const handleDeletePareto:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();
        let id = 0;
        paretoData?.map((item: ParetoData, i:number)=>{
            console.log(item.Id)
            id = item.Id
        })
        const response = await fetch('http://127.0.0.1:8000/api/delete_pareto',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "id": id,
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

    let critsVars: Array<Array<number>> = [[3, 2, 1], [1, 2, 3], [3, 2, 3]];

    const [critsVarsCols, setCritsVarsCols] = useState<ColDef[]>([
        { field: 'Crits', headerName: '' },
        { field: 'Var1', headerName: 'Вариант 1', editable: false},
        { field: 'Var2', headerName: 'Вариант 2', editable: false},
        { field: 'Var3', headerName: 'Вариант 3', editable: false}
    ]);

    const critsVarsRows = [
        { crits: 'Критерий 1', var1: critsVars[0][0], var2: critsVars[1][0], var3: critsVars[2][0]},
        { crits: 'Критерий 2', var1: critsVars[0][1], var2: critsVars[1][1], var3: critsVars[2][1]},
        { crits: 'Критерий 3', var1: critsVars[0][2], var2: critsVars[1][2], var3: critsVars[2][2]},
    ];


    const gridRef = useRef<AgGridReact>(null);
    const containerStyle = useMemo(() => ({ width: '85%', height: '90%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    // const [rowData, setRowData] = useState<any[]>(
    //     [
    //         {"crits":"Критерий 1", "var1": 0,"var2": 0, "var3": 0},
    //         {"crits":"Критерий 2", "var1": 0,"var2": 0, "var3": 0},
    //         {"crits":"Критерий 3", "var1": 0,"var2": 0, "var3": 0}]
    // );

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'crits', headerName: "Критерии", editable: false },
        { field: 'var1', headerName: "Вариант 1", editable: true  },
        { field: 'var2', headerName: "Вариант 2", editable: true  },
        { field: 'var3', headerName: "Вариант 3", editable: true  },
    ]);

    //здесь можно добавить общее свойство для всех таблиц
    const defaultColDef = useMemo<ColDef>(() => {
        return {

        };
    }, []);

    function getRows(){
        let matrix: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

        for (let i = 0; i<3; i++) {
            matrix[0][i] = rowData[i].var1;
            matrix[1][i] = rowData[i].var2;
            matrix[2][i] = rowData[i].var3;
        }

        return matrix;
    }


    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    //количество отображаемых шагов
    const [range, setRange] = useState('1');

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
                <h2>Проверка парето-оптимальности вариантов</h2>

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
                            Проверка парето-оптимальности предназначена для поиска заведомо неудачных
                            вариантов. Варианты сравнивают попарно между собой, и если обнаруживается,
                            что в паре один вариант уступает другому по всем критериям, то этот вариант
                            считается неоптимальным, и его рекомендуется не рассматривать при принятии решения.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che" style={{display: "flex"}}>
                    <div>
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4 "
                               style={{width: 150, verticalAlign: "middle"}}
                               min="1" max="3" step="1"
                               onChange={(e) => {setRange(e.target.value);}}
                               value = {range}
                               id="customRange"/>
                        <strong>{range}</strong>
                    </div>

                    <div className="input-group mb-3 p-1" style={{marginLeft: "auto", width: "900px"}}>
                        {/*{*/}
                        {/*    paretoData && (*/}
                        {/*        <button onClick={handleDeletePareto} type="button" className="btn btn-primary" id="button-addon2">Удалить</button>*/}
                        {/*    )*/}
                        {/*}*/}
                        <button onClick={handleDeletePareto} type="button" className="btn btn-primary" id="button-addon2">Удалить</button>
                        <span className="input-group-text">Название: </span>
                        {/*aria-label="Amount (to the nearest dollar)"*/}
                        <input  value={inputOne} type="text" className="form-control" onChange={(event) => setInputOne(event.target.value)}/>
                        {
                            paretoData && (
                                <button type="button" className="btn btn-primary" id="button-addon2">Обновить</button>
                            )
                        }
                        <button onClick={handleSetPareto} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

            <div className="show" >
                <h3>Значения критериев для вариантов:</h3>
            </div>

            <div style={{height: "196px"}}>
                <div style={containerStyle}>

                    <div style={gridStyle} className="ag-theme-alpine">
                        <AgGridReact
                            ref={gridRef}
                            onCellValueChanged={(val)=>{
                                setRowData((old)=>{
                                    return old.map(el=>{
                                        if(val?.data && el.crits === val?.data?.crits){
                                            return val.data
                                        }
                                        return el
                                    })
                                })
                            }}
                            rowData={rowData}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                        />
                    </div>
                </div>
            </div>


            <div className={(range >= "2") ? " show" : " collapse"}>
                <h3>Матрица сравнения вариантов:</h3>
                <div style={{height: "196px"}}>
                    <div style={containerStyle}>
                        <div style={gridStyle} className="ag-theme-alpine">
                            <AgGridReact
                                ref={gridRef}
                                rowData={createRows(compareVars(getRows()), "Вариант")}
                                columnDefs={critsVarsCols}
                                defaultColDef={defaultColDef}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={(range >= "3") ? " show" : " collapse"} >
               <h3>Вывод об оптимальности вариантов:</h3>
                <div>
                    {paretoCheckPrint(paretoCheck(compareVars(getRows())))[0]}
                </div>
                <div>
                    {paretoCheckPrint(paretoCheck(compareVars(getRows())))[1]}
                </div>
                <div>
                    {paretoCheckPrint(paretoCheck(compareVars(getRows())))[2]}
                </div>


            </div>
                {/*<button className="btn btn-primary" onClick={onBtExport}>*/}
                {/*    Export to Excel*/}
                {/*</button>*/}
                <div className="p-4"></div>
            </div>
            {/*</div>*/}
        </div>
    )
}



function rowsToMatrix(rows: any){
    let matrix: Array<Array<number>> = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    matrix[0][0] = rows[0].Var1;
    matrix[0][1] = rows[1].Var1;
    matrix[0][2] = rows[2].Var1;

    matrix[1][0] = rows[0].Var2;
    matrix[1][1] = rows[1].Var2;
    matrix[1][2] = rows[2].Var2;

    matrix[2][0] = rows[0].Var3;
    matrix[2][1] = rows[1].Var3;
    matrix[2][2] = rows[2].Var3;

    return matrix;
}

function printmatrix(matrix: Array<Array<number>>) //приводим всю матрицу в строку
{
    let printedMatrix: string = "";

    for (let i = 0; i < matrix.length; i++){
        printedMatrix = printedMatrix + "\n | ";
        for (let j = 0; j < matrix[i].length; j++){
            printedMatrix = printedMatrix + matrix[i][j] + " ";
        }
    }

    return printedMatrix;
}

function printBoolArray(boolArray: Array<Boolean>) //приводим в строку
{
    let printArray: String = "";
    for (let i = 0; i < 3; i++)
    {
        if (boolArray[i]) {
            printArray = printArray + "1 ";
        }
        else
        {
            printArray = printArray + "0 ";
        }
    }
    return printArray;
}


function compareVars (matrix: Array<Array<number>>) {

    let varsVars: Array<Array<number>> = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]; //все единицы

    for(let i = 0; i < 3; i++) //перебираем варианты
    {
        for(let k = 0; k < 3; k++) //перебираем варианты, с которыми сравниваем
        {
            if (i == k) //если сравниваем вариант с самим собой
            {
                varsVars[i][k] = 0; //то там ноль
            }
            else //если не с самим собой, то смотрим по критериям
            {
                for (let j = 0; j < 3; j++) //перебираем критерии
                {
                    if (matrix[i][j] > matrix[k][j]) //если вариант k уступает хотя бы по одному критерию варианту i
                    {
                        varsVars[i][k] = 0; //то вариант i оптимален
                    }

                }
            }
        }
    }
    return varsVars
}


function paretoCheck (matrix: Array<Array<number>>)
{
    let result: Array<boolean> = [true,true,true]; //по умолчанию - все оптимальны

    for (let i = 0; i < 3; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            if (matrix[i][j] === 1) //если в матрице хотя бы один элемент столбца равен единице
            {
                result[i] = false; // то столбец (вариант) неоптимален
            }
        }
    }

    return result;
}

function paretoCheckPrint (result: Array<boolean>)
{
    let resultPrint: Array<String> = ['', '',''];

    for (let i = 0; i < 3; i++)
    {
        if (result[i])
        {
            resultPrint[i] = "Вариант " + (i+1) + " парето-оптимален \n";
        }
        else
        {
            resultPrint[i] = "Вариант " + (i+1) + " не оптимален \n";
        }
    }

    return resultPrint;
}

function createRows(matrix: Array<Array<number>>, rowName: String){
    const newRows = [
        { Crits: rowName + ' 1', Var1: matrix[0][0], Var2: matrix[1][0], Var3: matrix[2][0]},
        { Crits: rowName + ' 2', Var1: matrix[0][1], Var2: matrix[1][1], Var3: matrix[2][1]},
        { Crits: rowName + ' 3', Var1: matrix[0][2], Var2: matrix[1][2], Var3: matrix[2][2]},
    ];
    return newRows;
}
