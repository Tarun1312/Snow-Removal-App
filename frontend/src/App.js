import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./components/MainPage";

const isAuthenticated = () => {
    return localStorage.getItem("authToken") !== null;
};

const ProtectedRoute = ({ element: Component }) => {
    return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/main" element={<ProtectedRoute element={MainPage} />} />
            </Routes>
        </Router>
    );
}

export default App;
