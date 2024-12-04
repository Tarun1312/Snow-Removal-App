import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

function MainPage() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/user-details", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (response.ok) {
                setUserDetails(data.user);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setIsAuthenticated(false);
        navigate("/login");
    };

    return (
        <div className="main-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="/images/snowlogo.webp" alt="Logo" />
                </div>
                <div className="navbar-links">
                    <a href="#services">Services</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                </div>
                <div className="navbar-auth">
                    {isAuthenticated ? (
                        <div className="user-info">
                            <button
                                className="btn-user"
                                onClick={() => setShowPopup(true)}
                            >
                                User
                            </button>
                            <button className="btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <a href="/login">Login</a>
                            <a href="/register" className="btn-primary">Sign Up</a>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Snow Removal Services Clear The Way For A Great Lawn</h1>
                    <button className="btn-primary" onClick={() => navigate("/main")}>
                        Learn More
                    </button>
                </div>
            </section>

            {/* Monthly Snow Packages Section */}
            <section id="services" className="services">
                <h2>Monthly Snow Packages</h2>
                <div className="service-cards">
                    {/* Frost Guard */}
                    <div className="card">
                        <h3>Frost Guard</h3>
                        <p>$249.99</p>
                        <p>Sidewalk & Walkways Up to 500 sq ft</p>
                        <ul>
                            <li>Licensed & Insured GreenKeepers</li>
                            <li>Unlimited visits every month</li>
                            <li>Automatic Billing</li>
                        </ul>
                        <button
                            className="btn-subscribe"
                            onClick={() => navigate("/subscribe?plan=frost_guard")}
                        >
                            Subscribe
                        </button>
                    </div>
                    {/* Blizzard Buster */}
                    <div className="card">
                        <h3>Blizzard Buster</h3>
                        <p>$299.99</p>
                        <p>Sidewalk, Walkways & Driveway Up to 1500 sq ft</p>
                        <ul>
                            <li>Licensed & Insured GreenKeepers</li>
                            <li>Unlimited visits every month</li>
                            <li>Automatic Billing</li>
                        </ul>
                        <button
                            className="btn-subscribe"
                            onClick={() => navigate("/subscribe?plan=blizzard_buster")}
                        >
                            Subscribe
                        </button>
                    </div>
                    {/* Arctic Shield */}
                    <div className="card">
                        <h3>Arctic Shield</h3>
                        <p>$329.99</p>
                        <p>Sidewalk, Walkways & Oversized Driveway Up to 2000 sq ft</p>
                        <ul>
                            <li>Licensed & Insured GreenKeepers</li>
                            <li>Unlimited visits every month</li>
                            <li>Automatic Billing</li>
                        </ul>
                        <button
                            className="btn-subscribe"
                            onClick={() => navigate("/subscribe?plan=arctic_shield")}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* Actionable Cards Section */}
            <section id="action-cards" className="action-cards">
                <div className="action-card" onClick={() => navigate("/booking")}>
                    <h3>Book Appointment</h3>
                    <p>
                        Schedule your snow removal appointment today and enjoy a
                        stress-free winter!
                    </p>
                </div>
                <div className="action-card" onClick={() => navigate("/cost-estimator")}>
                    <h3>Price Calculator</h3>
                    <p>
                        Get an instant estimate for snow removal services tailored to
                        your property size.
                    </p>
                </div>
                <div className="action-card" onClick={() => navigate("/map")}>
                    <h3>Find Us</h3>
                    <p>
                        Locate our nearest service area and enjoy prompt, professional
                        snow removal.
                    </p>
                </div>
            </section>

            {/* Popup Modal for User Details */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h3>User Information</h3>
                        {userDetails ? (
                            <>
                                <p><strong>Name:</strong> {userDetails.name}</p>
                                <p><strong>Email:</strong> {userDetails.email}</p>
                                <p><strong>Appointments:</strong></p>
                                <ul>
                                    {userDetails.appointments && userDetails.appointments.length > 0 ? (
                                        userDetails.appointments.map((appointment, index) => (
                                            <li key={index}>
                                                <strong>Service:</strong> {appointment.serviceType} <br />
                                                <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString()} <br />
                                            </li>
                                        ))
                                    ) : (
                                        <li>No appointments</li>
                                    )}
                                </ul>
                            </> 
                        ) : (
                            <p>Loading user details...</p>
                        )}
                        <button className="btn-close" onClick={() => setShowPopup(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainPage;
