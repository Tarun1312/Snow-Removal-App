import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LocationPage.css";
import Footer from "./Footer";

function LocationPage() {
    const navigate = useNavigate();

    return (
        <div className="location-page">
            <h1>Our Location</h1>
            <div className="map-container">
                {/* Embedded Google Map */}
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4885.640138599468!2d-113.82743132330624!3d52.24665177199082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537456a4e720485b%3A0xfad570c5678b03ce!2sRed%20Deer%20Polytechnic!5e0!3m2!1sen!2sca!4v1733352256814!5m2!1sen!2sca"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <button className="btn-back" onClick={() => navigate(-1)}>
                Back
            </button>
            {/* Footer */}
            <Footer />
        </div>
    );
}

export default LocationPage;
