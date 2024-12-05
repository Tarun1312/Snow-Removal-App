import React from "react";
import "../styles/LandingPage.css";
import Footer from "./Footer";

function LandingPage() {    
    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                <img src="/images/snowlogo.webp" alt="Logo" />
                </div>
                <div className="navbar-links">
                    <a href="#services">Services</a>
                    <a href="/location">Location</a>
                    </div>
                <div className="navbar-auth">
                    <a href="/login">Login</a>
                    <a href="/register" className="btn-primary">Sign Up</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="landing-hero">
                <div className="hero-content">
                    <h1>Snow Removal Services Clear The Way For A Great Lawn</h1>
                    <button className="btn-primary">Learn More</button>
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
            < Footer/>
            
        </div>
    );
}

export default LandingPage;
