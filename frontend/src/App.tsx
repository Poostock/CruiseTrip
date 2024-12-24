import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Trainer from "./page/admid/Class/Trainer";
import CruiseTrip from "./page/admid/Class";
import CruiseTripCreate from "./page/admid/Class/Create";
import EditCruiseTrip from "./page/admid/Class/Edit";
import Ship from "./page/admid/Class/Ship";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<CruiseTrip />} />
                <Route path="/cruiseTrip" element={<CruiseTrip />} />
                <Route path="/cruiseTrip/create" element={<CruiseTripCreate />} />
                <Route path="/cruiseTrip/edit/:cruiseTripID" element={<EditCruiseTrip />} />
                <Route path="/cruiseTrip/ship" element={<Ship />} />
                <Route path="/cruiseTrip/route" element={<Trainer />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;