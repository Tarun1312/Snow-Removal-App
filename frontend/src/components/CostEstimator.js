import React, { useState } from 'react';
import '../styles/CostEstimator.css';


function CostEstimator() {
    const [size, setSize] = useState('');
    const [depth, setDepth] = useState('');
    const [estimate, setEstimate] = useState(null);

    const handleCalculate = () => {
        const cost = size * depth * 0.5; // Example calculation
        setEstimate(cost);
    };

    return (
        <div className="cost-estimator-container">
            <h2>Cost Estimator</h2>
            <label>Property Size (sq ft)</label>
            <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />

            <label>Snow Depth (in inches)</label>
            <input type="number" value={depth} onChange={(e) => setDepth(e.target.value)} />

            <button onClick={handleCalculate}>Calculate</button>
            {estimate !== null && <p>Estimated Cost: ${estimate.toFixed(2)}</p>}
        </div>
    );
}

export default CostEstimator;
