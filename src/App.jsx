import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import Login from "./screen/authentication/Login";
import SignUp from "./screen/authentication/SignUp";
import Error from "./screen/basicScreen/Error.jsx";
import Error1 from "./screen/basicScreen/Error1.jsx";
import Boilerplate from "./screen/basicScreen/Boilerplate";
// main home
import Home from "./screen/screens/Home";
import Transport from "./screen/screens/Transport.jsx";
import BookingTransport from "./screen/screens/BookingTransport.jsx";
import TransportHome from "./screen/screens/TransportHome.jsx";
// dashboard Part
import Dashboard from "./screen/dashboard/Dashboard";
import DashboardHome from "./screen/dashboard/DashboardHome";
import CreateTransport from "./screen/dashboard/CreateTransport.jsx";
import TransportList from "./screen/dashboard/TransportList.jsx";
import TransportListHome from "./screen/dashboard/TransportListHome.jsx";
import TransportListUpdate from "./screen/dashboard/TransportListUpdate.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Boilerplate />}>
          {/* pages */}
          <Route index element={<Home />} />
          <Route path="transport" element={<Transport />}>
            <Route index element={<TransportHome />} />
            <Route path="booking-transport" element={<BookingTransport />} />
          </Route>
          {/* authentication */}
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          {/* dashboard */}
          <Route path="dashboard/:id" element={<Dashboard />}>
            <Route index element={<DashboardHome />} />
            <Route path="create-transport" element={<CreateTransport />} />
            <Route path="transport-list" element={<TransportList />}>
              <Route index element={<TransportListHome />} />
              <Route
                path="transport-list-update"
                element={<TransportListUpdate />}
              />
            </Route>
            <Route path="*" element={<Error1 />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  );
}
