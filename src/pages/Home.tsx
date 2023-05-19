import React from "react";

import {Route, Router, Routes, BrowserRouter} from "react-router-dom";
import {Pareto} from "../components/Pareto";
import {BaseCriteria} from "../components/BaseCriteria";
import {PointScore} from "../components/PointScore";
import {PairComparisonCriterias} from "../components/PairComparisonCriterias";
import {Borda} from "../components/Borda";
import {Nanson} from "../components/Nanson";
import {WeightedSum} from "../components/WeightedSum";

import {Hub} from "../components/Hub";

export const Home = () => {
    return (
        <div>
            <h2>Методы поддержки принятия решений</h2>
            <Hub/>
        </div>
    )
}

/*

            <BrowserRouter>
            <Routes>
                <Hub />
                    <Routes>
                        <Route path="/pareto" element={<Pareto  />} />
                        <Route path="/baseCriteria" element={<BaseCriteria  />} />
                        <Route path="/pointScore" element={<PointScore  />} />
                        <Route path="/pairComparisonCriterias" element={<PairComparisonCriterias  />} />
                        <Route path="/borda" element={<Borda  />} />
                        <Route path="/nanson" element={<Nanson  />} />
                        <Route path="/weightedSum" element={<WeightedSum  />} />
                    </Routes>
            </Routes>
            </BrowserRouter>

 */