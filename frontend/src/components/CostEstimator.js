import React, { useState } from "react";
import "../styles/CostEstimator.css"; // Ensure the path is correct for your CSS file
 // Assuming you have a Footer component

function CostEstimator() {
    const [propertySize, setPropertySize] = useState("");
    const [snowDepth, setSnowDepth] = useState("");
    const [estimatedCost, setEstimatedCost] = useState(null);

    const calculateCost = (e) => {
        e.preventDefault();

        // Cost calculation logic
        if (propertySize && snowDepth) {
            const costPerSqFt = 0.10; // Example rate: $0.10 per sq ft
            const depthMultiplier = 1.2; // Example multiplier for snow depth
            const totalCost =
                propertySize * costPerSqFt * (1 + snowDepth / 12 * depthMultiplier);
            setEstimatedCost(totalCost.toFixed(2));
        } else {
            alert("Please enter valid values for property size and snow depth.");
        }
    };

    const resetForm = () => {
        setPropertySize("");
        setSnowDepth("");
        setEstimatedCost(null);
    };

    return (
        <div className="cost-estimator-page">
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
                    <form onSubmit={calculateCost}>
                        <div className="form-group">
                            <label htmlFor="property-size">Property Size (sq ft)</label>
                            <input
                                type="number"
                                id="property-size"
                                value={propertySize}
                                onChange={(e) => setPropertySize(e.target.value)}
                                placeholder="Enter your property size"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="snow-depth">Snow Depth (in inches)</label>
                            <input
                                type="number"
                                id="snow-depth"
                                value={snowDepth}
                                onChange={(e) => setSnowDepth(e.target.value)}
                                placeholder="Enter snow depth"
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary">
                            Calculate
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={resetForm}
                            style={{
                                marginLeft: "10px",
                                backgroundColor: "#f44336",
                                color: "white",
                            }}
                        >
                            Reset
                        </button>
                    </form>
                </div>
            </div>

            {/* Display Estimated Cost */}
            {estimatedCost !== null && (
                <div className="cost-result">
                    <h3>Estimated Cost: ${estimatedCost}</h3>
                </div>
            )}

          
        </div>
    );
}

export default CostEstimator;
