import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
            localStorage.setItem("authToken", response.data.token); // Store the auth token for protected routes
            alert(response.data.message || "Login successful!");
            navigate("/main"); // Redirect to the main page on success
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert(error.response?.data?.error || "Login failed!");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>LOGIN</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">LOGIN</button>
                </form>
                <div className="additional-links">
                    <a href="/register">Don't have an account? Sign Up</a>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
