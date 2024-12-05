import React, { useState } from "react";
import axios from "axios";
import "../styles/ForgotPassword.css";

function ForgotPassword() {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", formData);
            setMessage(response.data.message || "Password updated successfully!");
        } catch (error) {
            console.error("Error resetting password:", error.response?.data || error.message);
            setMessage(error.response?.data?.error || "Failed to reset password!");
        }
    };

    return (
        <div className="forgot-password-page">
            <div className="form-container">
                <h1 className="form-title">Reset Your Password</h1>
                <p className="instructions">
                    Please enter your email and new password below to reset your password.
                </p>
                <form onSubmit={handleSubmit} className="password-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Enter your new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-submit">Update Password</button>
                </form>
                {message && <p className="response-message">{message}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
