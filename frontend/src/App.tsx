import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import CruiseTrip from "./page/admid/CruiseTrip";
import CruiseTripCreate from "./page/admid/CruiseTrip/Create";
import EditCruiseTrip from "./page/admid/CruiseTrip/Edit";
import Ship from "./page/admid/CruiseTrip/Ship";
import Activity from "./page/admid/Activity";
import ActivityCreate from "./page/admid/Activity/Create";
import BookActivityCreate from "./page/customer/bookActivity/CreateBookActivity";
import BookActivity from "./page/customer/bookActivity";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<BookActivity />} />
                <Route path="/admin/cruiseTrip" element={<CruiseTrip />} />
                <Route path="/cruiseTrip/create" element={<CruiseTripCreate />} />
                <Route path="/cruiseTrip/edit/:cruiseTripID" element={<EditCruiseTrip />} />
                <Route path="/admin/ship" element={<Ship />} />
                <Route path="/admin/activity" element={<Activity  />} />
                <Route path="/activity/create" element={<ActivityCreate  />} />
                <Route path="/bookActivity" element={<BookActivity />} />
                <Route path="/bookActivity/bookActivityCreate"element={<BookActivityCreate />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;