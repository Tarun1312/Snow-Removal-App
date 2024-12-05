// src/components/Footer.js
import React from "react";
import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <p><i className="fas fa-map-marker-alt"></i> 21 Revolution Street<br /><strong>Paris, France</strong></p>
                    <p><i className="fas fa-phone"></i> +1 555 123456</p>
                    <p><i className="fas fa-envelope"></i> <a href="mailto:support@company.com">support@company.com</a></p>
                </div>
                <div className="footer-section">
                    <h3>About the company</h3>
                    <p>BEST SNOW REMOVAL SERVICE </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
