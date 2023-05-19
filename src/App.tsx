import React from 'react';
import {Navbar} from "./components/Navbar";
import {Route, Routes, BrowserRouter} from "react-router-dom";

import {Theory} from "./pages/Theory";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Pareto} from "./components/Pareto";
import {BaseCriteria} from "./components/BaseCriteria";
import {PointScore} from "./components/PointScore";
import {Borda} from "./components/Borda";
import {Nanson} from "./components/Nanson";
import {WeightedSum} from "./components/WeightedSum";
import {PairComparisonCriterias} from "./components/PairComparisonCriterias";
import {Auth} from "./components/Auth";
import {Method} from "./components/Method"
import {Register} from "./components/Register"



function App() {
    return (
        <div className="App">
            <Navbar/>
            <BrowserRouter>
                <div style={{marginLeft: "50px", marginTop: "20px"}}>
                    <Routes>
                        <Route path={'/'} element = {<Home/>}/>
                        <Route path={'/theory'} element = {<Theory/>}/>
                        {/*<Route path={'/about'} element = {<About/>}/>*/}
                        <Route path={'/pareto'} element = {<Pareto/>}/>
                        <Route path={'/baseCriteria'} element = {<BaseCriteria/>}/>
                        <Route path={'/pointScore'} element = {<PointScore/>}/>
                        <Route path={'/pairComparisonCriteria'} element = {<PairComparisonCriterias/>}/>
                        <Route path={'/borda'} element = {<Borda/>}/>
                        <Route path={'/nanson'} element = {<Nanson/>}/>
                        <Route path={'/weightedSum'} element = {<WeightedSum/>}/>
                        <Route path={'/auth'} element = {<Auth/>}/>
                        <Route path={'/register'} element = {<Register/>}/>
                        <Route path={'/method'} element = {<Method/>}/>
                    </Routes>
                </div>
            </BrowserRouter>

        </div>
    );
}

export default App;
