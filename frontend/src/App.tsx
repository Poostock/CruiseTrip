import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Trainer from "./page/admid/CruiseTrip/Trainer";
import CruiseTrip from "./page/admid/CruiseTrip";
import CruiseTripCreate from "./page/admid/CruiseTrip/Create";
import EditCruiseTrip from "./page/admid/CruiseTrip/Edit";
import Ship from "./page/admid/CruiseTrip/Ship";


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