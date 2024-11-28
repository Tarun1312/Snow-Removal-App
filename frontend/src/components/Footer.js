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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod convallis velit, eu auctor lacus vehicula sit amet.</p>
                    <div className="social-icons">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
