import React from "react";
import "../styles/CostEstimator.css"; // Ensure the path is correct for your CSS file
import Footer from "./Footer"; // Assuming you have a Footer component

function CostEstimator() {
    return (
        <div className="cost-estimator-page">
            {/* Navbar */}
           

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Cost Estimator</h1>
                    <p>Calculate the cost of snow removal services for your property.</p>
                </div>
            </section>

            {/* Cost Estimator Form */}
            <div className="form-container">
                <div className="form-card">
                    <h2>Estimate Your Costs</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="property-size">Property Size (sq ft)</label>
                            <input
                                type="number"
                                id="property-size"
                                placeholder="Enter your property size"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="snow-depth">Snow Depth (in inches)</label>
                            <input
                                type="number"
                                id="snow-depth"
                                placeholder="Enter snow depth"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Calculate
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default CostEstimator;
