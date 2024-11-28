import React from "react";
import "../styles/LandingPage.css"; // Ensure the correct path to your CSS file

function LandingPage() {
    return (
        <div className="landing-page">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <img src="images/logo 3.jpg" alt="Logo" />
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
                    <h1>!Snow Removal Services!</h1>
                    <button className="btn-primary">Learn More</button>
                </div>
            </section>

            {/* Introductory Section */}
            <section className="intro">
                <h2>What Makes Us Special?</h2>
                <p>
                    We provide professional snow removal services to ensure your sidewalks, driveways, and walkways remain clear and safe during the winter season. Let us handle the snow while you stay warm and worry-free!
                </p>
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

            {/* Resources Section */}
            <section className="resources">
                <h2>Resources</h2>
                <div className="resource-cards">
                    <div className="resource-card">
                        <img src="/images/resource1.jpg" alt="Resource 1" />
                        <h3>Snow-Be-Gone: Why Snow Removal Matters</h3>
                        <p>Discover why professional snow removal is essential for safety and convenience.</p>
                        <a href="#">Read More</a>
                    </div>
                    <div className="resource-card">
                        <img src="/images/resource2.jpg" alt="Resource 2" />
                        <h3>How Professional Snow Removal Improves Aesthetics</h3>
                        <p>Learn how our services enhance the beauty of your property.</p>
                        <a href="#">Read More</a>
                    </div>
                    <div className="resource-card">
                        <img src="/images/resource3.jpg" alt="Resource 3" />
                        <h3>When Should You Hire a Snow Removal Service?</h3>
                        <p>Find out the best time to book our services for maximum benefit.</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <a href="#services">Services</a>
                        <a href="#about">About Us</a>
                        <a href="#contact">Contact</a>
                    </div>
                    <div className="social-media">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                    <p>© 2024 Snow Removal Services. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default LandingPage;
