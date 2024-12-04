import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
    useLocation,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";
import Booking from "./components/Booking";
import CostEstimator from "./components/CostEstimator";
import Map from "./components/LocationPage";
import Footer from "./components/Footer";
import SubscriptionPage from "./components/SubscriptionPage";
import AdminPage from "./components/AdminDashBoard";
import LocationPage from "./components/LocationPage";



// Function to check if a user is authenticated
const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
};

// Function to check if the logged-in user is an admin
const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming you store user data on login
    return user?.role === "admin";
};

// Protected Route for general authentication
const ProtectedRoute = ({ element: Component }) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

// Protected Route specifically for admin users
const AdminProtectedRoute = ({ element: Component }) => {
    return isAuthenticated() && isAdmin() ? <Component /> : <Navigate to="/admin" />;
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
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/location" element={<LocationPage />} />
            </Routes>
        </>
    );
}

export default App;
