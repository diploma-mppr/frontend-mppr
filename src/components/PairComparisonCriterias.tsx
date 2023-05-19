import React, {MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Hub} from "./Hub";
import {AgGridReact} from "ag-grid-react";
import {ColDef} from "ag-grid-community";
import DataGrid from "react-data-grid";
import {ParetoData, ParetoDataI} from "./Pareto";
import {useSearchParams} from "react-router-dom";

export interface PairComparisonCriteriaData {
    Id:         number;
    Name:       string;
    Var1:       number[];
    Var2:       number[];
    Var3:       number[];
    Var4:       number[];
    Var5:       number[];
    Var6:       number[];
    Var7:       number[];
    Var8:       number[];
    Var9:       number[];
    Var10:       number[];
}

export type PairComparisonCriteriaDataI = PairComparisonCriteriaData[]|null

export const PairComparisonCriterias: React.FC = () => {

    const [PairComparisonCriteriaData, setPairComparisonCriteriaData] = useState<PairComparisonCriteriaDataI>(null)
    const [searchParams] = useSearchParams();

    const [inputOne, setInputOne] = useState('');

    const [rowData, setRowData] = useState<any[]>(
        [
            {"crit1": 1, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 1,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 1, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 1,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 1,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 1,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 1, "crit8": 0,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 1,"crit9": 0,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 1,"crit10": 0,},
            {"crit1": 0, "crit2": 0,"crit3": 0, "crit4": 0,"crit5": 0,"crit6": 0,"crit7": 0, "crit8": 0,"crit9": 0,"crit10": 1,}]
    );

    useEffect(() => {
            if (PairComparisonCriteriaData) {
                return
            }
            (async ()=> {

                if (searchParams.get("id") === null) {
                    console.log("doesn't have params")
                } else {
                    console.log(searchParams.get("id"))
                    const response = await fetch(`http://127.0.0.1:8000/api/get_pair_comparison_criteria?id=${searchParams.get("id")}`,{
                        method:'GET',
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8"
                        }
                    })
                    if(response.ok){
                        console.log('success')
                        const responseBody = await response.json();
                        setPairComparisonCriteriaData(responseBody)
                        console.log(responseBody)
                        if (
                            responseBody.name &&
                            responseBody.var1 &&
                            responseBody.var2 &&
                            responseBody.var3 &&
                            responseBody.var4 &&
                            responseBody.var5 &&
                            responseBody.var6 &&
                            responseBody.var7 &&
                            responseBody.var8 &&
                            responseBody.var9 &&
                            responseBody.var10
                        ) {
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
                                    "crit10": responseBody.var1[9],
                                },
                                {
                                    "crit1": responseBody.var2[0],
                                    "crit2": responseBody.var2[1],
                                    "crit3": responseBody.var2[2],
                                    "crit4": responseBody.var2[3],
                                    "crit5": responseBody.var2[4],
                                    "crit6": responseBody.var2[5],
                                    "crit7": responseBody.var2[6],
                                    "crit8": responseBody.var2[7],
                                    "crit9": responseBody.var2[8],
                                    "crit10": responseBody.var2[9],
                                },
                                {
                                    "crit1": responseBody.var3[0],
                                    "crit2": responseBody.var3[1],
                                    "crit3": responseBody.var3[2],
                                    "crit4": responseBody.var3[3],
                                    "crit5": responseBody.var3[4],
                                    "crit6": responseBody.var3[5],
                                    "crit7": responseBody.var3[6],
                                    "crit8": responseBody.var3[7],
                                    "crit9": responseBody.var3[8],
                                    "crit10": responseBody.var3[9],
                                },
                                {
                                    "crit1": responseBody.var4[0],
                                    "crit2": responseBody.var4[1],
                                    "crit3": responseBody.var4[2],
                                    "crit4": responseBody.var4[3],
                                    "crit5": responseBody.var4[4],
                                    "crit6": responseBody.var4[5],
                                    "crit7": responseBody.var4[6],
                                    "crit8": responseBody.var4[7],
                                    "crit9": responseBody.var4[8],
                                    "crit10": responseBody.var4[9],
                                },
                                {
                                    "crit1": responseBody.var5[0],
                                    "crit2": responseBody.var5[1],
                                    "crit3": responseBody.var5[2],
                                    "crit4": responseBody.var5[3],
                                    "crit5": responseBody.var5[4],
                                    "crit6": responseBody.var5[5],
                                    "crit7": responseBody.var5[6],
                                    "crit8": responseBody.var5[7],
                                    "crit9": responseBody.var5[8],
                                    "crit10": responseBody.var5[9],
                                },
                                {
                                    "crit1": responseBody.var6[0],
                                    "crit2": responseBody.var6[1],
                                    "crit3": responseBody.var6[2],
                                    "crit4": responseBody.var6[3],
                                    "crit5": responseBody.var6[4],
                                    "crit6": responseBody.var6[5],
                                    "crit7": responseBody.var6[6],
                                    "crit8": responseBody.var6[7],
                                    "crit9": responseBody.var6[8],
                                    "crit10": responseBody.var6[9],
                                },
                                {
                                    "crit1": responseBody.var7[0],
                                    "crit2": responseBody.var7[1],
                                    "crit3": responseBody.var7[2],
                                    "crit4": responseBody.var7[3],
                                    "crit5": responseBody.var7[4],
                                    "crit6": responseBody.var7[5],
                                    "crit7": responseBody.var7[6],
                                    "crit8": responseBody.var7[7],
                                    "crit9": responseBody.var7[8],
                                    "crit10": responseBody.var7[9],
                                },
                                {
                                    "crit1": responseBody.var8[0],
                                    "crit2": responseBody.var8[1],
                                    "crit3": responseBody.var8[2],
                                    "crit4": responseBody.var8[3],
                                    "crit5": responseBody.var8[4],
                                    "crit6": responseBody.var8[5],
                                    "crit7": responseBody.var8[6],
                                    "crit8": responseBody.var8[7],
                                    "crit9": responseBody.var8[8],
                                    "crit10": responseBody.var8[9],
                                },
                                {
                                    "crit1": responseBody.var9[0],
                                    "crit2": responseBody.var9[1],
                                    "crit3": responseBody.var9[2],
                                    "crit4": responseBody.var9[3],
                                    "crit5": responseBody.var9[4],
                                    "crit6": responseBody.var9[5],
                                    "crit7": responseBody.var9[6],
                                    "crit8": responseBody.var9[7],
                                    "crit9": responseBody.var9[8],
                                    "crit10": responseBody.var9[9],
                                },
                                {
                                    "crit1": responseBody.var10[0],
                                    "crit2": responseBody.var10[1],
                                    "crit3": responseBody.var10[2],
                                    "crit4": responseBody.var10[3],
                                    "crit5": responseBody.var10[4],
                                    "crit6": responseBody.var10[5],
                                    "crit7": responseBody.var10[6],
                                    "crit8": responseBody.var10[7],
                                    "crit9": responseBody.var10[8],
                                    "crit10": responseBody.var10[9],
                                }
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

    let dataPairComparisonCriteria: any[] = [];

    const handleSetPairComparisonCriteria:MouseEventHandler<HTMLButtonElement> = async (event)=>{
        event.preventDefault();

        for (let i = 0; i < 10; i++) {
            dataPairComparisonCriteria.push(Number(rowData[i].crit1))
            dataPairComparisonCriteria.push(Number(rowData[i].crit2))
            dataPairComparisonCriteria.push(Number(rowData[i].crit3))
            dataPairComparisonCriteria.push(Number(rowData[i].crit4))
            dataPairComparisonCriteria.push(Number(rowData[i].crit5))
            dataPairComparisonCriteria.push(Number(rowData[i].crit6))
            dataPairComparisonCriteria.push(Number(rowData[i].crit7))
            dataPairComparisonCriteria.push(Number(rowData[i].crit8))
            dataPairComparisonCriteria.push(Number(rowData[i].crit9))
            dataPairComparisonCriteria.push(Number(rowData[i].crit10))
        }

        console.log(dataPairComparisonCriteria)

        const response = await fetch('http://127.0.0.1:8000/api/set_pair_comparison_criteria',{
            method:'POST',
            credentials: "include",
            headers:{
                "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                "name": inputOne,
                "var1": [
                    dataPairComparisonCriteria[0],
                    dataPairComparisonCriteria[1],
                    dataPairComparisonCriteria[2],
                    dataPairComparisonCriteria[3],
                    dataPairComparisonCriteria[4],
                    dataPairComparisonCriteria[5],
                    dataPairComparisonCriteria[6],
                    dataPairComparisonCriteria[7],
                    dataPairComparisonCriteria[8],
                    dataPairComparisonCriteria[9]
                ],
                "var2": [
                    dataPairComparisonCriteria[10],
                    dataPairComparisonCriteria[11],
                    dataPairComparisonCriteria[12],
                    dataPairComparisonCriteria[13],
                    dataPairComparisonCriteria[14],
                    dataPairComparisonCriteria[15],
                    dataPairComparisonCriteria[16],
                    dataPairComparisonCriteria[17],
                    dataPairComparisonCriteria[18],
                    dataPairComparisonCriteria[19]
                ],
                "var3": [
                    dataPairComparisonCriteria[20],
                    dataPairComparisonCriteria[21],
                    dataPairComparisonCriteria[22],
                    dataPairComparisonCriteria[23],
                    dataPairComparisonCriteria[24],
                    dataPairComparisonCriteria[25],
                    dataPairComparisonCriteria[26],
                    dataPairComparisonCriteria[27],
                    dataPairComparisonCriteria[28],
                    dataPairComparisonCriteria[29]
                ],
                "var4": [
                    dataPairComparisonCriteria[30],
                    dataPairComparisonCriteria[31],
                    dataPairComparisonCriteria[32],
                    dataPairComparisonCriteria[33],
                    dataPairComparisonCriteria[34],
                    dataPairComparisonCriteria[35],
                    dataPairComparisonCriteria[36],
                    dataPairComparisonCriteria[37],
                    dataPairComparisonCriteria[38],
                    dataPairComparisonCriteria[39]
                ],
                "var5": [
                    dataPairComparisonCriteria[40],
                    dataPairComparisonCriteria[41],
                    dataPairComparisonCriteria[42],
                    dataPairComparisonCriteria[43],
                    dataPairComparisonCriteria[44],
                    dataPairComparisonCriteria[45],
                    dataPairComparisonCriteria[46],
                    dataPairComparisonCriteria[47],
                    dataPairComparisonCriteria[48],
                    dataPairComparisonCriteria[49]
                ],
                "var6": [
                    dataPairComparisonCriteria[50],
                    dataPairComparisonCriteria[51],
                    dataPairComparisonCriteria[52],
                    dataPairComparisonCriteria[53],
                    dataPairComparisonCriteria[54],
                    dataPairComparisonCriteria[55],
                    dataPairComparisonCriteria[56],
                    dataPairComparisonCriteria[57],
                    dataPairComparisonCriteria[58],
                    dataPairComparisonCriteria[59]
                ],
                "var7": [
                    dataPairComparisonCriteria[60],
                    dataPairComparisonCriteria[61],
                    dataPairComparisonCriteria[62],
                    dataPairComparisonCriteria[63],
                    dataPairComparisonCriteria[64],
                    dataPairComparisonCriteria[65],
                    dataPairComparisonCriteria[66],
                    dataPairComparisonCriteria[67],
                    dataPairComparisonCriteria[68],
                    dataPairComparisonCriteria[69]
                ],
                "var8": [
                    dataPairComparisonCriteria[70],
                    dataPairComparisonCriteria[71],
                    dataPairComparisonCriteria[72],
                    dataPairComparisonCriteria[73],
                    dataPairComparisonCriteria[74],
                    dataPairComparisonCriteria[75],
                    dataPairComparisonCriteria[76],
                    dataPairComparisonCriteria[77],
                    dataPairComparisonCriteria[78],
                    dataPairComparisonCriteria[79]
                ],
                "var9": [
                    dataPairComparisonCriteria[80],
                    dataPairComparisonCriteria[81],
                    dataPairComparisonCriteria[82],
                    dataPairComparisonCriteria[83],
                    dataPairComparisonCriteria[84],
                    dataPairComparisonCriteria[85],
                    dataPairComparisonCriteria[86],
                    dataPairComparisonCriteria[87],
                    dataPairComparisonCriteria[88],
                    dataPairComparisonCriteria[89]
                ],
                "var10": [
                    dataPairComparisonCriteria[90],
                    dataPairComparisonCriteria[91],
                    dataPairComparisonCriteria[92],
                    dataPairComparisonCriteria[93],
                    dataPairComparisonCriteria[94],
                    dataPairComparisonCriteria[95],
                    dataPairComparisonCriteria[96],
                    dataPairComparisonCriteria[97],
                    dataPairComparisonCriteria[98],
                    dataPairComparisonCriteria[99]
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
    const containerStyle = useMemo(() => ({ width: '128%', height: '98%' }), []);
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

    function criteriasComparison()
    {
        let criteriasComparison: Array<Array<number>> = [
            [1,	    1,	    1,	    1,	    1,	    1,	    0.5,	0.5,	1,	    1],
            [0,	    1,	    0.5,	0.5,	0.5,	1,	    0,	    0,	    1,	    1],
            [0,	    0.5,	1,	    0.5,	0.5,	1,	    0,	    0,	    1,	    1],
            [0,	    0.5,	0.5,	1,	    0.5,	1,	    0,	    0,	    1,	    1],
            [0,	    0.5,	0.5,	0.5,	1,	    1,	    0,	    0,	    1,	    1],
            [0,	    0,	    0,	    0,	    0,	    1,	    0,	    0,	    0.5,	0.5],
            [0.5,	1,	    1,	    1,	    1,	    1,	    1,	    0.5,	1,	    1],
            [0.5,	1,	    1,	    1,	    1,	    1,	    0.5,	1,	    1,	    1],
            [0,	    0,	    0,	    0,	    0,	    0.5,	0,	    0,	    1,	    0.5],
            [0,	    0,	    0,	    0,	    0,	    0.5,	0,	    0,	    0.5,	1]];

        for (let i = 0; i<10; i++)
        {
            criteriasComparison[i][0] = rowData[i].crit1;
            criteriasComparison[i][1] = rowData[i].crit2;
            criteriasComparison[i][2] = rowData[i].crit3;
            criteriasComparison[i][3] = rowData[i].crit4;
            criteriasComparison[i][4] = rowData[i].crit5;
            criteriasComparison[i][5] = rowData[i].crit6;
            criteriasComparison[i][6] = rowData[i].crit7;
            criteriasComparison[i][7] = rowData[i].crit8;
            criteriasComparison[i][8] = rowData[i].crit9;
            criteriasComparison[i][9] = rowData[i].crit10;
        }

        return criteriasComparison;
    }

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

    const rows1 = [
        {   'crit1': countCriteriasPoints(criteriasComparison())[0],
            'crit2': countCriteriasPoints(criteriasComparison())[1],
            'crit3': countCriteriasPoints(criteriasComparison())[2],
            'crit4': countCriteriasPoints(criteriasComparison())[3],
            'crit5': countCriteriasPoints(criteriasComparison())[4],
            'crit6': countCriteriasPoints(criteriasComparison())[5],
            'crit7': countCriteriasPoints(criteriasComparison())[6],
            'crit8': countCriteriasPoints(criteriasComparison())[7],
            'crit9': countCriteriasPoints(criteriasComparison())[8],
            'crit10':countCriteriasPoints(criteriasComparison())[9]}
    ];


    const rows2 = [
        {   'crit1': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[0],
            'crit2': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[1],
            'crit3': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[2],
            'crit4': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[3],
            'crit5': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[4],
            'crit6': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[5],
            'crit7': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[6],
            'crit8': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[7],
            'crit9': countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[8],
            'crit10':countFinalPoints(countCriteriasPoints(criteriasComparison()),getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison()))))[9]}
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
                <h2>Определение весовых коэффициентов методом парного сравнения критериев</h2>

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
                            Состаляется квадратная матрица, размером, равным количествам критериев.
                            Если важность критерия в строке превосходит важность критерия в столбце,
                            то соответствующая ячейка заполняется единицей. Если уступает - нулем.
                            Если критерии примерно одинаковы - 0,5. Затем подсчитывается сумма
                            значений по строкам. Итоговое значение критерия будет равно
                            подсчитанной сумме, деленной на сумму значений всех ячеек в матрице.
                        </div>
                    </div>
                </div>

                <div className="alert alert-dark Che row">
                    <div className="col">
                        <label htmlFor="customRange" className="form-label p-1" >Показать шаги:</label>
                        <input type="range" className="form-range p-4"
                               style={{width: 150, verticalAlign: "middle" }}
                               min="1" max="5" step="1"
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
                        <button onClick={handleSetPairComparisonCriteria} type="button" className="btn btn-primary" id="button-addon2">Сохранить</button>
                    </div>
                </div>

                <h3>таблица с матрицей сравнения</h3>

                <div style={{height: "480px"}}>
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
                    <h3>Вывод баллов каждого критерия</h3>
                    <DataGrid columns={columns} rows={rows1}/>
                </div>

                <div className={(range >= "3") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Сумма баллов всех критериев</h3>
                    {countSumPoints(countCriteriasPoints(criteriasComparison()))}
                </div>

                <div className={(range >= "4") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Вес одного балла</h3>
                    {getPointWeight(countSumPoints(countCriteriasPoints(criteriasComparison())))}
                </div>

                <div className={(range >= "5") ? "accordion-body show" : "accordion-body collapse"}>
                    <h3>Итоговое значение критериев</h3>
                    <DataGrid columns={columns} rows={rows2}/>
                </div>
            </div>
        </div>
    )
}


function countCriteriasPoints(critsComparison: Array<Array<number>>)
{
    let criteriasPoints: Array<number> = [0,0,0,0,0,0,0,0,0,0]

    for (let i = 0; i < critsComparison.length; i++)
    {
        for (let j = 0; j < critsComparison[i].length; j++)
        {
            criteriasPoints[i] = Number( Number(criteriasPoints[i]) + Number(critsComparison[i][j]));
        }
    }

    return criteriasPoints;
}


function countSumPoints(points: Array<number>) {

    let sumPoints: number = 0;

    for (let i = 0; i < points.length; i++) {
        sumPoints += Number(points[i]);
    }
    return sumPoints;
}

function getPointWeight(pointSum: number)
{
    return 1 / pointSum;
}

function countFinalPoints(criteriasPoints: Array<number>, pointWeight: number) {
    let criteriasFinalPoints: Array<number> = criteriasPoints;

    for (let i = 0; i < criteriasFinalPoints.length; i++)
    {
        criteriasFinalPoints[i] = Number(Number(criteriasPoints[i]) * Number(pointWeight));
    }

    return  criteriasFinalPoints;
}
