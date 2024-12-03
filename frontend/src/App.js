import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import Booking from "./components/Booking";
import CostEstimator from "./components/CostEstimator";
import Map from "./components/Map";
import Footer from "./components/Footer";
import SubscriptionPage from "./components/SubscriptionPage";



const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = ({ element: Component }) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <RoutesWithFooter />
            </div>
        </Router>
    );
}

function RoutesWithFooter() {
    const location = useLocation();
    const noFooterRoutes = ["/login", "/register"];

    return (
        <>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<ProtectedRoute element={MainPage} />} />
                <Route path="/booking" element={<ProtectedRoute element={Booking} />} />
                <Route path="/cost-estimator" element={<ProtectedRoute element={CostEstimator} />} />
                <Route path="/map" element={<ProtectedRoute element={Map} />} />
                <Route path="/subscribe" element={<SubscriptionPage />} />

            </Routes>
            {!noFooterRoutes.includes(location.pathname) && <Footer />}
        </>
    );
}

export default App;
