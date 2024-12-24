import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Trainer from "./page/admid/Class/Trainer";
import ClassType from "./page/admid/Class/Ship";
import EditClass from "./page/admid/Class/Edit";
import ClassCreate from "./page/admid/Class/Create";
import Class from "./page/admid/Class";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Class />} />
                <Route path="/class" element={<Class />} />
                <Route path="/class/create" element={<ClassCreate />} />
                <Route path="/class/edit/:classID" element={<EditClass />} />
                <Route path="/class/classType" element={<ClassType />} />
                <Route path="/class/trainer" element={<Trainer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;