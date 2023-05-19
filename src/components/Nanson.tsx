import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";
import {ParetoData, ParetoDataI} from "./Pareto";
import {useSearchParams} from "react-router-dom";

export interface NansonData {
    Id:         number;
    Name:       string;
    Var1:       number[];
    Var2:       string[];
    Var3:       string[];
    Var4:       string[];
}

export type NansonDataI = NansonData[]|null

export const Nanson: React.FC = () => {

    const [nansonData, setNansonData] = useState<NansonDataI>(null)
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
            if (nansonData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_nanson?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setNansonData(responseBody)
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

    let dataNanson: any[] = [];

    const handlerSetNanson:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();

        for (let i = 0; i < 6; i++) {
            dataNanson.push(Number(rowData[i].count))
        }

        console.log(dataNanson)

        const response = await fetch('http://127.0.0.1:8000/api/set_nanson',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [
                    dataNanson[0],
                    dataNanson[1],
                    dataNanson[2],
                    dataNanson[3],
                    dataNanson[4],
                    dataNanson[5],
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
    const containerStyle = useMemo(() => ({ width: '92%', height: '95%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const onBtExport = useCallback(() => {
        gridRef.current!.api.exportDataAsCsv();
    }, []);

    const [variants, setVariants] = useState([1, 1, 1]);


    const [columnDefsStepTwo, setColumnDefsStepTwo] = useState<ColDef[]>([
        { field: 'varName', headerName: "Вариант"},
        { field: 'comparison1', headerName: "Вариант 1" },
        { field: 'comparison2', headerName: "Вариант 2" },
        { field: 'comparison3', headerName: "Вариант 3" }
    ]);

    const [rowDataStepTwo, setRowDataStepTwo] = useState<any[]>(
        [
            {   "varName": "Вариант 1",
                "comparison1": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[0][0],
                "comparison2": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[0][1],
                "comparison3": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[0][2]},
            {   "varName": "Вариант 2",
                "comparison1": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[1][0],
                "comparison2": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[1][1],
                "comparison3": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[1][2]},
            {   "varName": "Вариант 3",
                "comparison1": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[2][0],
                "comparison2": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[2][1],
                "comparison3": reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars)))[2][2]},
            ]
    );

    function expsVars() {
        let expsVars: Array<number> = [29, 0, 6, 17, 14, 14]; //длина массива - expertsTypes, т.е. факториал от кол-ва вариантов
        for (let i = 0; i<6; i++) {
            expsVars[i] = rowData[i].count;
        }
        return expsVars
    }

    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { field: 'count', headerName: "Кол-во экспертов", editable: true, width: 240 },
        { field: 'place1', headerName: "1 место" },
        { field: 'place2', headerName: "2 место" },
        { field: 'place3', headerName: "3 место" },
    ]);

    const columns = [{key: 'vars', name: 'Вариант сравнения'},
        {key: 'var1', name: 'Вариант 1'},
        {key: 'var2', name: 'Вариант 2'},
        {key: 'var3', name: 'Вариант 3'}]

    const rows = [
        {'vars': 'Вариант 1', 'var1': nansonPairComparison(expsVars(), vars)[0][0],
         'var2': nansonPairComparison(expsVars(), vars)[0][1],
         'var3': nansonPairComparison(expsVars(), vars)[0][2]},
        {'vars': 'Вариант 2', 'var1': nansonPairComparison(expsVars(), vars)[1][0],
            'var2': nansonPairComparison(expsVars(), vars)[1][1],
            'var3': nansonPairComparison(expsVars(), vars)[1][2]},
        {'vars': 'Вариант 3', 'var1': nansonPairComparison(expsVars(), vars)[2][0],
            'var2': nansonPairComparison(expsVars(), vars)[2][1],
            'var3': nansonPairComparison(expsVars(), vars)[2][2]}]

    const columns2 = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" },
    ];

    const rows2 = [
        {   'crit1': countMatrixPoints((nansonPairComparison(expsVars(), vars)))[0],
            'crit2': countMatrixPoints((nansonPairComparison(expsVars(), vars)))[1],
            'crit3': countMatrixPoints((nansonPairComparison(expsVars(), vars)))[2]}
    ];

    const columns3 = [
        { key: 'crit1', name: "Вариант 1" },
        { key: 'crit2', name: "Вариант 2" },
        { key: 'crit3', name: "Вариант 3" }
    ];

    const rows3 = [
        {   'crit1': countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars))))[0],
            'crit2': countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars))))[1],
            'crit3': countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars), findWorstOption(countNansonPoints(expsVars(), vars))))[2]}
    ];


    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            result[i]=result[i]+nansonPairComparison(expsVars(), vars)[i][j];
        }

    }

    //сделать все столбцы шириной 200
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            width: 200,
        };
    }, []);

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
                <h2>Прямой метод принятия решений процедурой Нансона</h2>

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
                            Затем составляется матрица парного сравнения элементов. Если N экспертов
                            считают, что вариант i лучше варианта j, то в ячейку j-го столбца i-й строки
                            ставится N. Затем считается сумма значений по строке. Вариант, набравший
                            наименьший результат, отбрасывается, и матрица строится заново. Алгоритм повторяется,
                            пока не останется один вариант. Он считается наилучшим.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="8" step="1"
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
                        <button onClick={handlerSetNanson} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>Таблица с мнениями экспертов для трёх вариантов</h3>

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

                <div className="p-3">
                    <div className={(range >= "2") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Матрица парного сравнения вариантов</h3>
                        <DataGrid columns={columns} rows={rows}/>
                    </div>

                    <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Подсчет баллов для трех вариантов</h3>
                        <DataGrid columns={columns2} rows={rows2}/>
                    </div>

                    <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Отсеивание наименьшего варианта</h3>
                        {"Худший вариант: " + (findWorstOption(countMatrixPoints((nansonPairComparison(expsVars(), vars)))) + 1)}
                    </div>

                    <div className={(range >= "5") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Матрица парного сравнения оставшихся вариантов</h3>
                        <div style={{height: "186px"}}>
                            <div style={containerStyle}>

                                <div style={gridStyle} className="ag-theme-alpine">
                                    <AgGridReact
                                        ref={gridRef}
                                        rowData={rowDataStepTwo}
                                        columnDefs={columnDefsStepTwo}
                                        defaultColDef={defaultColDef}
                                    ></AgGridReact>
                                </div>
                            </div>
                        </div>

                        <div className={(range >= "6") ? "accordion-body show" : "accordion-body collapse"}>
                            <h3>Подсчет баллов для двух вариантов</h3>
                            <DataGrid columns={columns3} rows={rows3}/>
                        </div>
                    </div>

                    <div className={(range >= "7") ? "accordion-body show" : "accordion-body collapse"}>
                        <h3>Отсеивание наименьшего варианта</h3>
                        {"Худший вариант: " + (findWorstOption(countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars),
                            findWorstOption(countNansonPoints(expsVars(), vars))))) + 1)}
                    </div>

                    <div className={(range >= "8") ? "accordion-body show" : "accordion-body collapse"}>
                            <h3>Вывод лучшего варианта</h3>
                            {"Победивший вариант - "}
                            {findLastOption
                            (   findWorstOption(countMatrixPoints(reduceMatrix(nansonPairComparison(expsVars(), vars),
                                    findWorstOption(countNansonPoints(expsVars(), vars))))),
                                findWorstOption(countMatrixPoints((nansonPairComparison(expsVars(), vars))))  )
                                + 1}
                    </div>
                </div>
            </div>
        </div>
    )
}


let vars: Array<Array<number>> = [[3, 2, 1], [3, 1, 2],[2, 3, 1], [1, 3, 2], [2,1,3], [1,2,3]]; //все возможные варианты расстановки мест

let result: Array<number> = [0,0,0]; //длина массива - количество вариантов


function countNansonPoints (expsVars: Array<number>, vars: Array<Array<number>>) //подсчёт очков каждого варианта с целью поиска худшего
{
    let result: Array<number> = [0,0,0]; //длина массива - количество вариантов

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < result.length; j++) {
            result[j] = result[j] + expsVars[i] * vars[i][j];
        }
    }
    return result;
}

function nansonPairComparison (expsVars: Array<number>, vars: Array<Array<number>>) //создание матрицы парного сравнения вариантов
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


function findWorstOption(pointArray: Array<number>)
{
    let worstOption: number = 0;

    for (let i = 0; i < pointArray.length; i++) {
        if (pointArray[i] < pointArray[worstOption] && pointArray[i] != 0) {
            worstOption = i;
        }
    }

    return worstOption;
}


function reduceMatrixWithSplice(matrix: Array<Array<number>>, unwantedOption: number)
{
    let newMatrix: Array<Array<number>> = matrix;
    newMatrix.splice(unwantedOption, 1)

    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i].splice(unwantedOption, 1)
    }

    return newMatrix
}

function reduceMatrix(matrix: Array<Array<number>>, unwantedOption: number)
{
    let newMatrix: Array<Array<number>> = matrix;

    for (let i = 0; i < matrix.length; i++) {
        newMatrix[i][unwantedOption] = 0;
        newMatrix[unwantedOption][i] = 0;
    }

    return newMatrix
}


function countMatrixPoints(matrixComparison: Array<Array<number>>)
{
    let totalPoints: Array<number> = [];

    for (let i = 0; i < matrixComparison.length; i++)
    {
        totalPoints.push(0);
        for (let j = 0; j < matrixComparison[i].length; j++)
        {
            totalPoints[i] = totalPoints[i] + matrixComparison[i][j];
        }
    }
    return totalPoints;
}

function findLastOption(loser1: number, loser2: number){

    let arr: Array<boolean> = [true, true, true];

    arr[loser1] = false;
    arr[loser2] = false;

    let winner: number = 100;

    for (let i = 0; i < arr.length; i++)
    {
        if (arr[i]) { winner = i }
    }

    return winner;
}
