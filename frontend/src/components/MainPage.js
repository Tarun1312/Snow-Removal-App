import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

function MainPage() {
    const navigate = useNavigate();

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
                    <a href="/login">Login</a>
                    <a href="/register" className="btn-primary">Sign Up</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Snow Removal Services Clear The Way For A Great Lawn</h1>
                    <button className="btn-primary" onClick={() => navigate("/main")}>Learn More</button>
                </div>
            </section>

            {/* Monthly Snow Packages Section */}
            <section id="services" className="services">
                <h2>Monthly Snow Packages</h2>
                <div className="service-cards">
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
                    <p>Schedule your snow removal appointment today and enjoy a stress-free winter!</p>
                </div>
                <div className="action-card" onClick={() => navigate("/cost-estimator")}>
                    <h3>Price Calculator</h3>
                    <p>Get an instant estimate for snow removal services tailored to your property size.</p>
                </div>
                <div className="action-card" onClick={() => navigate("/map")}>
                    <h3>Find Us</h3>
                    <p>Locate our nearest service area and enjoy prompt, professional snow removal.</p>
                </div>
            </section>
        </div>
    );
}

export default MainPage;
