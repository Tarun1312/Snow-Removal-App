import React from "react";
import "../styles/MainPage.css"; // Use the correct path for MainPage.css

function MainPage() {
    return (
        <div className="main-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="/images/logo3.jpg" alt="Logo" />
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

            {/* Main Content with Sidebar */}
            <div className="content-wrapper">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-card" onClick={() => window.location.href = '/booking'}>
                        <h3>Book Appointment</h3>
                        <p>Schedule your snow removal appointment now!</p>
                    </div>
                    <div className="sidebar-card" onClick={() => window.location.href = '/cost-estimator'}>
                        <h3>Price Calculator</h3>
                        <p>Get an instant estimate for snow removal services.</p>
                    </div>
                    <div className="sidebar-card" onClick={() => window.location.href = '/map'}>
                        <h3>Find Us</h3>
                        <p>Locate our nearest service area.</p>
                    </div>
                </aside>

                {/* Main Section */}
                <section className="main-content">
                    {/* Hero Section */}
                    <section className="hero2">
                        <div className="hero-content2">
                            <h1>Snow Removal Services Clear The Way For A Great Lawn</h1>
                            <button className="btn-primary2">Learn More</button>
                        </div>
                    </section>

                    {/* Services Section */}
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
                            </div>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}

export default MainPage;
